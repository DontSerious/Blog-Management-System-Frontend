import React, { useEffect, useMemo, useState } from "react"
import { Tree, Spin } from "antd"
import { EditData, useEditStore } from "../../contexts/EditPageStore"
import { getDirTree } from "../../services/editAPI"
import type { DirectoryTreeProps } from "antd/es/tree"

const { DirectoryTree } = Tree

interface DirTreeProps {
  onSelect: DirectoryTreeProps["onSelect"]
}

const DirTree: React.FC<DirTreeProps> = ({ onSelect }) => {
  const { dirTree, setDirTree } = useEditStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDirTree = async () => {
      try {
        setLoading(true)
        const resp = await getDirTree()
        const data: EditData[] = resp.data.data
        setDirTree(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchDirTree()
  }, [setDirTree, setLoading])

  const memoizedDirTree = useMemo(() => dirTree, [dirTree])

  return (
    <Spin spinning={loading}>
      <DirectoryTree showLine onSelect={onSelect} treeData={memoizedDirTree} />
    </Spin>
  )
}

export default DirTree
