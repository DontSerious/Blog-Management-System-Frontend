import { FC, useEffect } from "react"
import { Divider, Layout } from "antd"
import MyMarkdownEditor from "./MarkdownEditor"
import SearchBox from "../Widgets/SearchBox"
import TopHandler from "./TopHandler"
import { usePageStore } from "../../contexts/PageStore"
import FileInfoBox from "./FileInfoBox"
import type { DirectoryTreeProps } from "antd/es/tree"
import { getFileContent } from "../../services/editAPI"
import { useEditStore } from "../../contexts/EditPageStore"
import DirTree from "../Widgets/DirTree"

const { Content, Sider } = Layout

const Edit: FC = () => {
  const { setMainNavBarSelect } = usePageStore()
  const { setCurrFile } = useEditStore()

  useEffect(() => {
    setMainNavBarSelect("Edit")
  }, [setMainNavBarSelect])

  // mkEdit变化
  const onSelect: DirectoryTreeProps["onSelect"] = async (keys, info) => {
    const path = String(info.node.key)

    // 选择文件夹时返回
    if (!info.node.isLeaf) return

    try {
      const resp = await getFileContent(path)
      const content = resp.data.data
      setCurrFile({
        path: path,
        content: content,
      })
    } catch (error) {
      console.error("Registration failed:", error)
    }
  }

  return (
    <>
      <TopHandler
        style={{
          padding: "12px 24px",
          marginTop: "24px",
        }}
      />
      <Layout style={{ padding: "0 12px", backgroundColor: "white" }}>
        <Sider style={{ backgroundColor: "white" }} width={315}>
          <SearchBox />
          <DirTree style={{ padding: "12px 0 0 12px" }} onSelect={onSelect} />
          <Divider orientation="left">FileInfo</Divider>
          <FileInfoBox />
        </Sider>
        <Content style={{ padding: "0 24px", minHeight: 280 }}>
          <MyMarkdownEditor />
        </Content>
      </Layout>
    </>
  )
}

export default Edit
