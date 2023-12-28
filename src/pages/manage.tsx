import { FC, useEffect } from "react"
import { Layout, theme } from "antd"
import SideBar from "../components/ManagePage/SideBar"
import ShowInfoForm from "../components/ManagePage/ShowInfoForm"
import { usePageStore } from "../contexts/PageStore"
import HeaderWig from "../components/Widgets/HeaderWig"

const { Content, Sider } = Layout

const ManagePage: FC = () => {
  const { setMainNavBarSelect } = usePageStore()

  const {
    token: { colorBgContainer },
  } = theme.useToken()

  useEffect(() => {
    setMainNavBarSelect("Manage")
  }, [setMainNavBarSelect])

  return (
    <Layout>
      <HeaderWig />
      <Content
        style={{
          padding: "30px 50px",
        }}
      >
        <Layout
          style={{
            padding: "24px 24px",
            background: colorBgContainer,
          }}
        >
          <Sider style={{ background: colorBgContainer }}>
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
