import React, {Component} from 'react';
import './index.less'
import {Button,message, Col} from 'antd';
import {requestLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
/*
 * 文件名：index.jsx
 * 作者：刘能凯
 * 创建日期：2020-7-15 - 14:22
 * 描述：登录的路由组件
 */

// 定义组件（ES6）
class Login extends Component {

  state = {
    // 用户文本框状态
    userState: false,
    // 密码框状态
    pwdState: false,
    // 给用户输入的文本框和密码框
    userName: 'Pandora',
    passWord: 'Pandora',
    loading: false
  };


  /**
   * 响应登录事件
   */
  loginHandle = async () => {
    let _this = this;
    let {userName,passWord} = _this.state;
    if (null === userName || null === passWord || '' === userName || '' === passWord){
      message.error('请输入用户名和密码');
      return
    }
    let loginParams = {account: userName, password: passWord};
    this.props.history.replace('/backstage')
    // TODO 联调接口时，打开
    // _this.setState({loading: true});
    // const result = await requestLogin(loginParams);
    // let {code, data} = result;
    // _this.setState({loading: false});
    // if (code === 0) {
    //   memoryUtils.user = data;// 保存在内存中
    //   storageUtils.saveUser(data); // 保存到local中
    //   // 跳转到管理界面 (不需要再回退回到登陆),push是需要回退
    //   this.props.history.replace('/backstage')
    // } else if (code === 5) {
    //   message.error('请输入用户名和密码');
    // } else {
    //   message.error('用户名或密码错误');
    // }
  };

  render() {
    return (
      <div className="login-page">
        <header>
          <div className="header-nav">
            <Col>
              <strong>Email:</strong> saya@saya.ac.cn&nbsp;&nbsp; <strong>Support:</strong> 极客印记实验室中心
            </Col>
          </div>
          <div className="header-banner">
            <div className="container">
              <div className="project-user">
                <div className="project-div">
                  <div className="text-left">
                    物联网网关 +
                  </div>
                  <div className="text-right">
                    + 控制中心
                  </div>
                </div>
                <div style={{paddingLeft: '30px',width:'70px'}}>
                  <i className="fa fa-user-plus login-icon"/>
                </div>
              </div>
            </div>
          </div>
        </header>
        <section>
          <div className="alert alert-success alert-dismissable">
            <button type="button" className="close" data-dismiss="alert"
                    aria-hidden="true">
              &times;
            </button>
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <span className="fa fa-bullhorn"/>&nbsp;:&nbsp;由于物联网的特殊性，为了您的设备安全。请您妥善保管好您的密码，请不要在公共场合登录使用!
                </div>
              </div>
            </div>
          </div>
          <div className="container main">
            <div className="row">
              <div className="col-md-12">
                <h4 className="page-head-line">用户身份认证入口</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <h4>请通过账号和密码进行登录</h4>
                <hr/>
                <br/>
                <label>用户名 : </label>
                <input type="text" className="form-control" id="name" maxLength="32" placeholder="请输入账号"/>
                <br/>
                <label>密码 : </label>
                <input type="password" className="form-control" id="password" maxLength="32" placeholder="请输入密码"/>
                <br/>
                <hr/>
                <br/>
                <a href="javascript:void(0)" className="btn btn-info"
                   style={{backgroundColor:'#9cb17e',borderColor: 'transparent'}} id="go">
                  <span className="fa fa-user">&nbsp;进入平台</span>&nbsp;
                </a>
              </div>
              <div className="col-md-6">
                <div className="alert alert-info">
                  <strong>亲爱的用户，欢迎使用本服务平台。在使用之前，请您务必注意以下须知：</strong>
                  <ul>
                    <li>设备启动后，主板上的指示灯先常亮，待设备自检完毕后，指示灯将熄灭</li>
                    <li>设备默认开启STA（作为无线终端接入路由器）+AP（自开启无线热点）</li>
                    <li>设备默认开启的WIFI名称为：极客印记**，密码参见设备底部标签</li>
                    <li>在没有连接上路由器的前提下，您只能通过连接本设备的WIFI进行设置</li>
                    <li>平台的管理入口地址为：192.168.4.1（需要连接本设备WIFI）</li>
                    <li>若账号在正常情况下，无法登录时，请及时联系实验室中心</li>
                  </ul>
                </div>
                <div className="alert alert-success">
                  <strong>功能介绍:</strong>
                  <ul>
                    <li>支持STA（作为无线终端接入路由器）/AP（自开启无线热点）模式参数自定义配置</li>
                    <li>支持本地局域网&基于MQTT的远程控制</li>
                    <li>支持MQTT服务器自定义配置</li>
                    <li>支持传感器数据的上报采集</li>
                    <li>支持设备的远程控制</li>
                    <li>支持指标&事件联动</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div style={{height: '100px'}}/>
        <footer>
          <div className="container">
            <p>Copyright © 2016-
              <script>document.write(new Date().getFullYear())</script>
              Saya.ac.cn-极客印记 All rights reserved 国家工信部域名备案信息：[<a href="https://beian.miit.gov.cn/"
                                                                  rel="noopener noreferrer" style={{color: '#fff'}}
                                                                  target="_blank">saya.ac.cn/蜀ICP备2021013893号</a>]
            </p>
            <p>通讯地址：四川省宜宾市五粮液大道东段酒圣路8号(宜宾学院本部) 邮编：644000 Email：saya@saya.ac.cn</p>
            <p>建议您使用Google Chrome，分辨率1920*1080及以上浏览，获得更好用户体验</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default Login;
