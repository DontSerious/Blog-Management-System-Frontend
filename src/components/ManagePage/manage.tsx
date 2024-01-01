import { FC, useEffect } from "react"
import { Layout, theme } from "antd"
import SideBar from "./SideBar"
import ShowInfoForm from "./ShowInfoForm"
import { usePageStore } from "../../contexts/PageStore"

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
  )
}

export default ManagePage
