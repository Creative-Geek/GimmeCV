import { useRef, useEffect } from "react";

export default function Editor({ content, onChange }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current && textareaRef.current.value !== content) {
      textareaRef.current.value = content;
    }
  }, [content]);

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="editor-panel">
      <div className="editor-header">Markdown Editor</div>
      <textarea
        ref={textareaRef}
        className="editor"
        spellCheck="false"
        onChange={handleChange}
      />
    </div>
  );
}
