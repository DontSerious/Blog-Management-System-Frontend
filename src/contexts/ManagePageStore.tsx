import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ManageItem {
  selectedMenuItem: string
  showInfo: string[]
}

export const useManagePage = create<ManageItem>()(
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
  useManagePage.setState({
    selectedMenuItem: selected,
  })

export const setShowInfo = (info: string[]) =>
  useManagePage.setState({
    showInfo: info,
  })
