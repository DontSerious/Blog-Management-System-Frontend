import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Info {
  userId: string
  username: string
  info: UserInfo
  isAuth: boolean
}

export type UserInfo = {
  categories: string[]
  tags: string[]
}

export const useUserInfoStore = create<Info>()(
  persist(
    (set) => ({
      userId: "",
      username: "",
      info: {
        categories: [],
        tags: [],
      },
      isAuth: false,
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
  info: Info["info"]
) =>
  useUserInfoStore.setState({
    userId: userId,
    username: username,
    info: info,
    isAuth: true,
  })

export const resetUserInfo = () =>
  useUserInfoStore.setState({
    userId: "",
    username: "",
    info: {
      categories: [],
      tags: [],
    },
    isAuth: false,
  })
