import { FC } from "react"
import { Button, Flex, Space, Typography } from "antd"
import { useUserInfoStore, resetUserInfo } from "../../contexts/UserInfoStore"
import { useNavigate } from "react-router-dom"
import { usePageStore } from "../../contexts/PageStore"

const UserBox: FC = () => {
  const navigate = useNavigate()

  const { Text } = Typography
  const { username } = useUserInfoStore()
  const { setMainNavBarSelect } = usePageStore()

  const navUser = () => {
    setMainNavBarSelect("")
    navigate("/user")
  }

  const logout = () => {
    navigate("/login")
    resetUserInfo()
  }

  return (
    <Space style={{ marginRight: 20 }}>
      <Text style={{ color: "white", fontSize: "16px" }}>Hi, {username}</Text>
      <Button
        type="text"
        onClick={navUser}
        style={{ color: "white", backgroundColor: "#1677ff" }}
      >
        管理
      </Button>
      <Button type="text" onClick={logout} danger>
        登出
      </Button>
    </Space>
  )
}

export default UserBox
