import React from "react"
import ReactDOM from "react-dom/client"

// 路由
import { RouterProvider } from "react-router-dom"

// 汉化
import { ConfigProvider } from "antd"
import zhCN from "antd/locale/zh_CN"
import { AppRoutes } from "./routes"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <RouterProvider router={AppRoutes} />
    </ConfigProvider>
  </React.StrictMode>
)
