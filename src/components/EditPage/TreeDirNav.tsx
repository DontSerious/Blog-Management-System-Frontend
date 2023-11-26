import React, { CSSProperties, useEffect } from "react"
import { Tree } from "antd"
import type { DirectoryTreeProps } from "antd/es/tree"
import { EditData, useEditStore } from "../../contexts/EditPageStore"
import { getDirTree, getFileContent } from "../../services/editAPI"

const { DirectoryTree } = Tree

interface TreeDirNavProps {
  style?: CSSProperties
}

const TreeDirNav: React.FC<TreeDirNavProps> = ({ style }) => {
  const { dirTree, setDirTree, setCurrFile } = useEditStore()

  useEffect(() => {
    const init = async () => {
      try {
        const resp = await getDirTree()
        const data: EditData[] = resp.data.data
        setDirTree(data)
      } catch (error) {
        console.error("Initialization failed:", error)
      }
    }

    init()
  }, [setDirTree]) // The empty dependency array ensures this effect runs only once after the initial render

  const onSelect: DirectoryTreeProps["onSelect"] = async (keys, info) => {
    const path = String(info.node.key)

    try {
      const resp = await getFileContent(path)
      const content = resp.data.data

      if (info.node.isLeaf) {
        setCurrFile({
          path: path,
          content: content,
        })
      }
    } catch (error) {
      console.error("Registration failed:", error)
    }
  }

  return (
    <DirectoryTree
      style={{ ...style }}
      multiple
      onSelect={onSelect}
      treeData={dirTree}
    />
  )
}

export default TreeDirNav
