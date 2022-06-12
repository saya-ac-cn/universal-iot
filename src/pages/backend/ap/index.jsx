import React, { Component } from 'react';
import {Alert, Descriptions, Badge,Button,Col, Form, Input, message, Row, Spin} from "antd";
import {clearTrimValueEvent} from "../../../utils/string";
import {NotificationOutlined,SettingOutlined} from '@ant-design/icons';
import {getApConfig,setApConfig} from "../../../api";
import {openNotificationWithIcon} from "../../../utils/window";
/*
 * 文件名：index.jsx
 * 作者：saya
 * 创建日期：2020/7/18 - 10:33 上午
 * 描述：
 */

// 定义组件（ES6）
class Ap extends Component {

  formRef = React.createRef();

  state = {
    loading: false,
    config:{}
  };

  /**
   * 获取Ap配置
   * @returns {Promise<void>}
   */
  getApConfigData = async () => {
    let _this = this;
    _this.setState({loading: true});
    const result = await getApConfig();
    let {code, data} = result;
    _this.setState({loading: false});
    if (code !== 0) {
      openNotificationWithIcon("error", "操作结果", "修改成功");
      return
    }
    data.ssid = data.ap_ssid;
    data.password = data.ap_password;
    _this.setState({config: data},()=>{
      _this.formRef.current.setFieldsValue(data);
    });
  }

  /**
   * 响应修改ap事件
   */
  submitHandle = async () => {
    let _this = this;
    _this.formRef.current.validateFields(["ssid","password"]).then(async (value) =>  {
      let _params = new URLSearchParams();
      _params.append('ssid', value.ssid);
      _params.append('password', value.password);
      _this.setState({loading: true});
      const result = await setApConfig(_params);
      let {code, data} = result;
      _this.setState({loading: false});
      if (code === 0) {
        openNotificationWithIcon("success", "操作结果", "修改成功");
      } else {
        message.error('修改配置失败');
      }
    }).catch(e => console.log("修改配置异常",e));
  };

  componentDidMount() {
    this.getApConfigData();
  };

  render() {
    const {loading,config} = this.state;
    return (
      <div className="ap-page">
        <Alert
          message={<Col span={18} offset={3} className="notice-div"><NotificationOutlined/>：网关热点信息用于配置进入系统的入口地址，为使设备安全，请不要外泄！</Col>}
          type="success"
          closable
        />
        <div className="main">
          <Row>
            <Col span={18} offset={3}>
              <h4 className="page-head-line">热点设置</h4>
            </Col>
          </Row>
          <Spin spinning={loading} delay={500} style={{width:'100%'}}>
            <Row>
              <Col span={9} offset={3}>
                <Form layout='vertical' ref={this.formRef}>
                  <Form.Item label="Wifi名称" name="ssid" getValueFromEvent={ (e) => clearTrimValueEvent(e)}
                             rules={[{required: true, message: '请输入Wifi名称'},{min: 4, message: '长度在 4 到 16 位'},{max: 16, message: '长度在 4 到 16 位'}]}>
                    <Input type='ssid' placeholder="请输入Wifi名称" />
                  </Form.Item>
                  <Form.Item label="Wifi密码" name="password" getValueFromEvent={ (e) => clearTrimValueEvent(e)}
                             rules={[{required: true, message: '请输入Wifi密码'},{min: 8, message: '长度在 8 到 16 位'},{max: 16, message: '长度在 8 到 16 位'}]}>
                    <Input type='password' placeholder="请输入Wifi密码" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" onClick={this.submitHandle} className="login-button"><SettingOutlined />提交修改</Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col span={18} offset={3}>
                <Descriptions title="当前设备热点信息" layout="vertical" bordered>
                  <Descriptions.Item label="主机IP">{config.softAPIP}</Descriptions.Item>
                  <Descriptions.Item label="主机IPv6">{config.softAPIPv6}</Descriptions.Item>
                  <Descriptions.Item label="主机SSID">{config.SSID}</Descriptions.Item>
                  <Descriptions.Item label="广播地址">{config.softAPBroadcastIP}</Descriptions.Item>
                  <Descriptions.Item label="物理地址">{config.softAPmacAddress}</Descriptions.Item>
                  <Descriptions.Item label="网络ID">{config.softAPNetworkID}</Descriptions.Item>
                  <Descriptions.Item label="已连接个数">{config.softAPgetStationNum}</Descriptions.Item>
                  <Descriptions.Item label="主机名">{config.softAPgetHostname}</Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>
          </Spin>
        </div>
      </div>
    );
  }
}

// 对外暴露
export default Ap;
