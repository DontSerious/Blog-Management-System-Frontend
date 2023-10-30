import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 路由
import { BrowserRouter } from 'react-router-dom';

// 汉化
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider locale={ zhCN }>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);
