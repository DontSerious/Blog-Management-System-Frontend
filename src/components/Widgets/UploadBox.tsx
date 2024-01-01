import { UploadProps } from "antd"
import Dragger from "antd/es/upload/Dragger"
import { InboxOutlined } from "@ant-design/icons"
import { CSSProperties, FC } from "react"
import { uploadFile } from "../../services/fileAPI"

interface Props {
  currPath: string
  send: Function
  isLoading: Function
  style?: CSSProperties
}

const UploadBox: FC<Props> = ({ currPath, send, isLoading, style }) => {
  // 自定义上传
  const customUpload = async (file: File, path: string) => {
    const form = new FormData()
    form.append("file", file)
    form.append("path", path)
    const res = await uploadFile(form)
    const data = res.data
    send(data.status_code, data.status_msg)
  }

  const props: UploadProps = {
    name: "file",
    multiple: true,
    showUploadList: false,
    beforeUpload: () => {
      isLoading(true)
    },
    customRequest: (options: any) => {
      customUpload(options.file, currPath)
    },
  }

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">拖拽文件以上传</p>
      <p className="ant-upload-hint">
        先在当前目录选择要上传的地址
        <br />
        请选择文件夹
      </p>
    </Dragger>
  )
}

export default UploadBox
