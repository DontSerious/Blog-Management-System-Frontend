import { create } from "zustand"
import { persist } from "zustand/middleware"

interface UserInfo {
  userId: string
  username: string
  info: {
    categories: string[]
    tags: string[]
  }
}

export const useUserInfoStore = create<UserInfo>()(
  persist(
    (set) => ({
      userId: "",
      username: "",
      info: {
        categories: [],
        tags: [],
      },
      set,
    }),
    {
      name: "userInfo",
    }
  )
)

export const setUserInfo = (
  userId: string,
  username: string,
  info: UserInfo["info"]
) =>
  useUserInfoStore.setState({
    userId: userId,
    username: username,
    info: info,
  })

export const resetUserInfo = () =>
  useUserInfoStore.setState({
    userId: "",
    username: "",
    info: {
      categories: [],
      tags: [],
    },
  })
