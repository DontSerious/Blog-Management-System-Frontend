import type { FC } from "react"
import { Layout } from "antd"
import HeaderWig from "../components/Widgets/HeaderWig"
import { Outlet } from "react-router-dom"

const { Content } = Layout

const Home: FC = () => {
  return (
    <Layout>
      <HeaderWig />
      <Content style={{ padding: "0 40px" }}>
        <div style={{ margin: "40px 20px", backgroundColor: "white" }}>
          <Outlet />
        </div>
      </Content>
    </Layout>
  )
}

export default Home
