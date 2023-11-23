import React, { useEffect, useState } from "react"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { Alert, Button, Form, Input, Space } from "antd"
import { useManagePage } from "../../contexts/ManagePageStore"
import { useUserInfoStore, setUserInfo } from "../../contexts/UserInfoStore"
import { updateInfo } from "../../services/userAPI"

interface UserInfoItem {
  key: number
  value: string
}

const ShowInfoForm: React.FC = () => {
  const { selectedMenuItem, showInfo } = useManagePage()
  const { userId, username, info } = useUserInfoStore()
  const [form] = Form.useForm()
  const [postSuccess, setPostSuccess] = useState(false)
  const [updateMsg, setUpdateMsg] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Update form fields when showInfo changes
    const updatedValues = showInfo.map((item, index) => ({
      key: index,
      value: item,
    }))
    form.setFieldsValue({ userInfoList: updatedValues })
  }, [showInfo, form])

  const onFinish = async (values: any) => {
    // 获取页面value
    const valuesArray: string[] = values.userInfoList.map(
      (item: UserInfoItem) => item.value
    )
    selectedMenuItem === "Categories"
      ? (info.categories = valuesArray)
      : (info.tags = valuesArray)
    // 更新状态
    setUserInfo(userId, username, info)

    try {
      // 发送更新请求
      const resp = await updateInfo(userId, info.categories, info.tags)
      const data = resp.data
      setPostSuccess(true)
      setUpdateMsg(data.status_msg)
    } catch (error) {
      console.error("Registration failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form
      form={form}
      name="modify_userInfo"
      onFinish={onFinish}
      style={{ maxWidth: 300 }}
      autoComplete="off"
    >
      <Form.List name="userInfoList">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, "value"]}
                  rules={[{ required: true, message: "为空" }]}
                >
                  <Input placeholder={selectedMenuItem!} />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => {
                  add()
                }}
                block
                icon={<PlusOutlined />}
              >
                添加
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          提交
        </Button>
      </Form.Item>
      {postSuccess ? <Alert message={updateMsg} type="info" /> : null}
    </Form>
  )
}

export default ShowInfoForm
