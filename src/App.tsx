import type { FC } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './routes/index'
import { AuthProvider } from './contexts/AuthContext'
import { UserInfoProvider } from './contexts/UserInfoContext'
import { px2remTransformer, StyleProvider } from '@ant-design/cssinjs';

const App: FC = () => {
  // 获得路由表
  const routeView = useRoutes(routes)

  return (
    <AuthProvider>
      <UserInfoProvider>
        {routeView}
      </UserInfoProvider>
    </AuthProvider>
  )
}

export default App
