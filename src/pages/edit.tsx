import { FC } from "react"
import { Layout, theme } from "antd"
import TreeDirNav from "../components/EditPage/TreeDirNav"
import MyMarkdownEditor from "../components/EditPage/MarkdownEditor"
import NavBar from "../components/Header/NavBar"
import UserBox from "../components/Header/UserBox"
import SearchBox from "../components/Widgets/SearchBox"
import TopHandler from "../components/EditPage/TopHandler"

const { Header, Content, Sider } = Layout

const Edit: FC = () => {
  // page
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center", padding: 0 }}>
        <NavBar />
        <UserBox />
      </Header>
      <Content style={{ padding: "0 40px" }}>
        <TopHandler
          style={{
            padding: "12px 24px",
            marginTop: "24px",
            background: colorBgContainer,
          }}
        />
        <Layout style={{ paddingBottom: "24px", background: colorBgContainer }}>
          <Sider style={{ background: colorBgContainer }} width={200}>
            <SearchBox />
            <TreeDirNav style={{ padding: "12px 0 0 12px" }} />
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
