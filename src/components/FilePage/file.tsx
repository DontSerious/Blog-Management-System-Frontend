import { ConfigProvider } from "antd"
import { FC } from "react"
import FileContent from "./FileContent"

const File: FC = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Tree: {
            titleHeight: 48,
          },
        },
      }}
    >
      <FileContent />
    </ConfigProvider>
  )
}
export default File
