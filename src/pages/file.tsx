import { ConfigProvider, Layout } from "antd"
import { FC } from "react"
import HeaderWig from "../components/Widgets/HeaderWig"
import FileContent from "../components/FilePage/FileContent"

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
      <Layout>
        <HeaderWig />
        <FileContent />
      </Layout>
    </ConfigProvider>
  )
}
export default File
