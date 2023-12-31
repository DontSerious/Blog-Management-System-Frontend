import axios from "axios"
import { BE_SERVER } from "../utils/constants"

export const BaseApi = axios.create({
  baseURL: BE_SERVER,
})
