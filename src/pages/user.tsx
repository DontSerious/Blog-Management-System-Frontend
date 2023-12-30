import { Button, Form, Input, Layout, message } from "antd"
import { FC } from "react"
import HeaderWig from "../components/Widgets/HeaderWig"
import { Content } from "antd/es/layout/layout"
import { useUserInfoStore } from "../contexts/UserInfoStore"
import { changePWD, login } from "../services/userAPI"
import { StatusSuccess } from "../utils/constants"

type formRes = {
  confirmPassword: string
  currentPassword: string
  newPassword: string
}

const User: FC = () => {
  const { userId, username } = useUserInfoStore()
  const { info } = useUserInfoStore()

  // 表单提交成功的回调
  const onFinish = async (values: formRes) => {
    const req = new FormData()
    req.append("username", username)
    req.append("password", values.currentPassword)
    const resp = await login(req)
    const data = resp.data
    if (data.status_code === StatusSuccess) {
      const req = new FormData()
      req.append("_id", userId)
      req.append("password", values.confirmPassword)
      const resp = await changePWD(req)
      const data = resp.data
      if (data.status_code === StatusSuccess) {
        message.success(data.status_msg)
      } else {
        message.error(data.status_msg)
      }
    } else {
      message.error("旧密码错误")
    }
  }

  return (
    <Layout>
      <HeaderWig />
      <Content
        style={{ margin: "24px", backgroundColor: "white", padding: "24px" }}
      >
        {/* 用户资料展示 */}
        <div>
          <h2>User Profile</h2>
          <p>userId: {userId}</p>
          <p>username: {username}</p>
          <p>categories: {info.categories.toLocaleString()}</p>
          <p>tags: {info.tags.toLocaleString()}</p>
        </div>

        {/* 修改密码表单 */}
        <div style={{ marginTop: "24px" }}>
          <h2>Change Password</h2>
          <Form name="changePassword" onFinish={onFinish} layout="vertical">
            <Form.Item
              label="Current Password"
              name="currentPassword"
              rules={[
                {
                  required: true,
                  message: "Please enter your current password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                { required: true, message: "Please enter your new password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Confirm New Password"
              name="confirmPassword"
              dependencies={["newPassword"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match!")
                    )
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Change Password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  )
}

export default User
