import { FC } from "react"
import MarkdownEditor from "react-markdown-editor-lite"
import ReactMarkdown from "react-markdown"
import "react-markdown-editor-lite/lib/index.css"
import { useEditStore } from "../../contexts/EditPageStore"

const MyMarkdownEditor: FC = () => {
  const { currentFile, setCurrFile } = useEditStore()

  const handleEditorChange = ({ text }: { text: string }) => {
    setCurrFile({
      path: currentFile.path,
      content: text,
    })
  }

  return (
    <div>
      <MarkdownEditor
        value={currentFile.content}
        onChange={handleEditorChange}
        renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
      />
    </div>
  )
}

export default MyMarkdownEditor
