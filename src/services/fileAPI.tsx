import { BaseApi } from "./baseAPI"

const api = BaseApi

export const uploadFile = (data: FormData) => {
  return api.post("/uploadFile", data)
}
