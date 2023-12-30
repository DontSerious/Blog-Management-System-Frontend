import axios from "axios"
import { BE_SERVER } from "../utils/constants"

const api = axios.create({
  baseURL: BE_SERVER,
})

export const uploadFile = (data: FormData) => {
  return api.post("/uploadFile", data)
}
