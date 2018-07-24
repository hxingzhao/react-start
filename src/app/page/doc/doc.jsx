import React from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link } from 'react-router-dom'
import './doc.scss';
import Game from './components/game/game'
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

export default class Doc extends React.Component {
  constructor() {
    super();
  }
  state = {
    collapsed: false
  };
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  /**
   * 选择导航栏事件
   * @param {menu} item 
   */
  selectMenu(item) {
    console.log(item);
  }
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <Link to='/home' className="logo">Home</Link>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={(menu) => this.selectMenu(menu)}>
            <Menu.Item key="game">
              <Icon type="pie-chart" />
              <span>Game</span>
            </Menu.Item>
            <Menu.Item key="video">
              <Icon type="desktop" />
              <span>video</span>
            </Menu.Item>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>file</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>Chart</span>
                </span>
              }
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="team" />
                  <span>Canvas</span>
                </span>
              }
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb> */}
            <div className='content'>
              <h2>三子棋</h2>
              <Game/>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            、
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
