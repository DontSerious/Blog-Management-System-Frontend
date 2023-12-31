import { Button, Form, Input, message } from "antd"
import { FC, useEffect } from "react"
import { useUserInfoStore } from "../../contexts/UserInfoStore"
import { changePWD, login } from "../../services/userAPI"
import { AdminUserName, StatusSuccess } from "../../utils/constants"
import { Navigate, Outlet } from "react-router-dom"
import { usePageStore } from "../../contexts/PageStore"

type formRes = {
  confirmPassword: string
  currentPassword: string
  newPassword: string
}

const User: FC = () => {
  const { userId, username } = useUserInfoStore()
  const { setModuleName } = usePageStore()

  useEffect(() => {
    setModuleName("用户信息页")
  }, [setModuleName])

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

  const navigate = () => {
    if (username === AdminUserName) {
      return <Navigate to={"/user/adminBox"} replace />
    } else {
      return <Navigate to={"/user/userBox"} replace />
    }
  }

  return (
    <div>
      {navigate()}
      <Outlet />

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
    </div>
  )
}

export default User
