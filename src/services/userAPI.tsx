import axios from "axios"
import { BE_SERVER } from "../utils/constants"

const api = axios.create({
  baseURL: BE_SERVER,
})

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
