import { FC } from "react"
import type { MenuProps } from "antd"
import { Menu } from "antd"
import { usePageStore } from "../../contexts/PageStore"
import { useNavigate } from "react-router-dom"

const NavBar: FC = () => {
  const navigate = useNavigate()
  const { mainNavBarSelect, module, setMainNavBarSelect } = usePageStore()

  const items: MenuProps["items"] = module.map((key) => ({
    key: key,
    label: `${key}`,
    onClick: (item) => {
      setMainNavBarSelect(item.key)
      const path = item.key.toLowerCase()
      navigate("/" + path)
    },
  }))

  return (
    <>
      <Menu
        style={{ paddingLeft: 10 }}
        theme="dark"
        mode="horizontal"
        selectedKeys={[mainNavBarSelect]}
        items={items}
      />
    </>
  )
}

export default NavBar
