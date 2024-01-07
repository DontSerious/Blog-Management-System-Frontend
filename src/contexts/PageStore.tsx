import { create } from "zustand"

interface pageItem {
  mainNavBarSelect: string
  module: string[]
  moduleName: string

  setMainNavBarSelect: (select: string) => void
  setModuleName: (select: string) => void
}

export const usePageStore = create<pageItem>()((set) => ({
  mainNavBarSelect: "",
  module: ["Manage", "Edit", "File"],
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
