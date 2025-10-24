import { parseFrontmatter, postProcessHTML } from "../utils/cvParser";
import { buildHTML } from "../utils/htmlBuilder";
import { saveToStorage, loadFromStorage } from "../utils/storage";
import { DEFAULT_CV } from "../utils/constants";
import { Download, Save, Upload, RotateCcw, Github, Link } from "lucide-react";
import IconImage from "../../images/icon.png";
import { generateShareableUrl, validateUrlLength } from "../utils/urlEncoding";

export default function Toolbar({
  content,
  options,
  onOptionsChange,
  onContentChange,
}) {
  const handleOptionChange = (key, value) => {
    onOptionsChange({ ...options, [key]: value });
  };

  const downloadPDF = async () => {
    const { frontmatter, content: markdownContent } = parseFrontmatter(content);

    const md = window.markdownit({
      html: true,
      linkify: true,
      typographer: true,
    });

    const contentHTML = postProcessHTML(md.render(markdownContent));

    const html = buildHTML(frontmatter, contentHTML, options);

    const w = window.open("", "_blank");
    if (!w) {
      alert("Pop-up blocked. Please allow pop-ups to download the PDF.");
      return;
    }

    w.document.open();
    w.document.write(html);
    w.document.close();

    await new Promise((r) => (w.onload ? (w.onload = r) : setTimeout(r, 300)));

    if (w.document.fonts && w.document.fonts.ready) {
      await w.document.fonts.ready.catch(() => {});
    }

    if (w.Iconify) {
      await new Promise((r) => setTimeout(r, 500));
    }

    w.focus();
    w.print();
  };

  const handleSave = () => {
    const data = {
      content,
      fontSize: options.fontSize,
      lineHeight: options.lineHeight,
      marginTop: options.marginTop,
      marginBottom: options.marginBottom,
      marginLeft: options.marginLeft,
      marginRight: options.marginRight,
    };
    saveToStorage(data);
    alert("✅ Saved to browser storage!");
  };

  const handleLoad = () => {
    const saved = loadFromStorage();
    if (!saved) {
      alert("No saved data found");
      return;
    }
    onContentChange(saved.content);
    onOptionsChange({
      fontSize: saved.fontSize,
      lineHeight: saved.lineHeight,
      marginTop: saved.marginTop,
      marginBottom: saved.marginBottom,
      marginLeft: saved.marginLeft,
      marginRight: saved.marginRight,
    });
    alert("✅ Loaded from storage!");
  };

  const handleReset = (defaultCV) => {
    if (confirm("Reset to default CV? This will lose unsaved changes.")) {
      onContentChange(defaultCV);
      onOptionsChange({
        fontSize: "13px",
        lineHeight: "1.12",
        marginTop: "25px",
        marginBottom: "30px",
        marginLeft: "40px",
        marginRight: "40px",
      });
    }
  };

  const handleGenerateUrl = () => {
    try {
      const result = generateShareableUrl(content);
      const validation = validateUrlLength(result.url);

      // Show stats
      let message = `✅ Shareable URL Generated!\n\n`;
      message += `📊 Stats:\n`;
      message += `• Original size: ${result.originalLength} chars\n`;
      message += `• Compressed: ${result.encodedLength} chars\n`;
      message += `• Compression: ${result.compressionRatio}\n`;
      message += `• Total URL: ${result.totalUrlLength} chars\n\n`;

      if (validation.warning) {
        message += `⚠️ ${validation.warning}\n\n`;
      }

      message += `The URL has been copied to your clipboard!`;

      // Copy to clipboard
      navigator.clipboard
        .writeText(result.url)
        .then(() => {
          alert(message);
        })
        .catch(() => {
          // Fallback if clipboard API fails
          prompt("Copy this URL:", result.url);
        });
    } catch (error) {
      alert(`❌ Failed to generate URL: ${error.message}`);
    }
  };

  return (
    <div className="toolbar">
      <div className="toolbar-group">
        <img src={IconImage} alt="GimmeCV" className="toolbar-icon" />
        <div>
          <strong style={{ marginRight: "5px" }}>GimmeCV</strong>
        </div>
        <button
          className="btn btn-success"
          onClick={downloadPDF}
          title="Download PDF"
        >
          <Download size={16} />
          <span>PDF</span>
        </button>
        <button
          className="btn btn-primary"
          onClick={handleGenerateUrl}
          title="Generate shareable URL with embedded data"
        >
          <Link size={16} />
          <span>Generate URL</span>
        </button>
        <button className="btn" onClick={handleSave} title="Save to browser">
          <Save size={16} />
          <span>Save</span>
        </button>
        <button className="btn" onClick={handleLoad} title="Load from browser">
          <Upload size={16} />
          <span>Load</span>
        </button>
        <button
          className="btn btn-danger"
          onClick={() => handleReset(DEFAULT_CV)}
          title="Reset to default"
        >
          <RotateCcw size={16} />
          <span>Reset</span>
        </button>
      </div>
      <div className="toolbar-group">
        <label>
          Font:{" "}
          <input
            type="text"
            value={options.fontSize}
            onChange={(e) => handleOptionChange("fontSize", e.target.value)}
          />
        </label>
        <label>
          Line:{" "}
          <input
            type="text"
            value={options.lineHeight}
            onChange={(e) => handleOptionChange("lineHeight", e.target.value)}
          />
        </label>
        <label>
          Top:{" "}
          <input
            type="text"
            value={options.marginTop}
            onChange={(e) => handleOptionChange("marginTop", e.target.value)}
          />
        </label>
        <label>
          Bottom:{" "}
          <input
            type="text"
            value={options.marginBottom}
            onChange={(e) => handleOptionChange("marginBottom", e.target.value)}
          />
        </label>
        <label>
          Left:{" "}
          <input
            type="text"
            value={options.marginLeft}
            onChange={(e) => handleOptionChange("marginLeft", e.target.value)}
          />
        </label>
        <label>
          Right:{" "}
          <input
            type="text"
            value={options.marginRight}
            onChange={(e) => handleOptionChange("marginRight", e.target.value)}
          />
        </label>
      </div>
      <div className="toolbar-group" style={{ marginLeft: "auto" }}>
        <a
          href="https://github.com/Creative-Geek/GimmeCV"
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
          title="View on GitHub"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            textDecoration: "none",
          }}
        >
          <Github size={16} />
          <span>GitHub</span>
        </a>
      </div>
    </div>
  );
}
