import { FC, useEffect } from "react"
import { Divider, Layout, theme } from "antd"
import MyMarkdownEditor from "../components/EditPage/MarkdownEditor"
import SearchBox from "../components/Widgets/SearchBox"
import TopHandler from "../components/EditPage/TopHandler"
import { usePageStore } from "../contexts/PageStore"
import FileInfoBox from "../components/EditPage/FileInfoBox"
import type { DirectoryTreeProps } from "antd/es/tree"
import { getFileContent } from "../services/editAPI"
import { useEditStore } from "../contexts/EditPageStore"
import DirTree from "../components/Widgets/DirTree"
import HeaderWig from "../components/Widgets/HeaderWig"

const { Content, Sider } = Layout

const Edit: FC = () => {
  const { setMainNavBarSelect } = usePageStore()
  const { setCurrFile } = useEditStore()

  useEffect(() => {
    setMainNavBarSelect("Edit")
  }, [setMainNavBarSelect])

  const {
    token: { colorBgContainer },
  } = theme.useToken()

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
    <Layout>
      <HeaderWig />
      <Content style={{ padding: "0 40px" }}>
        <TopHandler
          style={{
            padding: "12px 24px",
            marginTop: "24px",
            background: colorBgContainer,
          }}
        />
        <Layout style={{ paddingBottom: "24px", background: colorBgContainer }}>
          <Sider style={{ background: colorBgContainer }} width={315}>
            <SearchBox />
            <DirTree style={{ padding: "12px 0 0 12px" }} onSelect={onSelect} />
            <Divider orientation="left">FileInfo</Divider>
            <FileInfoBox />
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <MyMarkdownEditor />
          </Content>
        </Layout>
      </Content>
    </Layout>
  )
}

export default Edit
