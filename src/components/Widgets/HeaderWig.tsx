import { Typography } from "antd"
import { Header } from "antd/es/layout/layout"
import { FC } from "react"
import NavBar from "../Header/NavBar"
import UserBox from "../Header/UserBox"

const HeaderWig: FC = () => {
  const { Text } = Typography

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <Text style={{ color: "white", fontSize: "20px" }}>博客管理系统</Text>
      </div>
      <NavBar />
      <UserBox />
    </Header>
  )
}

export default HeaderWig
