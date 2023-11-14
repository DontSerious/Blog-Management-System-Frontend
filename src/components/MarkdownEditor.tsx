import { useState } from 'react';
import MarkdownEditor from 'react-markdown-editor-lite';
import ReactMarkdown from 'react-markdown';
import 'react-markdown-editor-lite/lib/index.css';

const MyMarkdownEditor = () => {
  const [markdown, setMarkdown] = useState('# Write your markdown here');

  const handleEditorChange = ({ text }: { text: string }) => {
    setMarkdown(text);
  };

  return (
    <div>
      <MarkdownEditor
        value={markdown}
        onChange={handleEditorChange}
        renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
      />
    </div>
  );
};

export default MyMarkdownEditor;
