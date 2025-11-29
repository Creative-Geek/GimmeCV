import { useState, useEffect } from "react";
import "./App.css";
import Toolbar from "./components/Toolbar";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import BackgroundParticles from "./components/BackgroundParticles";
import Notice from "./components/Notice";
import { DEFAULT_CV } from "./utils/constants";
import { loadFromStorage } from "./utils/storage";
import { loadFromUrlFragment } from "./utils/urlEncoding";

function App() {
  const [content, setContent] = useState(DEFAULT_CV);
  const [options, setOptions] = useState({
    fontSize: "13px",
    lineHeight: "1.12",
    marginTop: "25px",
    marginBottom: "0px",
    marginLeft: "40px",
    marginRight: "40px",
  });
  const [urlLoadError, setUrlLoadError] = useState(null);

  useEffect(() => {
    // Priority 1: Try to load from URL fragment (for external service integration)
    try {
      const urlData = loadFromUrlFragment();
      if (urlData) {
        console.log("✅ Loaded CV data from URL fragment");
        setContent(urlData);
        // Clear the URL fragment after loading to prevent confusion
        // window.history.replaceState(null, '', window.location.pathname);
        return; // Don't load from localStorage if URL data exists
      }
    } catch (error) {
      console.error("❌ Failed to load data from URL:", error);
      setUrlLoadError(
        "Failed to load CV data from URL. The link may be corrupted or invalid."
      );
    }

    // Priority 2: Load from localStorage (user's saved work)
    const saved = loadFromStorage();
    if (saved) {
      console.log("📦 Loaded CV data from localStorage");
      setContent(saved.content);
      setOptions({
        fontSize: saved.fontSize,
        lineHeight: saved.lineHeight,
        marginTop: saved.marginTop,
        marginBottom: saved.marginBottom,
        marginLeft: saved.marginLeft,
        marginRight: saved.marginRight,
      });
    }
  }, []);

  return (
    <div
      className="app-root"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "relative",
        zIndex: 1,
      }}
    >
      <BackgroundParticles />
      <Toolbar
        content={content}
        options={options}
        onOptionsChange={setOptions}
        onContentChange={setContent}
      />
      <Notice />
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
          <strong>⚠️ URL Error:</strong> {urlLoadError}
        </div>
      )}
      <div className="container">
        <Editor content={content} onChange={setContent} />
        <Preview content={content} options={options} />
      </div>
    </div>
  );
}

export default App;
