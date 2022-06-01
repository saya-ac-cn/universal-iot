import React, { Component } from 'react';
import {Alert, Button, Col, Form, Input, message, Row, Spin} from "antd";
import {clearTrimValueEvent} from "../../../utils/string";
import {NotificationOutlined,SettingOutlined} from '@ant-design/icons';
import {updatePassword} from "../../../api";
import memoryUtils from "../../../utils/memoryUtils";
import storageUtils from "../../../utils/storageUtils";
import {openNotificationWithIcon} from "../../../utils/window";
/*
 * 文件名：index.jsx
 * 作者：saya
 * 创建日期：2020/7/18 - 10:33 上午
 * 描述：
 */

// 定义组件（ES6）
class Password extends Component {

  formRef = React.createRef();

  state = {
    loading: false
  };

  /**
   * 响应修改密码事件
   */
  submitHandle = async () => {
    let _this = this;
    _this.formRef.current.validateFields(["password1","password2"]).then(async (value) =>  {
      if (value.password1 !== value.password2){
        message.error('两次密码不一致！');
        return
      }
      let _params = new URLSearchParams();
      _params.append('password', value.password2);
      _this.setState({loading: true});
      const result = await updatePassword(_params);
      let {code, data} = result;
      _this.setState({loading: false});
      if (code === 0) {
        openNotificationWithIcon("success", "操作结果", "修改成功");
      } else {
        message.error('修改密码失败');
      }
    }).catch(e => console.log("修改密码异常",e));
  };

  render() {
    const {loading} = this.state;
    return (
      <div className="password-page">
        <Alert
          message={<Col span={18} offset={3} className="notice-div"><NotificationOutlined/>：重要！网关系统凭证关乎正常运行，请不要外泄网关密码！</Col>}
          type="success"
          closable
        />
        <div className="main">
          <Row>
            <Col span={18} offset={3}>
              <h4 className="page-head-line">修改密码</h4>
            </Col>
          </Row>
          <Row>
            <Col span={9} offset={3}>
              <Spin spinning={loading} delay={500}>
                <Form layout='vertical' ref={this.formRef}>
                  <Form.Item label="密码" name="password1" getValueFromEvent={ (e) => clearTrimValueEvent(e)}
                             rules={[{required: true, message: '请输入密码'},{min: 4, message: '长度在 4 到 32 个字符'},{max: 30, message: '长度在 4 到 32 个字符'}]}>
                    <Input type='password' placeholder="请输入密码" />
                  </Form.Item>
                  <Form.Item label="确认密码" name="password2" getValueFromEvent={ (e) => clearTrimValueEvent(e)}
                             rules={[{required: true, message: '请输入密码'},{min: 4, message: '长度在 4 到 32 个字符'},{max: 30, message: '长度在 4 到 32 个字符'}]}>
                    <Input type='password' placeholder="请输入密码" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" onClick={this.submitHandle} className="login-button"><SettingOutlined />提交修改</Button>
                  </Form.Item>
                </Form>
              </Spin>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

// 对外暴露
export default Password;
