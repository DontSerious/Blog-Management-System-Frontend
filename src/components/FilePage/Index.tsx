import { ConfigProvider } from "antd"
import { FC, useEffect } from "react"
import { usePageStore } from "../../contexts/PageStore"
import FileContent from "./FileContentBox"

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
