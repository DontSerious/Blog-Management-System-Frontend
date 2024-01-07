import React, { useEffect, useState } from "react"
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { Alert, Button, Form, Input, Modal, Space, message } from "antd"
import { useManageStore } from "../../contexts/ManagePageStore"
import { useUserInfoStore, setUserInfo } from "../../contexts/UserInfoStore"
import { updateInfo } from "../../services/userAPI"

interface UserInfoItem {
  key: number
  value: string
}

interface ChangeItemProp {
  before: string
  type: string
}

const ShowInfoForm: React.FC = () => {
  const { selectedMenuItem, showInfo } = useManageStore()
  const { userId, username, info } = useUserInfoStore()

  const [form] = Form.useForm()
  const [postSuccess, setPostSuccess] = useState(false)
  const [updateMsg, setUpdateMsg] = useState("")
  const [loading, setLoading] = useState(false)

  // 修改modal
  const [modalOpen, setModalOpen] = useState(false)
  const [changeItem, setChangeItem] = useState<ChangeItemProp>()
  const [after, setAfter] = useState("")

  // 侧边改变时渲染
  useEffect(() => {
    const updateForm = () => {
      form.setFieldsValue({
        userInfoList: showInfo.map((item, index) => ({
          key: index,
          value: item,
        })),
      })
    }

    updateForm()
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

  // 标签全局修改
  const change = async () => {
    console.log(after + changeItem!.before + selectedMenuItem)
    setModalOpen(false)
  }

  return (
    <Form
      form={form}
      name="modify_userInfo"
      onFinish={onFinish}
      style={{ width: 300 }}
      autoComplete="off"
    >
      <Modal
        title="修改"
        centered
        open={modalOpen}
        onOk={change}
        onCancel={() => setModalOpen(false)}
      >
        <p>
          将 {changeItem?.type} 标签 {changeItem?.before} 修改为{" "}
          <Input
            placeholder={selectedMenuItem}
            onChange={(e) => setAfter(e.target.value)}
          />
        </p>
        <p>tip:该操作会修改所有包含该标签的文章!</p>
      </Modal>
      <Form.List name="userInfoList">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name }) => (
              <Space key={key} style={{ display: "flex" }} align="baseline">
                <Form.Item
                  name={[name, "value"]}
                  rules={[{ required: true, message: "不能为空" }]}
                >
                  <Input placeholder={selectedMenuItem} />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
                <Button
                  type="link"
                  onClick={() => {
                    if (key > showInfo.length - 1) {
                      message.warning("新建的条目无法进行修改操作！")
                      return
                    }
                    setModalOpen(true)
                    setChangeItem({
                      before: showInfo[key],
                      type: selectedMenuItem,
                    })
                  }}
                >
                  修改
                </Button>
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
