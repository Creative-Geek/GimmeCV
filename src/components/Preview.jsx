import { useEffect, useRef } from "react";
import { parseFrontmatter, postProcessHTML } from "../utils/cvParser";
import { generateHeader, generatePreviewHTML } from "../utils/htmlBuilder";

export default function Preview({ content, options }) {
  const previewRef = useRef(null);
  const debounceTimerRef = useRef(null);

  useEffect(() => {
    // Clear any existing debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new debounce timer for 300ms (matching original behavior)
    debounceTimerRef.current = setTimeout(() => {
      updatePreview();
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [content, options]);

  const updatePreview = () => {
    const { frontmatter, content: markdownContent } = parseFrontmatter(content);

    const md = window.markdownit({
      html: true,
      linkify: true,
      typographer: true,
    });

    const contentHTML = postProcessHTML(md.render(markdownContent));
    const headerHTML = generateHeader(frontmatter);

    const previewHTML = generatePreviewHTML(headerHTML, contentHTML, options);

    if (previewRef.current) {
      previewRef.current.innerHTML = previewHTML;

      if (window.Iconify) {
        window.Iconify.scan();
      }
    }
  };

  return (
    <div className="preview-panel">
      <div className="preview-header">Live Preview</div>
      <div className="preview-content">
        <div
          className="preview-page"
          ref={previewRef}
          style={{
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
