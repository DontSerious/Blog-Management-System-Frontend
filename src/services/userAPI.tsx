import { BaseApi } from "./baseAPI"

const api = BaseApi

export const login = (formData: any) => {
  return api.post("/login", formData)
}

export const register = (formData: any) => {
  return api.post("/register", formData)
}

export const queryInfo = (user_id: any) => {
  return api.get("/queryInfo", {
    params: {
      _id: user_id,
    },
  })
}

export const updateInfo = (
  user_id: string,
  categories: string[],
  tags: string[]
) => {
  return api.post("/updateInfo", {
    _id: user_id,
    Categories: categories,
    Tags: tags,
  })
}

export const changePWD = (formData: FormData) => {
  return api.post("/changePWD", formData)
}

export const getAllUser = () => {
  return api.get("/getAllUser")
}

export const delUser = (user_id: any) => {
  return api.get("/delUser", {
    params: {
      _id: user_id,
    },
  })
}
