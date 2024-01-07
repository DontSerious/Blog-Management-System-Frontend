import type { FC } from "react"
import { Col, Layout, Row, Typography } from "antd"
import HeaderWig from "../components/Widgets/HeaderWig"
import { Outlet } from "react-router-dom"
import { usePageStore } from "../contexts/PageStore"

const { Header, Content, Footer } = Layout

const Home: FC = () => {
  const { Text } = Typography

  const { moduleName } = usePageStore()

  return (
    <Layout>
      <Header>
        <HeaderWig />
      </Header>

      <Content>
        <Row justify={"center"}>
          <Col span={17}>
            <Text
              style={{ fontSize: "20px", display: "block", margin: "10px 0" }}
            >
              {moduleName}
            </Text>
          </Col>
          <Col
            span={16}
            style={{
              backgroundColor: "white",
              padding: "24px",
              minHeight: "50vh",
            }}
          >
            <Outlet />
          </Col>
        </Row>
      </Content>
      <Footer></Footer>
    </Layout>
  )
}

export default Home
