import { parseFrontmatter, postProcessHTML } from "../utils/cvParser";
import { generateHeader, buildHTML } from "../utils/htmlBuilder";
import { saveToStorage, loadFromStorage } from "../utils/storage";
import { DEFAULT_CV } from "../utils/constants";
import { Download, Save, Upload, RotateCcw } from "lucide-react";

// Parse value like "13px" into number and unit
const parseValue = (value) => {
  const match = value.match(/^([\d.]+)(px|em|pt|%)$/);
  if (match) {
    return { num: parseFloat(match[1]), unit: match[2] };
  }
  return { num: 13, unit: "px" }; // fallback
};

// Reconstruct value from number and unit
const formatValue = (num, unit) => `${num}${unit}`;

// Constrain numeric input
const constrain = (value, min, max) => {
  const num = parseFloat(value);
  if (isNaN(num)) return min;
  return Math.max(min, Math.min(max, num));
};

export default function Toolbar({
  content,
  options,
  onOptionsChange,
  onContentChange,
}) {
  const handleNumericChange = (key, newNum) => {
    const { num: _, unit } = parseValue(options[key]);
    onOptionsChange({ ...options, [key]: formatValue(newNum, unit) });
  };

  const handleUnitChange = (key, newUnit) => {
    const { num } = parseValue(options[key]);
    onOptionsChange({ ...options, [key]: formatValue(num, newUnit) });
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

  // Helper component for numeric input with unit
  const NumericInput = ({
    label,
    optionKey,
    min = 0,
    max = 100,
    step = 0.1,
  }) => {
    const { num, unit } = parseValue(options[optionKey]);

    return (
      <label className="numeric-input-group">
        <span className="label-text">{label}:</span>
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={num}
          onChange={(e) =>
            handleNumericChange(optionKey, constrain(e.target.value, min, max))
          }
          className="numeric-input"
        />
        <select
          value={unit}
          onChange={(e) => handleUnitChange(optionKey, e.target.value)}
          className="unit-select"
        >
          <option value="px">px</option>
          <option value="em">em</option>
          <option value="pt">pt</option>
          <option value="%">%</option>
        </select>
      </label>
    );
  };

  return (
    <div className="toolbar">
      <div className="toolbar-group">
        <button
          className="btn btn-success"
          onClick={downloadPDF}
          title="Download PDF"
        >
          <Download size={16} />
          <span>PDF</span>
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
        <NumericInput
          label="Font"
          optionKey="fontSize"
          min={8}
          max={32}
          step={0.5}
        />
        <NumericInput
          label="Line"
          optionKey="lineHeight"
          min={0.8}
          max={2.5}
          step={0.05}
        />
        <NumericInput
          label="Top"
          optionKey="marginTop"
          min={0}
          max={100}
          step={1}
        />
        <NumericInput
          label="Bottom"
          optionKey="marginBottom"
          min={0}
          max={100}
          step={1}
        />
        <NumericInput
          label="Left"
          optionKey="marginLeft"
          min={0}
          max={100}
          step={1}
        />
        <NumericInput
          label="Right"
          optionKey="marginRight"
          min={0}
          max={100}
          step={1}
        />
      </div>
    </div>
  );
}
