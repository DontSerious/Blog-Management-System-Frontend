import { ConfigProvider } from "antd"
import { FC, useEffect } from "react"
import FileContent from "./FileContent"
import { usePageStore } from "../../contexts/PageStore"

const File: FC = () => {
  const { setModuleName } = usePageStore()

  useEffect(() => {
    setModuleName("文件管理页")
  }, [setModuleName])

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
