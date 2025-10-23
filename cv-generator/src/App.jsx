import { useState, useEffect } from "react";
import "./App.css";
import Toolbar from "./components/Toolbar";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import BackgroundParticles from "./components/BackgroundParticles";
import Notice from "./components/Notice";
import { DEFAULT_CV } from "./utils/constants";
import { loadFromStorage } from "./utils/storage";

function App() {
  const [content, setContent] = useState(DEFAULT_CV);
  const [options, setOptions] = useState({
    fontSize: "13px",
    lineHeight: "1.12",
    marginTop: "25px",
    marginBottom: "30px",
    marginLeft: "40px",
    marginRight: "40px",
  });

  useEffect(() => {
    const saved = loadFromStorage();
    if (saved) {
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
      <div className="container">
        <Editor content={content} onChange={setContent} />
        <Preview content={content} options={options} />
      </div>
    </div>
  );
}

export default App;
