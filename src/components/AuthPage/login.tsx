import { useState, FC, useEffect } from "react"
import { Form, Input, Button, Card, message } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { useNavigate, Link } from "react-router-dom"
import { login, queryInfo } from "../../services/userAPI"
import { AdminUserName, StatusSuccess } from "../../utils/constants"
import { useAuthState, setAuth } from "../../contexts/AuthStore"
import { setUserInfo, useUserInfoStore } from "../../contexts/UserInfoStore"

const Login: FC = () => {
  const navigate = useNavigate()

  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [loginFail, setLoginFail] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const { username } = useUserInfoStore()
  const { statusMsg } = useAuthState()

  useEffect(() => {
    if (loginSuccess) {
      setTimeout(() => {
        if (isAdmin && username === AdminUserName) {
          navigate("/admin")
        } else {
          navigate("/user")
        }
      }, 1500)
    }
  }, [loginSuccess, navigate])

  const onFinish = async (values: any) => {
    setLoading(true)
    setLoginSuccess(false)
    setLoginFail(false)

    try {
      // login
      const response = await login(values)
      const data = response.data
      const userId = data.data
      setAuth(data.status_msg)
      if (data.status_code === StatusSuccess) {
        setLoginSuccess(true)
      } else {
        setLoginFail(true)
      }

      // userInfo
      const infoResponse = await queryInfo(userId)
      const infoData = infoResponse.data
      setUserInfo(userId, values.username, infoData.data)
    } catch (error) {
      message.error("login service error!" + error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card style={{ width: 300 }}>
      <Form form={form} name="login-form" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "输入有误!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="用户名" />
        </Form.Item>

        <Form.Item
          style={{ marginBottom: "10px" }}
          name="password"
          rules={[{ required: true, message: "输入有误!" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="密码" />
        </Form.Item>

        <Form.Item style={{ marginBottom: "10px" }}>
          还没有账号？&nbsp;&nbsp;
          <Link to="/auth/register">注册</Link>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ width: "100%" }}
          >
            登录
          </Button>
        </Form.Item>

        <Form.Item>
          <Button
            type="dashed"
            htmlType="submit"
            loading={loading}
            style={{ width: "100%" }}
            onClick={() => setIsAdmin(true)}
          >
            管理员入口
          </Button>
        </Form.Item>

        <div>
          {loginSuccess ? (
            <p style={{ color: "green" }}> {statusMsg} 正在跳转... </p>
          ) : null}
          {loginFail ? (
            <p style={{ color: "red" }}> {statusMsg} 请重试...</p>
          ) : null}
        </div>
      </Form>
    </Card>
  )
}

export default Login
