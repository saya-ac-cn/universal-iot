import React, {Component} from 'react';
import {Alert,message, Row,Col, Form, Input, Button,Spin} from 'antd';
import {NotificationOutlined,UserOutlined} from '@ant-design/icons';
import {clearTrimValueEvent} from "../../utils/string";
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

  formRef = React.createRef();

  state = {
    // 用户文本框状态
    userState: false,
    // 密码框状态
    pwdState: false,
    // 给用户输入的文本框和密码框
    name: 'shmily',
    password: 'shmily',
    loading: false
  };


  /**
   * 响应登录事件
   */
  loginHandle = async () => {
    let _this = this;
    _this.formRef.current.validateFields(["name","password"]).then(async (value) =>  {
      let _params = new URLSearchParams();
      _params.append('name', value.name);
      _params.append('password', value.password);
      _this.setState({loading: true});
      const result = await requestLogin(_params);
      let {code, data} = result;
      _this.setState({loading: false});
      if (code === 0) {
        memoryUtils.user = data;// 保存在内存中
        storageUtils.saveUser(data); // 保存到local中
        // 跳转到管理界面 (不需要再回退回到登陆),push是需要回退
        this.props.history.replace('/home.html')
      } else if (code === 5) {
        message.error('请输入用户名和密码');
      } else {
        message.error('用户名或密码错误');
      }
    }).catch(e => console.log("登录异常",e));
  };

  render() {
    const {name,password,loading} = this.state;
    return (
      <div className="login-page">
          <Alert
            message={<Col span={18} offset={3} className="notice-div"><NotificationOutlined/>：由于物联网的特殊性，为了您的设备安全。请您妥善保管好您的密码，请不要在公共场合登录使用!</Col>}
            type="success"
            closable
          />
          <div className="main">
            <Row>
              <Col span={18} offset={3}>
                <h4 className="page-head-line">用户身份认证入口</h4>
              </Col>
            </Row>
            <Row>
              <Col span={8} offset={3}>
                <h4 className="login-form-title">请通过账号和密码进行登录</h4>
                <Spin spinning={loading} delay={500}>
                  <Form layout='vertical' ref={this.formRef}>
                    <Form.Item label="用户名" name="name" initialValue={name}  getValueFromEvent={ (e) => clearTrimValueEvent(e)}
                               rules={[{required: true, message: '请输入用户名'},{min: 4, message: '长度在 4 到 32 个字符'},{max: 30, message: '长度在 4 到 32 个字符'}]}>
                      <Input type='text' placeholder="请输入用户名" />
                    </Form.Item>
                    <Form.Item label="密码" name="password" initialValue={password}  getValueFromEvent={ (e) => clearTrimValueEvent(e)}
                               rules={[{required: true, message: '请输入密码'},{min: 4, message: '长度在 4 到 32 个字符'},{max: 30, message: '长度在 4 到 32 个字符'}]}>
                      <Input type='password' placeholder="请输入密码" />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" onClick={this.loginHandle} className="login-button"><UserOutlined />进入平台</Button>
                    </Form.Item>
                  </Form>
                </Spin>
              </Col>
              <Col span={8} offset={2}>
                <Alert
                  message={<strong>亲爱的用户，欢迎使用本服务平台。在使用之前，请您务必注意以下须知：</strong>}
                  description={
                    <ul>
                      <li>设备启动后，主板上的指示灯先常亮，待设备自检完毕后，指示灯将熄灭</li>
                      <li>设备默认开启STA（作为无线终端接入路由器）+AP（自开启无线热点）</li>
                      <li>设备默认开启的WIFI名称为：极客印记**，密码参见设备底部标签</li>
                      <li>在没有连接上路由器的前提下，您只能通过连接本设备的WIFI进行设置</li>
                      <li>平台的管理入口地址为：192.168.4.1（需要连接本设备WIFI）</li>
                      <li>若账号在正常情况下，无法登录时，请及时联系实验室中心</li>
                    </ul>
                  }
                  type="warning"
                />
                <br/>
                <Alert
                  message={<strong>功能介绍：</strong>}
                  description={
                    <ul>
                      <li>支持STA（作为无线终端接入路由器）/AP（自开启无线热点）模式参数自定义配置</li>
                      <li>支持本地局域网&基于MQTT的远程控制</li>
                      <li>支持MQTT服务器自定义配置</li>
                      <li>支持传感器数据的上报采集</li>
                      <li>支持设备的远程控制</li>
                      <li>支持指标&事件联动</li>
                    </ul>
                  }
                  type="success"
                />
              </Col>
            </Row>
          </div>
      </div>
    );
  }
}

export default Login;
