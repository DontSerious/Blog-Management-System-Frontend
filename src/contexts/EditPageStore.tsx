import { DataNode } from "antd/es/tree"
import { create } from "zustand"

interface EditPageItem {
  sourceData: EditData[]
  dirTree: DataNode[]
  searchBoxData: searchBoxData[]
  setDirTree: (dir: EditData[]) => void

  // mdEditor
  currentFile: EditFile
  setCurrFile: (file: EditFile) => void

  // FileInfoBox
  currentArr: FileInfoItem
  setCurrArr: (obj: FileInfoItem) => void
}

export type FileInfoItem = {
  Categories: string[]
  Tags: string[]
}

export type EditData = {
  title: string
  key: string
  isLeaf: boolean
  children: EditData[]
}

export type EditFile = {
  path: string
  content: string
}

type searchBoxData = {
  value: string
  label: string
}

const transEdit = (data: EditData[]) => {
  let newDirTree: DataNode[] = []
  for (let i = 0; i < data.length; i++) newDirTree[i] = data[i]
  return newDirTree
}

const transSearch = (data: EditData[]) => {
  let newData: searchBoxData[] = []
  data.forEach((node) => {
    if (node.isLeaf) {
      newData.push({
        value: node.key,
        label: node.title,
      })
    } else if (node.children && node.children.length > 0) {
      const childNodes = transSearch(node.children)
      newData.push(...childNodes)
    }
  })
  return newData
}

export const useEditStore = create<EditPageItem>()((set) => ({
  sourceData: [],
  dirTree: [],
  searchBoxData: [],
  setDirTree: (dir: EditData[]) =>
    set(() => ({
      sourceData: dir,
      dirTree: transEdit(dir),
      searchBoxData: transSearch(dir),
    })),
  currentFile: {
    path: "请选择文件",
    content: "请选择文件",
  },
  setCurrFile: (file: EditFile) =>
    set(() => ({
      currentFile: file,
    })),

  currentArr: {
    Categories: [],
    Tags: [],
  },
  setCurrArr: (obj: FileInfoItem) =>
    set(() => ({
      currentArr: obj,
    })),
}))
