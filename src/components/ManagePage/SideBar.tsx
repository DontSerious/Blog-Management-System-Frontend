import React, { useEffect } from "react"
import { MailOutlined, CalendarOutlined } from "@ant-design/icons"
import { Menu } from "antd"
import type { MenuProps } from "antd/es/menu"
import { useManageStore } from "../../contexts/ManagePageStore"
import { useUserInfoStore } from "../../contexts/UserInfoStore"

type MenuItem = Required<MenuProps>["items"][number]

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode
): MenuItem {
  return {
    key,
    icon,
    label,
  } as MenuItem
}

const items: MenuItem[] = [
  getItem("Categories", "Categories", <MailOutlined />),
  getItem("Tags", "Tags", <CalendarOutlined />),
]

const SideBar: React.FC = () => {
  const { setSelectedMenuItem } = useManageStore()
  const { info } = useUserInfoStore()

  useEffect(() => {
    setSelectedMenuItem("Categories", info)
  }, [])

  const handleMenuClick = (menuItem: any) => {
    setSelectedMenuItem(menuItem.key, info)
  }

  return (
    <Menu
      defaultSelectedKeys={["Categories"]}
      mode="vertical"
      theme="light"
      items={items}
      onClick={handleMenuClick}
    />
  )
}

export default SideBar
