import { create } from "zustand"

interface pageItem {
  mainNavBarSelect: string
  module: Map<string, string>
  moduleName: string

  setMainNavBarSelect: (select: string) => void
  setModuleName: (select: string) => void
}

export const usePageStore = create<pageItem>()((set) => ({
  mainNavBarSelect: "",
  // module: ["Manage", "Edit", "File"],
  module: new Map([
    ["Manage", "个人管理"],
    ["Edit", "博客编辑"],
    ["File", "文件管理"],
  ]),
  moduleName: "",
  setMainNavBarSelect: (select: string) =>
    set(() => ({
      mainNavBarSelect: select,
    })),
  setModuleName: (name: string) =>
    set(() => ({
      moduleName: name,
    })),
}))
