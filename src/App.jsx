import { useState, useEffect, useCallback, useMemo } from "react";
import "./App.css";
import Toolbar from "./components/Toolbar";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import BackgroundParticles from "./components/BackgroundParticles";
import { DEFAULT_CV } from "./utils/constants";
import {
  getSlotList,
  getActiveSlotId,
  loadSlot,
  saveSlot,
  createSlot,
  setActiveSlot,
  renameSlot,
} from "./utils/storage";
import { loadFromUrlFragment } from "./utils/urlEncoding";
import { DEFAULT_OPTIONS } from "./utils/defaults";

function stableStringify(obj) {
  return JSON.stringify(obj, Object.keys(obj).sort());
}

function App() {
  const [content, setContent] = useState(DEFAULT_CV);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [urlLoadError, setUrlLoadError] = useState(null);

  // Slot management
  const [activeSlotId, setActiveSlotIdState] = useState(null);
  const [slotList, setSlotList] = useState([]);

  // Saved snapshots for dirty comparison
  const [savedContent, setSavedContent] = useState(DEFAULT_CV);
  const [savedOptions, setSavedOptions] = useState(DEFAULT_OPTIONS);

  // Mobile editor toggle
  const [showMobileEditor, setShowMobileEditor] = useState(false);

  const isDirty = useMemo(
    () =>
      content !== savedContent ||
      stableStringify(options) !== stableStringify(savedOptions),
    [content, options, savedContent, savedOptions]
  );

  const refreshSlotList = useCallback(() => {
    setSlotList(getSlotList());
  }, []);

  // ── Initial load ──────────────────────────────
  useEffect(() => {
    // Priority 1: URL fragment
    try {
      const urlData = loadFromUrlFragment();
      if (urlData) {
        console.log("✅ Loaded CV data from URL fragment");
        setContent(urlData.content);
        const mergedOptions = { ...DEFAULT_OPTIONS, ...urlData.options };
        setOptions(mergedOptions);
        setSavedContent(urlData.content);
        setSavedOptions(mergedOptions);
        // Don't create a slot yet — load as unsaved, user decides to Save As
        window.history.replaceState(null, "", window.location.pathname);
        refreshSlotList();
        return;
      }
    } catch (error) {
      console.error("❌ Failed to load data from URL:", error);
      setUrlLoadError(error.message);
    }

    // Priority 2: Active slot from localStorage
    refreshSlotList();
    const activeId = getActiveSlotId();
    if (activeId) {
      const slot = loadSlot(activeId);
      if (slot) {
        setActiveSlotIdState(activeId);
        setContent(slot.content);
        const mergedOptions = { ...DEFAULT_OPTIONS, ...slot.options };
        setOptions(mergedOptions);
        setSavedContent(slot.content);
        setSavedOptions(mergedOptions);
        console.log("📦 Loaded slot:", slot.name);
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Tab title with dirty indicator ────────────
  useEffect(() => {
    const activeSlot = activeSlotId ? loadSlot(activeSlotId) : null;
    const slotName = activeSlot ? activeSlot.name : "Untitled";
    document.title = isDirty ? `* ${slotName} — GimmeCV` : `${slotName} — GimmeCV`;
  }, [isDirty, activeSlotId]);

  // ── Ctrl+S handler ────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        if (activeSlotId && isDirty) {
          saveSlot(activeSlotId, { content, options });
          setSavedContent(content);
          setSavedOptions({ ...options });
          refreshSlotList();
          // Toast is triggered from Toolbar, but for Ctrl+S we dispatch a custom event
          window.dispatchEvent(new CustomEvent("gimmecv:saved"));
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeSlotId, isDirty, content, options, refreshSlotList]);

  // ── beforeunload guard ────────────────────────
  useEffect(() => {
    if (!isDirty) return;
    const handler = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  // ── Callbacks for Toolbar ─────────────────────
  const handleSave = useCallback(() => {
    if (!activeSlotId) return false;
    const ok = saveSlot(activeSlotId, { content, options });
    if (ok) {
      setSavedContent(content);
      setSavedOptions({ ...options });
      refreshSlotList();
    }
    return ok;
  }, [activeSlotId, content, options, refreshSlotList]);

  const handleSaveAs = useCallback(
    (name) => {
      const id = createSlot(name, { content, options });
      setActiveSlotIdState(id);
      setSavedContent(content);
      setSavedOptions({ ...options });
      refreshSlotList();
      return id;
    },
    [content, options, refreshSlotList]
  );

  const handleSwitchSlot = useCallback(
    (id) => {
      const slot = loadSlot(id);
      if (!slot) return;
      setActiveSlotIdState(id);
      setActiveSlot(id);
      setContent(slot.content);
      const mergedOptions = { ...DEFAULT_OPTIONS, ...slot.options };
      setOptions(mergedOptions);
      setSavedContent(slot.content);
      setSavedOptions(mergedOptions);
    },
    []
  );

  const handleRevert = useCallback(() => {
    if (!activeSlotId) return;
    const slot = loadSlot(activeSlotId);
    if (!slot) return;
    setContent(slot.content);
    const mergedOptions = { ...DEFAULT_OPTIONS, ...slot.options };
    setOptions(mergedOptions);
    setSavedContent(slot.content);
    setSavedOptions(mergedOptions);
  }, [activeSlotId]);

  const handleReset = useCallback(() => {
    setContent(DEFAULT_CV);
    setOptions({ ...DEFAULT_OPTIONS });
  }, []);

  const handleRenameSlot = useCallback(
    (id, name) => {
      renameSlot(id, name);
      refreshSlotList();
    },
    [refreshSlotList]
  );

  const handleDeleteSlot = useCallback(
    (id) => {
      // After deletion, storage.js picks a new active slot
      const list = getSlotList().filter((s) => s.id !== id);
      if (list.length > 0) {
        const nextId = list[0].id;
        const nextSlot = loadSlot(nextId);
        if (nextSlot) {
          handleSwitchSlot(nextId);
        }
      } else {
        // No slots left — reset to defaults
        setActiveSlotIdState(null);
        setContent(DEFAULT_CV);
        setOptions({ ...DEFAULT_OPTIONS });
        setSavedContent(DEFAULT_CV);
        setSavedOptions({ ...DEFAULT_OPTIONS });
      }
      refreshSlotList();
    },
    [handleSwitchSlot, refreshSlotList]
  );

  return (
    <div className="app-root">
      <BackgroundParticles />
      <Toolbar
        content={content}
        options={options}
        onOptionsChange={setOptions}
        onContentChange={setContent}
        isDirty={isDirty}
        activeSlotId={activeSlotId}
        slotList={slotList}
        onSave={handleSave}
        onSaveAs={handleSaveAs}
        onSwitchSlot={handleSwitchSlot}
        onRevert={handleRevert}
        onReset={handleReset}
        onRenameSlot={handleRenameSlot}
        onDeleteSlot={handleDeleteSlot}
      />
      {urlLoadError && (
        <div
          style={{
            padding: "15px",
            margin: "10px 20px",
            backgroundColor: "#fee",
            border: "1px solid #fcc",
            borderRadius: "5px",
            color: "#c33",
            textAlign: "center",
            zIndex: 1000,
          }}
        >
          <strong>URL Error:</strong> {urlLoadError}
        </div>
      )}
      <div className="container">
        <Editor
          content={content}
          onChange={setContent}
          className={showMobileEditor ? "show-mobile" : ""}
        />
        <Preview content={content} options={options} />
      </div>
      <button
        className="mobile-edit-toggle btn"
        onClick={() => setShowMobileEditor((v) => !v)}
        title={showMobileEditor ? "Show preview" : "Edit CV"}
      >
        {showMobileEditor ? "Preview" : "Edit"}
      </button>
    </div>
  );
}

export default App;
