import { useEffect, useRef, useState } from "react";
import { parseFrontmatter, postProcessHTML } from "../utils/cvParser";
import { generateHeader, generatePreviewHTML } from "../utils/htmlBuilder";

// A4 in pixels at 96dpi
const A4_PX = 794;

export default function Preview({ content, options }) {
  const previewRef = useRef(null);
  const containerRef = useRef(null);
  const debounceTimerRef = useRef(null);
  const [yamlError, setYamlError] = useState(null);
  const [zoom, setZoom] = useState(1);

  // ── Compute zoom from container width ────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0].contentRect.width;
      // Padding inside .preview-content is 16px each side = 32px
      const available = width - 32;
      const newZoom = available < A4_PX ? Math.max(0.3, available / A4_PX) : 1;
      setZoom(parseFloat(newZoom.toFixed(3)));
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // ── Render CV content ─────────────────────────────
  useEffect(() => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    debounceTimerRef.current = setTimeout(() => {
      const { frontmatter, content: markdownContent, error } =
        parseFrontmatter(content);

      setYamlError(error);

      const md = window.markdownit({ html: true, linkify: true, typographer: true });
      const contentHTML = postProcessHTML(md.render(markdownContent));
      const headerHTML = generateHeader(frontmatter);
      const previewHTML = generatePreviewHTML(headerHTML, contentHTML, options);

      if (previewRef.current) {
        previewRef.current.innerHTML = previewHTML;
        if (window.Iconify) window.Iconify.scan();
      }
    }, 300);

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [content, options]);

  return (
    <div className="preview-panel">
      <div className="preview-header">Live Preview</div>
      {yamlError && (
        <div className="yaml-error-banner">
          Header format error
          {yamlError.line != null && ` (line ${yamlError.line})`}:{" "}
          {yamlError.message}
        </div>
      )}
      <div className="preview-content" ref={containerRef}>
        <div
          className="preview-page"
          ref={previewRef}
          style={{
            zoom,
            "--margin-top": options.marginTop,
            "--margin-right": options.marginRight,
            "--margin-bottom": options.marginBottom,
            "--margin-left": options.marginLeft,
          }}
        />
      </div>
    </div>
  );
}
