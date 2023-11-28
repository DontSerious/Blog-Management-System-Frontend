import React, { CSSProperties } from "react"
import { ConfigProvider, Tabs } from "antd"
import DirTree from "./DirTree"
import { useManageStore } from "../../contexts/ManagePageStore"
import InfoCheckBox from "./InfoCheckBox"
import { useUserInfoStore } from "../../contexts/UserInfoStore"
import type { DirectoryTreeProps } from "antd/es/tree"
import { getFileContent } from "../../services/editAPI"
import { useEditStore } from "../../contexts/EditPageStore"

require("../../style/edit.css")

interface SideNavProps {
  style?: CSSProperties
}

const SideNav: React.FC<SideNavProps> = ({ style }) => {
  const { showInfo, setSelectedMenuItem } = useManageStore()
  const { setCurrFile } = useEditStore()
  const { info } = useUserInfoStore()

  const onChange = (key: string) => {
    if (key !== "dirTree") setSelectedMenuItem(key, info)
  }

  const onSelect: DirectoryTreeProps["onSelect"] = async (keys, info) => {
    const path = String(info.node.key)

    // 选择文件夹时返回
    if (!info.node.isLeaf) return

    try {
      const resp = await getFileContent(path)
      const content = resp.data.data
      setCurrFile({
        path: path,
        content: content,
      })
    } catch (error) {
      console.error("Registration failed:", error)
    }
  }

  const tabList = [
    {
      key: "dirTree",
      label: "dirTree",
      children: <DirTree onSelect={onSelect} />,
    },
    {
      key: "Categories",
      label: "Categories",
      children: <InfoCheckBox label="Categories" options={showInfo} />,
    },
    {
      key: "Tags",
      label: "Tags",
      children: <InfoCheckBox label="Tags" options={showInfo} />,
    },
  ]

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            verticalItemPadding: "8px 12px",
          },
        },
      }}
    >
      <Tabs
        style={{ paddingTop: "12px" }}
        onChange={onChange}
        tabPosition={"left"}
        items={tabList}
      />
    </ConfigProvider>
  )
}

export default SideNav
