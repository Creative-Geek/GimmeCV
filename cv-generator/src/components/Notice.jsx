import { useEffect, useState } from "react";
import { FileText, X } from "lucide-react";

const STORAGE_KEY = "pdf_notice_dismissed";

export default function Notice() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY) === "1";
    setHidden(dismissed);
  }, []);

  if (hidden) return null;

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setHidden(true);
  };

  return (
    <div className="notice" role="note" aria-live="polite">
      <div className="notice-content">
        <FileText size={16} aria-hidden="true" />
        <strong>Important!</strong>
        <span>
          Select <em>Save as PDF</em> — not <em>Microsoft Print to PDF</em> —
          when saving.
        </span>
      </div>
      <button
        className="notice-dismiss"
        onClick={dismiss}
        aria-label="Dismiss notice"
      >
        <X size={16} />
      </button>
    </div>
  );
}
