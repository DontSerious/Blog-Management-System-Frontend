import { create } from "zustand"
import { UserInfo } from "./UserInfoStore"

interface ManageItem {
  selectedMenuItem: string
  showInfo: string[]

  setSelectedMenuItem: (selected: string, info: UserInfo) => void
}

const setInfo = (select: string, info: UserInfo) => {
  return select === "Categories" ? info.categories : info.tags
}

export const useManageStore = create<ManageItem>()((set) => ({
  selectedMenuItem: "Categories",
  showInfo: [],
  setSelectedMenuItem: (selected: string, info: UserInfo) =>
    set(() => ({
      selectedMenuItem: selected,
      showInfo: setInfo(selected, info),
    })),
}))
