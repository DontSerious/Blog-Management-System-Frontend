import { CSSProperties, FC, useEffect, useState } from "react"
import { Button, Col, Input, Modal, Row, Space, Switch, message } from "antd"
import { EditData, useEditStore } from "../../contexts/EditPageStore"
import {
  createDir,
  createFile,
  delAll,
  getDirTree,
  saveFile,
} from "../../services/editAPI"
import { StatusSuccess } from "../../utils/constants"
import DirTree from "../Widgets/DirTree"
import { DirectoryTreeProps } from "antd/es/tree"

interface TopHandlerProps {
  style?: CSSProperties
}

const TopHandler: FC<TopHandlerProps> = ({ style }) => {
  const { setDirTree } = useEditStore()
  const { currentFile } = useEditStore()

  const [messageApi, contextHolder] = message.useMessage()
  const [open, setOpen] = useState(false)
  const [currPath, setCurrPath] = useState("")
  const [isFile, setIsFile] = useState(true)
  const [loading, setLoading] = useState(true)

  // loading变化时触发更新dirTree
  useEffect(() => {
    const fetchDirTree = async () => {
      try {
        const resp = await getDirTree()
        const data: EditData[] = resp.data.data
        setDirTree(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchDirTree()
  }, [setDirTree, loading])

  // 发送全局提示
  const sendMsg = (statusCode: number, msg: string) => {
    if (statusCode === StatusSuccess)
      messageApi.open({
        type: "success",
        content: msg,
      })
    else
      messageApi.open({
        type: "warning",
        content: msg,
      })
  }

  const save = async () => {
    try {
      const resp = await saveFile(currentFile.path, currentFile.content)
      const data = resp.data
      sendMsg(data.status_code, data.status_msg)
    } catch (error) {
      console.error(error)
    }
  }

  const onSelect: DirectoryTreeProps["onSelect"] = async (keys, info) => {
    const node = info.node
    const path = node.key

    setCurrPath(String(path))
  }

  const onCreate = async () => {
    try {
      setLoading(true)
      let resp: any
      if (isFile) resp = await createFile(currPath)
      else resp = await createDir(currPath)

      const data = resp.data
      sendMsg(data.status_code, data.status_msg)
    } catch (error) {
      console.error(error)
    }
  }

  const onDel = async () => {
    try {
      setLoading(true)
      const resp = await delAll(currPath)
      const data = resp.data
      sendMsg(data.status_code, data.status_msg)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div style={style}>
      <Row justify="space-between" align="middle">
        {contextHolder}
        <Col>当前文件：{currentFile.path}</Col>
        <Col>
          <Space>
            <Button onClick={() => setOpen(true)}>管理</Button>
            <Button onClick={save}>保存</Button>
          </Space>
        </Col>
      </Row>
      <Modal
        title="管理"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        footer={[
          <Switch
            checkedChildren="文件"
            unCheckedChildren="文件夹"
            defaultChecked
            style={{ marginRight: 10 }}
            onChange={() => setIsFile(!isFile)}
            key={0}
          />,
          <Button key={1} onClick={onCreate} loading={loading}>
            新建
          </Button>,
          <Button key={2} onClick={onDel} loading={loading}>
            删除
          </Button>,
        ]}
        // width={1000}
      >
        <DirTree onSelect={onSelect} />
        <Input
          placeholder="路径"
          value={currPath}
          onChange={(e) => setCurrPath(e.target.value)}
        />
      </Modal>
    </div>
  )
}

export default TopHandler
