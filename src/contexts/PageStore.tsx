import { create } from "zustand"

interface pageItem {
  mainNavBarSelect: string
  module: string[]

  setMainNavBarSelect: (select: string) => void
}

export const usePageStore = create<pageItem>()((set) => ({
  mainNavBarSelect: "Manage",
  module: ["Manage", "Edit"],
  setMainNavBarSelect: (select: string) =>
    set(() => ({
      mainNavBarSelect: select,
    })),
}))
