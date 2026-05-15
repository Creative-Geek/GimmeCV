import { useState, useEffect, useCallback, useRef } from "react";
import { parseFrontmatter, postProcessHTML } from "../utils/cvParser";
import { buildHTML } from "../utils/htmlBuilder";
import { deleteSlot } from "../utils/storage";
import {
  Download,
  Save,
  Upload,
  RotateCcw,
  Github,
  Link,
  FilePlus,
  Trash2,
  Pencil,
  MoreHorizontal,
  Settings2,
  ArrowRight,
} from "lucide-react";
import IconImage from "../../images/icon.png";
import { generateShareableUrl, validateUrlLength } from "../utils/urlEncoding";
import { shortenUrl } from "../utils/urlShortener";
import Modal from "./Modal";
import { useToast } from "./Toast";

const PRINT_DISMISSED_KEY = "print_checklist_dismissed";

export default function Toolbar({
  content,
  options,
  onOptionsChange,
  isDirty,
  activeSlotId,
  slotList,
  onSave,
  onSaveAs,
  onSwitchSlot,
  onRevert,
  onReset,
  onRenameSlot,
  onDeleteSlot,
}) {
  const { addToast } = useToast();

  // Modal state
  const [modalType, setModalType] = useState(null);
  const [saveAsName, setSaveAsName] = useState("");
  const [renameName, setRenameName] = useState("");
  const [pendingSwitchId, setPendingSwitchId] = useState(null);

  // UI state
  const [showMore, setShowMore] = useState(false);
  const [showLayout, setShowLayout] = useState(false);
  const moreRef = useRef(null);

  // Close More menu on outside click
  useEffect(() => {
    if (!showMore) return;
    const handler = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setShowMore(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showMore]);

  // Listen for Ctrl+S saves from App
  useEffect(() => {
    const handler = () => addToast("Saved", "success");
    window.addEventListener("gimmecv:saved", handler);
    return () => window.removeEventListener("gimmecv:saved", handler);
  }, [addToast]);

  const validateCssValue = (v) => /^\d+(\.\d+)?(px|em|rem|%|pt)?$/.test(v);

  const handleOptionChange = (key, value) =>
    onOptionsChange({ ...options, [key]: value });

  const closeModal = () => {
    setModalType(null);
    setSaveAsName("");
    setRenameName("");
    setPendingSwitchId(null);
  };

  // ── Rename ──────────────────────────────────────
  const handleRenameClick = () => {
    if (!activeSlotId) return;
    const current = slotList.find((s) => s.id === activeSlotId);
    setRenameName(current ? current.name : "");
    setModalType("rename");
  };

  const confirmRename = () => {
    const name = renameName.trim();
    if (!name || !activeSlotId) return;
    onRenameSlot(activeSlotId, name);
    addToast(`Renamed to "${name}"`, "success");
    closeModal();
  };

  // ── Save ────────────────────────────────────────
  const handleSave = () => {
    if (!activeSlotId) {
      setSaveAsName("");
      setModalType("saveAs");
      return;
    }
    const ok = onSave();
    if (ok) addToast("Saved", "success");
    else addToast("Failed to save", "error");
  };

  // ── Save As ─────────────────────────────────────
  const handleSaveAsConfirm = () => {
    const name = saveAsName.trim();
    if (!name) return;
    onSaveAs(name);
    addToast(`Saved as "${name}"`, "success");
    closeModal();
  };

  // ── Slot switch ─────────────────────────────────
  const handleSlotChange = (e) => {
    const id = e.target.value;
    if (id === activeSlotId) return;
    if (isDirty) {
      setPendingSwitchId(id);
      setModalType("switchSlot");
    } else {
      onSwitchSlot(id);
    }
  };

  const confirmSwitch = () => {
    if (pendingSwitchId) onSwitchSlot(pendingSwitchId);
    closeModal();
  };

  // ── Revert ──────────────────────────────────────
  const handleRevert = () => {
    setShowMore(false);
    if (!isDirty) {
      addToast("No unsaved changes", "warning");
      return;
    }
    setModalType("revert");
  };

  const confirmRevert = () => {
    onRevert();
    addToast("Reverted to last save", "success");
    closeModal();
  };

  // ── Reset ───────────────────────────────────────
  const handleResetClick = () => {
    setShowMore(false);
    setModalType("reset");
  };

  const confirmReset = () => {
    onReset();
    addToast("Reset to default template", "success");
    closeModal();
  };

  // ── Delete ──────────────────────────────────────
  const handleDeleteClick = () => {
    setShowMore(false);
    if (!activeSlotId) return;
    setModalType("delete");
  };

  const confirmDelete = () => {
    if (!activeSlotId) return;
    deleteSlot(activeSlotId);
    onDeleteSlot(activeSlotId);
    addToast("Slot deleted", "success");
    closeModal();
  };

  // ── PDF ─────────────────────────────────────────
  const executePrint = useCallback(async () => {
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
      addToast("Pop-up blocked - please allow pop-ups", "error");
      return;
    }

    w.document.open();
    w.document.write(html);
    w.document.close();

    await new Promise((resolve) => {
      if (w.document.readyState === "complete") {
        resolve();
        return;
      }
      w.addEventListener("load", () => resolve(), { once: true });
      setTimeout(resolve, 1000);
    });

    if (w.document.fonts?.ready) await w.document.fonts.ready.catch(() => {});
    if (w.Iconify) await new Promise((r) => setTimeout(r, 500));

    w.focus();
    w.print();
  }, [content, options, addToast]);

  const handleDownloadPDF = () => {
    const dismissed = localStorage.getItem(PRINT_DISMISSED_KEY) === "1";
    if (dismissed) executePrint();
    else setModalType("printChecklist");
  };

  const confirmPrint = (dontShowAgain) => {
    if (dontShowAgain) localStorage.setItem(PRINT_DISMISSED_KEY, "1");
    closeModal();
    executePrint();
  };

  // ── Share URL ───────────────────────────────────
  const handleShortenUrl = async (longUrl) => {
    addToast("Shortening...", "success", 2000);
    const shortUrl = await shortenUrl(longUrl);
    if (shortUrl) {
      try {
        await navigator.clipboard.writeText(shortUrl);
        addToast("Short link copied!", "success");
      } catch {
        addToast("Failed to copy short link", "error");
      }
    } else {
      addToast("Shortening unavailable", "warning");
    }
  };

  const handleGenerateUrl = () => {
    try {
      const result = generateShareableUrl({ content, options });
      const validation = validateUrlLength(result.url);
      console.log("URL stats:", result);
      navigator.clipboard
        .writeText(result.url)
        .then(() => {
          let msg = "Link copied!";
          if (validation.warning) msg += ` ${validation.warning}`;
          const toastType = validation.warning ? "warning" : "success";
          addToast(
            <span>
              {msg}{" "}
              <button
                className="toast-action"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShortenUrl(result.url);
                }}
              >
                Shorten
              </button>
            </span>,
            toastType,
            6000,
          );
        })
        .catch(() =>
          addToast("Failed to copy - check browser permissions", "error"),
        );
    } catch (error) {
      addToast(`${error.message}`, "error");
    }
  };

  // ── Render ──────────────────────────────────────
  const activeSlotName = slotList.find((s) => s.id === activeSlotId)?.name;

  return (
    <>
      <div className="toolbar">
        {/* ── Row 1: document bar ── */}
        <div className="toolbar-row1">
          {/* Brand */}
          <div className="toolbar-brand">
            <img src={IconImage} alt="GimmeCV" className="toolbar-icon" />
            <strong>GimmeCV</strong>
          </div>

          <div className="toolbar-sep" />

          {/* Slot selector */}
          <div className="toolbar-slot">
            {slotList.length > 0 && (
              <select
                className="slot-select"
                value={activeSlotId || ""}
                onChange={handleSlotChange}
                title="Switch CV"
              >
                {!activeSlotId && <option value="">- Unsaved -</option>}
                {slotList.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            )}
            {activeSlotId && (
              <button
                className="btn btn-icon"
                onClick={handleRenameClick}
                title="Rename this CV"
              >
                <Pencil size={13} />
              </button>
            )}
          </div>

          {/* Dirty indicator - right after slot */}
          {isDirty && (
            <span className="dirty-indicator">
              <span className="dirty-dot" />
              Unsaved
            </span>
          )}

          <div className="toolbar-sep" />

          {/* Primary actions */}
          <div className="toolbar-actions">
            <button
              className="btn btn-success"
              onClick={handleDownloadPDF}
              title="Download PDF"
            >
              <Download size={15} />
              <span className="btn-label">PDF</span>
            </button>
            <button
              className="btn btn-primary"
              onClick={handleGenerateUrl}
              title="Copy shareable link"
            >
              <Link size={15} />
              <span className="btn-label">Share URL</span>
            </button>
            <button className="btn" onClick={handleSave} title="Save (Ctrl+S)">
              <Save size={15} />
              <span className="btn-label">Save</span>
            </button>
            <button
              className="btn"
              onClick={() => {
                setSaveAsName("");
                setModalType("saveAs");
              }}
              title="Save as new CV"
            >
              <FilePlus size={15} />
              <span className="btn-label">Save As</span>
            </button>
          </div>

          {/* More dropdown */}
          <div className="more-dropdown-wrap" ref={moreRef}>
            <button
              className="btn btn-icon"
              onClick={() => setShowMore((v) => !v)}
              title="More options"
            >
              <MoreHorizontal size={15} />
            </button>
            {showMore && (
              <div className="more-menu">
                <button className="btn" onClick={handleRevert}>
                  <Upload size={14} /> Revert
                </button>
                <button className="btn" onClick={handleResetClick}>
                  <RotateCcw size={14} /> Reset to default
                </button>
                {activeSlotId && (
                  <button
                    className="btn btn-danger"
                    onClick={handleDeleteClick}
                  >
                    <Trash2 size={14} /> Delete this CV
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="toolbar-sep" />

          {/* Layout toggle */}
          <button
            className={`btn btn-icon layout-toggle${showLayout ? " btn-primary" : ""}`}
            onClick={() => setShowLayout((v) => !v)}
            title="Toggle layout options"
          >
            <Settings2 size={14} />
          </button>

          {/* Spacer → GitHub far right */}
          <div className="toolbar-spacer" />

          <a
            href="https://github.com/Creative-Geek/GimmeCV"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            title="View on GitHub"
            style={{ textDecoration: "none" }}
          >
            <Github size={14} />
            <span className="btn-label">GitHub</span>
          </a>
        </div>

        {/* ── Row 2: layout options (collapsible) ── */}
        <div className={`toolbar-row2${showLayout ? "" : " hidden"}`}>
          {[
            { key: "fontSize", label: "Font size", validate: validateCssValue },
            {
              key: "lineHeight",
              label: "Line height",
              validate: (v) => /^\d+(\.\d+)?$/.test(v),
            },
            {
              key: "marginTop",
              label: "Margin top",
              validate: validateCssValue,
            },
            {
              key: "marginBottom",
              label: "Margin bottom",
              validate: validateCssValue,
            },
            {
              key: "marginLeft",
              label: "Margin left",
              validate: validateCssValue,
            },
            {
              key: "marginRight",
              label: "Margin right",
              validate: validateCssValue,
            },
          ].map(({ key, label, validate }) => (
            <label key={key}>
              {label}
              <input
                type="text"
                value={options[key]}
                onChange={(e) => handleOptionChange(key, e.target.value)}
                className={validate(options[key]) ? "" : "input-invalid"}
              />
            </label>
          ))}
        </div>
      </div>

      {/* ── Modals ─────────────────────────────── */}

      <Modal
        isOpen={modalType === "rename"}
        onClose={closeModal}
        title="Rename CV"
        actions={[
          { label: "Cancel", onClick: closeModal },
          { label: "Rename", onClick: confirmRename, variant: "primary" },
        ]}
      >
        <p>Enter a new name:</p>
        <input
          type="text"
          value={renameName}
          onChange={(e) => setRenameName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && confirmRename()}
          placeholder="e.g. Software Engineer"
          autoFocus
        />
      </Modal>

      <Modal
        isOpen={modalType === "saveAs"}
        onClose={closeModal}
        title="Save As"
        actions={[
          { label: "Cancel", onClick: closeModal },
          { label: "Save", onClick: handleSaveAsConfirm, variant: "primary" },
        ]}
      >
        <p>Enter a name for this CV:</p>
        <input
          type="text"
          value={saveAsName}
          onChange={(e) => setSaveAsName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSaveAsConfirm()}
          placeholder="e.g. Software Engineer"
          autoFocus
        />
      </Modal>

      <Modal
        isOpen={modalType === "switchSlot"}
        onClose={closeModal}
        title="Unsaved Changes"
        actions={[
          { label: "Cancel", onClick: closeModal },
          {
            label: "Discard & Switch",
            onClick: confirmSwitch,
            variant: "danger",
          },
        ]}
      >
        <p>
          You have unsaved changes. Switching CVs will discard them. Continue?
        </p>
      </Modal>

      <Modal
        isOpen={modalType === "revert"}
        onClose={closeModal}
        title="Revert Changes"
        actions={[
          { label: "Cancel", onClick: closeModal },
          { label: "Revert", onClick: confirmRevert, variant: "danger" },
        ]}
      >
        <p>Discard all changes since last save?</p>
      </Modal>

      <Modal
        isOpen={modalType === "reset"}
        onClose={closeModal}
        title="Reset to Default"
        actions={[
          { label: "Cancel", onClick: closeModal },
          { label: "Reset", onClick: confirmReset, variant: "danger" },
        ]}
      >
        <p>
          Replace editor content with the default CV template? Your saved slot
          is not affected - only the current editor content.
        </p>
      </Modal>

      <Modal
        isOpen={modalType === "delete"}
        onClose={closeModal}
        title="Delete CV"
        actions={[
          { label: "Cancel", onClick: closeModal },
          { label: "Delete", onClick: confirmDelete, variant: "danger" },
        ]}
      >
        <p>Permanently delete this saved CV? This cannot be undone.</p>
      </Modal>

      <PrintChecklistModal
        isOpen={modalType === "printChecklist"}
        onClose={closeModal}
        onConfirm={confirmPrint}
      />
    </>
  );
}

function PrintChecklistModal({ isOpen, onClose, onConfirm }) {
  const [dontShow, setDontShow] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Before You Print"
      actions={[
        { label: "Cancel", onClick: onClose },
        {
          label: (
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              Continue <ArrowRight size={14} />
            </span>
          ),
          onClick: () => onConfirm(dontShow),
          variant: "success",
        },
      ]}
    >
      <div className="checklist-item">
        <span>1.</span>
        <span>
          Set Destination to <em>Save as PDF</em> - not{" "}
          <em>Microsoft Print to PDF</em>
        </span>
      </div>
      <div className="checklist-item">
        <span>2.</span>
        <span>
          Set Margins to <em>None</em>
        </span>
      </div>
      <div className="checklist-item">
        <span>3.</span>
        <span>
          Enable <em>Background graphics</em>
        </span>
      </div>
      <hr className="checklist-divider" />
      <label className="checklist-item" style={{ cursor: "pointer" }}>
        <input
          type="checkbox"
          checked={dontShow}
          onChange={(e) => setDontShow(e.target.checked)}
        />
        <span>Don't show this again</span>
      </label>
    </Modal>
  );
}
