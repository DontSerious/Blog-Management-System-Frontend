import { FC } from "react"
import { Layout, theme } from "antd"
import NavBar from "../components/Header/NavBar"
import UserBox from "../components/Header/UserBox"
import SideBar from "../components/ManagePage/SideBar"
import ShowInfoForm from "../components/ManagePage/ShowInfoForm"

const { Header, Content, Sider } = Layout

const ManagePage: FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center", padding: 0 }}>
        <NavBar />
        <UserBox />
      </Header>
      <Content style={{ padding: "30px 50px" }}>
        <Layout style={{ padding: "24px 24px", background: colorBgContainer }}>
          <Sider style={{ background: colorBgContainer }} width={200}>
            <SideBar />
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <ShowInfoForm />
          </Content>
        </Layout>
      </Content>
    </Layout>
  )
}

export default ManagePage
