import { useEffect, useRef } from "react";
import "./Modal.css";

/**
 * Reusable modal dialog.
 *
 * @param {object} props
 * @param {boolean} props.isOpen
 * @param {() => void} props.onClose
 * @param {string} props.title
 * @param {React.ReactNode} props.children  - body content
 * @param {Array<{label:string, onClick:()=>void, variant?:string}>} [props.actions]
 */
export default function Modal({ isOpen, onClose, title, children, actions = [] }) {
  const overlayRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div className="modal-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="modal-box" role="dialog" aria-modal="true">
        {title && <div className="modal-title">{title}</div>}
        <div className="modal-body">{children}</div>
        {actions.length > 0 && (
          <div className="modal-actions">
            {actions.map((a, i) => (
              <button
                key={i}
                className={`btn ${a.variant ? `btn-${a.variant}` : ""} ${a.className || ""}`.trim()}
                onClick={a.onClick}
                disabled={a.disabled}
              >
                {a.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
