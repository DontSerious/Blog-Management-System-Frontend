import { FC } from "react"
import type { MenuProps } from "antd"
import { Menu } from "antd"
import { usePageStore } from "../../contexts/PageStore"
import { useNavigate } from "react-router-dom"

const NavBar: FC = () => {
  const navigate = useNavigate()
  const { mainNavBarSelect, module, setMainNavBarSelect } = usePageStore()

  const items: MenuProps["items"] = Array.from(module.entries()).map((key) => ({
    key: key[0],
    label: `${key[1]}`,
    onClick: (item) => {
      setMainNavBarSelect(item.key)
      const path = item.key.toLowerCase()
      navigate("/" + path)
    },
  }))

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      selectedKeys={[mainNavBarSelect]}
      items={items}
      style={{ display: "flex" }}
    />
  )
}

export default NavBar
