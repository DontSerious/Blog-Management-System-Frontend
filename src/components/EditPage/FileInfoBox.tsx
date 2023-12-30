import { Button, Form, Input, Select, SelectProps, Space, Switch } from "antd"
import { FC, useState } from "react"
import { useUserInfoStore } from "../../contexts/UserInfoStore"
import { useEditStore } from "../../contexts/EditPageStore"
import { useForm } from "antd/es/form/Form"

type FieldType = {
  title?: string
  categories?: string[]
  tags?: string[]
  toc?: boolean
  date?: string
  updated?: string
}

const FileInfoBox: FC = () => {
  const [form] = useForm() // 创建表单实例
  const { info } = useUserInfoStore()
  const { currentFile, setCurrFile } = useEditStore()
  const [createTime, setCreateTime] = useState<string>("")
  const [currTime, setCurrTime] = useState<string>("")

  // 填充info到Select
  const cateOptions: SelectProps["options"] = []
  const tagOptions: SelectProps["options"] = []
  info.categories.forEach((value) => {
    cateOptions.push({
      value: value,
      label: value,
    })
  })
  info.tags.forEach((value) => {
    tagOptions.push({
      value: value,
      label: value,
    })
  })

  const buildTagList = (info: Array<string>) => {
    let str = ""
    for (let index = 0; index < info.length; index++) {
      const value = info[index]
      str += "\n- " + value
    }
    return str
  }

  const buildFileHead = (info: any) => {
    let isToc = false
    if (info.toc) isToc = true
    const str =
      "---\ntitle: " +
      info.title +
      "  \ncategories: " +
      buildTagList(info.categories) +
      "  \ntags: " +
      buildTagList(info.tags) +
      "  \ndate: " +
      info.date +
      "  \nupdated: " +
      info.updated +
      "  \ntoc: " +
      isToc +
      "\n---"
    // 正则表达式匹配 Front Matter
    const frontMatterRegex = /^---\n([\s\S]*?)\n---/
    const match = currentFile.content.match(frontMatterRegex)

    if (match) {
      // 如果匹配成功，则替换
      const newContent = currentFile.content.replace(frontMatterRegex, str)
      setCurrFile({
        path: currentFile.path,
        content: newContent,
      })
    } else {
      // 如果匹配不成功，则在字符串前面插入
      const newContent = str + "\n\n" + currentFile.content
      setCurrFile({
        path: currentFile.path,
        content: newContent,
      })
    }
  }

  const getCurrentTimestamp = (): string => {
    const currentDate = new Date()

    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1).padStart(2, "0")
    const day = String(currentDate.getDate()).padStart(2, "0")
    const hours = String(currentDate.getHours()).padStart(2, "0")
    const minutes = String(currentDate.getMinutes()).padStart(2, "0")
    const seconds = String(currentDate.getSeconds()).padStart(2, "0")

    const timestampString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    return timestampString
  }

  const handleCreate = () => {
    const timestamp = getCurrentTimestamp()
    setCreateTime(timestamp)
    form.setFieldsValue({ date: timestamp }) // 更新表单字段的值
  }

  const handleUpdated = () => {
    const timestamp = getCurrentTimestamp()
    setCurrTime(timestamp)
    form.setFieldsValue({ updated: timestamp }) // 更新表单字段的值
  }

  return (
    <Form
      form={form}
      name="fileInfo"
      style={{ width: "100%", padding: "0 10px" }}
      onFinish={buildFileHead}
    >
      <Form.Item<FieldType>
        label="标题"
        name="title"
        rules={[{ required: true, message: "标题不能为空" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="分类"
        name="categories"
        rules={[{ required: true, message: "请至少选定一个Categories" }]}
      >
        <Select
          mode="tags"
          allowClear
          style={{ width: "100%" }}
          placeholder="categories"
          options={cateOptions}
        />
      </Form.Item>
      <Form.Item<FieldType>
        label="标签"
        name="tags"
        rules={[{ required: true, message: "请至少选定一个Tags" }]}
      >
        <Select
          mode="tags"
          allowClear
          style={{ width: "100%" }}
          placeholder="tags"
          options={tagOptions}
        />
      </Form.Item>
      <Form.Item<FieldType> label="目录" name="toc" valuePropName="checked">
        <Switch checkedChildren="开启" unCheckedChildren="关闭" />
      </Form.Item>
      <Form.Item<FieldType>
        label="创建时间"
        name="date"
        rules={[{ required: true, message: "请勿为空" }]}
      >
        <Space.Compact block>
          <Input value={createTime} />
          <Button type="primary" onClick={handleCreate}>
            生成
          </Button>
        </Space.Compact>
      </Form.Item>
      <Form.Item<FieldType>
        label="更新时间"
        name="updated"
        rules={[{ required: true, message: "请勿为空" }]}
      >
        <Space.Compact block>
          <Input value={currTime} />
          <Button type="primary" onClick={handleUpdated}>
            生成
          </Button>
        </Space.Compact>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          生成
        </Button>
      </Form.Item>
    </Form>
  )
}

export default FileInfoBox
