import { type FC } from "react"
import { Navigate, Outlet } from "react-router-dom"

const App: FC = () => {
  return (
    <div>
      <Navigate to={"/user"} replace />
      <Outlet />
    </div>
  )
}

export default App
