import type { FC } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './routes/index'

const App: FC = () => {
  // 获得路由表
  const routeView = useRoutes(routes)

  return (
    <>
      {routeView}
    </>
  )
}

export default App
