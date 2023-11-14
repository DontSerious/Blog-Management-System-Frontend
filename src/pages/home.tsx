import React, { FC, useState } from 'react';
import { Col, Flex, Layout, Row, theme } from 'antd'
import TreeDirNav from '../components/TreeDirNav'
import MyMarkdownEditor from '../components/MarkdownEditor'
import TreePath from '../components/TreePath';
import NavBar from '../components/NavBar';
import UserBox from '../components/UserBox';
import SearchBox from '../components/SearchBox';

const { Header, Content, Sider } = Layout;

const Home: FC = () => {
  // page
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center', padding: 0 }}>
        <SearchBox />
        <NavBar />
        <UserBox />
      </Header>
      <Content style={{ padding: '0 40px' }}>
        <TreePath />
        <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
          <Sider style={{ paddingLeft: '24px', background: colorBgContainer }} width={200}>
            <TreeDirNav />
          </Sider>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <MyMarkdownEditor />
          </Content>
        </Layout>
      </Content>
    </Layout>
  )
}

export default Home;
