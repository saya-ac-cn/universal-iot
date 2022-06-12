import React, {Component} from 'react';
import './index.less'
import {Redirect, Route, Switch} from 'react-router-dom'
import {Col,Menu} from 'antd';
import {UserAddOutlined} from '@ant-design/icons';
import DashBoard from "../backend/dashboard";
import Login from "../login";
import Password from "../backend/password";
import Mqtt from "../backend/mqtt";
import Sta from "../backend/sta";
import Ap from "../backend/ap";
import storageUtils from "../../utils/storageUtils";
import {isEmptyObject} from '../../utils/var'
/*
 * 文件名：index.jsx
 * 作者：刘能凯
 * 创建日期：2020-7-15 - 14:22
 * 描述：登录的路由组件
 */

// 定义组件（ES6）
class Layout extends Component {

  state = {
    selectMenu:"/home.html",
    menuList:[
      {title:'设备信息',url:'/home.html'},
      {title:'热点设置',url:'/ap.html'},
      {title:'上网设置',url:'/sta.html'},
      {title:'消息队列',url:'/mqtt.html'},
      {title:'修改密码',url:'/pwd.html'},
    ],
    menuElement:[]
  };

  refreshMenu = (selectMenu) => {
    const {menuList} = this.state;
    const menuElement = [];
    for(let i = 0;i < menuList.length;i++){
      const item = menuList[i];
      menuElement.push(<li key={i}><a onClick={()=>this.switchMenuHandle(item.url)} className={item.url===selectMenu?"menu-top-active":null}>{item.title}</a></li>);
    }
    this.setState({selectMenu,menuElement})
  }

  switchMenuHandle = (url)=>{
    const _this = this;
    let selectMenu = _this.state.selectMenu
    if (selectMenu===url){
      return;
    }
    // 刷新一次菜单
    _this.refreshMenu(url)
    this.props.history.replace(url)
  }

  componentDidMount() {
    if (isEmptyObject(storageUtils.getUser())) {
      // 当前用户未登录
      this.props.history.push('/login.html')
    }
    let path = this.props.location.pathname;
    this.refreshMenu(path);
  };


  render() {
    const {menuElement} = this.state;
    // 得到当前请求的路由路径
    let path = this.props.location.pathname;
    return (
      <div className="layout-page">
        <header>
          <div className="header-nav">
            <Col span={18} offset={3}>
              <strong>Email:</strong> saya@saya.ac.cn&nbsp;&nbsp; <strong>Support:</strong> 极客印记实验室中心
            </Col>
          </div>
          <div className="header-banner">
            <Col span={18} offset={3}>
              <div className="project-user">
                <div className="project-div">
                  <div className="text-left">
                    物联网网关 +
                  </div>
                  <div className="text-right">
                    + 控制中心
                  </div>
                </div>
                <div className="user-div">
                  <UserAddOutlined className="login-icon"/>
                </div>
              </div>
            </Col>
          </div>
          {('/login' === path || '/' === path)?null:
            <div className="menu-nav">
              <Col span={18} offset={3} className="menu-nav-content">
                <ul id="menu-top" className="nav-bar-nav">
                  {menuElement}
                </ul>
              </Col>
            </div>
          }

        </header>
        <section>

          <Switch>
            <Route path='/home.html' component={DashBoard}/>
            <Route path='/ap.html' component={Ap}/>
            <Route path='/sta.html' component={Sta}/>
            <Route path='/mqtt.html' component={Mqtt}/>
            <Route path='/pwd.html' component={Password}/>
            <Route path={['/login.html','/']} exact={true} component={Login}/>
            {/*默认、及匹配不到时的页面*/}
            <Redirect to='/home.html'/>
          </Switch>
        </section>

        <footer>
          <Col span={18} offset={3}>
            <p>Copyright © 2016-
              <script>document.write(new Date().getFullYear())</script>
              Saya.ac.cn-极客印记 All rights reserved 国家工信部域名备案信息：[<a href="https://beian.miit.gov.cn/"
                                                                  rel="noopener noreferrer" style={{color: '#fff'}}
                                                                  target="_blank">saya.ac.cn/蜀ICP备2021013893号</a>]
            </p>
            <p>通讯地址：四川省宜宾市五粮液大道东段酒圣路8号(宜宾学院本部) 邮编：644000 Email：saya@saya.ac.cn</p>
            <p>建议您使用Google Chrome，分辨率1920*1080及以上浏览，获得更好用户体验</p>
          </Col>
        </footer>
      </div>
    );
  }
}

export default Layout;
