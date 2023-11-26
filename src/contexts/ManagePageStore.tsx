import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ManageItem {
  selectedMenuItem: string
  showInfo: string[]
}

export const useManageStore = create<ManageItem>()(
  persist(
    (set) => ({
      selectedMenuItem: "Categories",
      showInfo: [],
    }),
    {
      name: "managePage",
    }
  )
)

export const setSelectedMenuItem = (selected: string) =>
  useManageStore.setState({
    selectedMenuItem: selected,
  })

export const setShowInfo = (info: string[]) =>
  useManageStore.setState({
    showInfo: info,
  })
