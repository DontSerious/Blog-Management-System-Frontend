import { Col, Flex, Row, Typography } from "antd"
import { FC } from "react"
import NavBar from "../Header/NavBar"
import UserBox from "../Header/UserBox"

const HeaderWig: FC = () => {
  const { Text } = Typography

  return (
    <Row justify={"center"}>
      <Col span={20}>
        <Flex justify="space-between" align="center">
          <div>
            <Text style={{ color: "white", fontSize: "20px" }}>
              博客管理系统
            </Text>
          </div>
          <NavBar />
          <UserBox />
        </Flex>
      </Col>
    </Row>
  )
}

export default HeaderWig
