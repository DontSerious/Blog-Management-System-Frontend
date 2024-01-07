import { FC, useEffect } from "react"
import { Col, Row, theme } from "antd"
import SideBar from "./SideBar"
import ShowInfoForm from "./ShowInfoForm"
import { usePageStore } from "../../contexts/PageStore"

const ManagePage: FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const { setMainNavBarSelect, setModuleName } = usePageStore()

  useEffect(() => {
    setModuleName("标签管理页")
  }, [setModuleName])

  useEffect(() => {
    setMainNavBarSelect("Manage")
  }, [setMainNavBarSelect])

  return (
    <Row justify={"center"}>
      <Col style={{ background: colorBgContainer, width: 200 }}>
        <SideBar />
      </Col>
      <Col
        style={{
          padding: "0 24px",
          minHeight: 280,
        }}
      >
        <ShowInfoForm />
      </Col>
    </Row>
  )
}

export default ManagePage
