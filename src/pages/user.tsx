import { Button, Form, Input, Layout, message } from "antd"
import { FC } from "react"
import HeaderWig from "../components/Widgets/HeaderWig"
import { Content } from "antd/es/layout/layout"
import { useUserInfoStore } from "../contexts/UserInfoStore"

const User: FC = () => {
  const { userId, username } = useUserInfoStore()

  // 表单提交成功的回调
  const onFinish = (values: any) => {
    // 在这里处理密码修改逻辑
    console.log("Received values:", values)
    // 示例：调用修改密码的 API
    // 这里需要替换为您的实际修改密码逻辑
    // 如果成功，可以提示用户，并清空表单
    message.success("Password updated successfully")
  }

  // 表单提交失败的回调
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo)
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
        </div>

        {/* 修改密码表单 */}
        <div style={{ marginTop: "24px" }}>
          <h2>Change Password</h2>
          <Form
            name="changePassword"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
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
