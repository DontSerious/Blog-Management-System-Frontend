import { FC, useEffect, useState } from "react"
import {
  Button,
  Flex,
  Input,
  Popconfirm,
  Switch,
  Typography,
  message,
} from "antd"
import { Content } from "antd/es/layout/layout"
import { DirectoryTreeProps } from "antd/es/tree"
import { EditData, useEditStore } from "../../contexts/EditPageStore"
import {
  createDir,
  createFile,
  delAll,
  getDirTree,
} from "../../services/editAPI"
import { StatusSuccess } from "../../utils/constants"
import DirTree from "../Widgets/DirTree"
import UploadBox from "../Widgets/UploadBox"
import { downloadFile } from "../../services/fileAPI"

const FileContent: FC = () => {
  const { Text } = Typography

  const { setDirTree } = useEditStore()

  const [messageApi, contextHolder] = message.useMessage()
  const [currPath, setCurrPath] = useState("/")
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
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      }
    }

    fetchDirTree()
  }, [setDirTree, loading])

  const isLoading = (is: boolean) => {
    setLoading(is)
  }

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

  const onSelect: DirectoryTreeProps["onSelect"] = async (keys, info) => {
    const node = info.node
    const path = node.key

    setCurrPath(String(path))
  }

  const checkCurrPath = () => {
    if (currPath.length === 0) {
      sendMsg(1, "当前路径为空")
      throw new Error()
    }
    return isFile
  }

  const onCreate = async () => {
    try {
      checkCurrPath()
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
      checkCurrPath()
      setLoading(true)
      const resp = await delAll(currPath)
      const data = resp.data
      sendMsg(data.status_code, data.status_msg)
    } catch (error) {
      console.error(error)
    }
  }

  const onDownload = async () => {
    const resp = await downloadFile(currPath)
    const data = resp.data
    sendMsg(data.status_code, data.status_msg)
  }

  return (
    <Content
      style={{
        margin: "20px 40px",
        backgroundColor: "white",
      }}
    >
      {contextHolder}
      {/* FileTop */}
      <div
        style={{
          margin: "30px 0 0 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: "20px", display: "block" }}>文件管理</Text>
        <Flex vertical={false} align="center">
          <Text>当前路径：</Text>
          <Input
            placeholder="路径"
            value={currPath}
            onChange={(e) => setCurrPath(e.target.value)}
            style={{ display: "block", width: 300 }}
          />
        </Flex>

        <div
          style={{
            margin: "0 30px 0 30px",
          }}
        >
          <Switch
            checkedChildren="文件"
            unCheckedChildren="文件夹"
            defaultChecked
            style={{ marginRight: 10 }}
            onChange={() => setIsFile(!isFile)}
            key={0}
          />
          <Popconfirm
            title="下载"
            description={"是否下载\t" + currPath + "\t?"}
            onConfirm={onDownload}
            okText="Yes"
            cancelText="No"
            placement="leftBottom"
          >
            <Button loading={loading} style={{ marginRight: 10 }}>
              下载
            </Button>
          </Popconfirm>
          <Popconfirm
            title="新建"
            description={
              "是否新建" +
              (isFile ? "文件" : "文件夹") +
              "\t" +
              currPath +
              "\t?"
            }
            onConfirm={onCreate}
            okText="Yes"
            cancelText="No"
            placement="bottom"
          >
            <Button loading={loading} style={{ marginRight: 10 }}>
              新建
            </Button>
          </Popconfirm>
          <Popconfirm
            title="删除"
            description={"是否删除\t" + currPath + "\t?"}
            onConfirm={onDel}
            okText="Yes"
            cancelText="No"
            placement="leftBottom"
          >
            <Button danger loading={loading}>
              删除
            </Button>
          </Popconfirm>
        </div>
      </div>
      <Flex vertical={false} style={{ padding: 20 }}>
        <div style={{ width: "60%" }}>
          <DirTree onSelect={onSelect} />
        </div>
        <div style={{ width: "40%", padding: 20 }}>
          <UploadBox currPath={currPath} send={sendMsg} isLoading={isLoading} />
        </div>
      </Flex>
    </Content>
  )
}

export default FileContent
