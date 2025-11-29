import MDEditor, { commands } from "@uiw/react-md-editor";

export default function Editor({ content, onChange }) {
  return (
    <div className="editor-panel" data-color-mode="light">
      <div className="editor-header">Markdown Editor</div>
      <div className="editor-content">
        <MDEditor
          value={content}
          onChange={onChange}
          preview="edit"
          height="100%"
          visibleDragbar={false}
          tabSize={2}
          commands={[
            commands.group(
              [
                commands.title1,
                commands.title2,
                commands.title3,
                commands.title4,
                commands.title5,
                commands.title6,
              ],
              {
                name: "title",
                groupName: "title",
                buttonProps: { "aria-label": "Insert title" },
              }
            ),
            commands.bold,
            commands.italic,
            commands.divider,
            commands.link,
            commands.divider,
            commands.unorderedListCommand,
            commands.orderedListCommand,
            commands.divider,
            commands.hr,
          ]}
          extraCommands={[]}
        />
      </div>
    </div>
  );
}
