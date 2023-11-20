import { FC } from 'react';
import { Layout, theme } from 'antd'
import TreeDirNav from '../components/EditPage/TreeDirNav'
import MyMarkdownEditor from '../components/EditPage/MarkdownEditor'
import TreePath from '../components/Widgets/TreePath';
import NavBar from '../components/Header/NavBar';
import UserBox from '../components/Header/UserBox';
import SearchBox from '../components/Widgets/SearchBox';

const { Header, Content, Sider } = Layout;

const Home: FC = () => {
  // page
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center', padding: 0 }}>
        <NavBar />
        <UserBox />
      </Header>
      <Content style={{ padding: '0 40px' }}>
        <TreePath />
        <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
          <Sider style={{ background: colorBgContainer }} width={200}>
            <SearchBox />
            <TreeDirNav style={{ paddingLeft: '12px' }} />
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
