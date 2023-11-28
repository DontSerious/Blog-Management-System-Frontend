import axios from "axios"
import { BE_SERVER } from "../utils/constants"

const api = axios.create({
  baseURL: BE_SERVER,
})

export const getDirTree = () => {
  return api.get("/dirTree")
}

export const getFileContent = (filePath: string) => {
  return api.get("/fileContent", {
    params: {
      path: filePath,
    },
  })
}

export const createDir = (path: string) => {
  return api.post("/createDir", { path: path })
}

export const createFile = (path: string) => {
  return api.post("/createFile", { path: path })
}

export const saveFile = (path: string, content: string) => {
  return api.post("/saveFile", {
    path: path,
    content: content,
  })
}

export const delAll = (path: string) => {
  return api.delete("/delAll", {
    params: {
      path: path,
    },
  })
}
