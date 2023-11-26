import { CSSProperties, FC, useState } from "react"
import { Button, Col, Row, Tooltip } from "antd"
import { useEditStore } from "../../contexts/EditPageStore"
import { saveFile } from "../../services/editAPI"

interface TopHandlerProps {
  style?: CSSProperties
}

const TopHandler: FC<TopHandlerProps> = ({ style }) => {
  const { currentFile } = useEditStore()
  const [msg, setMsg] = useState("")

  const save = async () => {
    try {
      const resp = await saveFile(currentFile.path, currentFile.content)
      const data = resp.data.status_msg
      setMsg(data)
    } catch (error) {
      console.error("Initialization failed:", error)
    }
  }

  return (
    <Row justify="space-between" align="middle" style={style}>
      <Col>当前文件：{currentFile.path}</Col>
      <Tooltip title={msg} trigger="click" placement="left" mouseLeaveDelay={2}>
        <Button onClick={save}>保存</Button>
      </Tooltip>
    </Row>
  )
}

export default TopHandler
