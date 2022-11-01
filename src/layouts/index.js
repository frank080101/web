import { Layout } from 'antd';

import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import SiderNav from './components/SiderNav';
import { useState } from 'react';

import './index.less';
import { useHistory } from 'umi';

const { Header, Content, Sider } = Layout;

export default function (props) {
  const history = useHistory();

  if (history.location?.pathname === '/') {
    history.replace('/demo1');
  }

  const [collapsed, setcollapsed] = useState(false);

  const toggleCollapsed = () => {
    setcollapsed(!collapsed);
  };
  return (
    <Layout className="layout">
      <Sider collapsible trigger={null} collapsed={collapsed}>
        <div className="sider-seat"></div>
        <SiderNav />
        <div onClick={() => toggleCollapsed()}>
          {collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        </div>
      </Sider>
      <Layout>
        <Header>
          <div className="title">指标可视化平台</div>
        </Header>
        <Content>
          {/* <div className='content-inner'> */}
          {props.children}
          {/* </div> */}
        </Content>
      </Layout>
    </Layout>
  );
}
