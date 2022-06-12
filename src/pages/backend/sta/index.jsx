import React, { Component } from 'react';
import {Alert, Descriptions, Badge,Button,Col, Form, Input, message, Row, Spin} from "antd";
import {clearTrimValueEvent} from "../../../utils/string";
import {NotificationOutlined,SettingOutlined} from '@ant-design/icons';
import {getStaConfig,setStaConfig} from "../../../api";
import {openNotificationWithIcon} from "../../../utils/window";
/*
 * 文件名：index.jsx
 * 作者：saya
 * 创建日期：2020/7/18 - 10:33 上午
 * 描述：
 */

// 定义组件（ES6）
class Sta extends Component {

  formRef = React.createRef();

  state = {
    loading: false,
    config:{}
  };

  /**
   * 获取Sta配置
   * @returns {Promise<void>}
   */
  getStaConfigData = async () => {
    let _this = this;
    _this.setState({loading: true});
    const result = await getStaConfig();
    let {code, data} = result;
    _this.setState({loading: false});
    if (code !== 0) {
      openNotificationWithIcon("error", "操作结果", "修改成功");
      return
    }
    data.ssid = data.sta_ssid;
    data.password = data.sta_password;
    _this.setState({config: data},()=>{
      _this.formRef.current.setFieldsValue(data);
    });
  }

  /**
   * 响应修改sta事件
   */
  submitHandle = async () => {
    let _this = this;
    _this.formRef.current.validateFields(["ssid","password"]).then(async (value) =>  {
      let _params = new URLSearchParams();
      _params.append('ssid', value.ssid);
      _params.append('password', value.password);
      _this.setState({loading: true});
      const result = await setStaConfig(_params);
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
    this.getStaConfigData();
  };

  render() {
    const {loading,config} = this.state;
    return (
      <div className="sta-page">
        <Alert
          message={<Col span={18} offset={3} className="notice-div"><NotificationOutlined/>：为使网关接入互联网，建议您的网关配置好相关的无线路由器连接信息，设置完毕后，请重启网关。</Col>}
          type="success"
          closable
        />
        <div className="main">
          <Row>
            <Col span={18} offset={3}>
              <h4 className="page-head-line">上网设置</h4>
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
                <Descriptions title="当前设备连接路由器信息" layout="vertical" bordered>
                  <Descriptions.Item label="本地IP">{config.localIP}</Descriptions.Item>
                  <Descriptions.Item label="本地IPv6">{config.localIPv6}</Descriptions.Item>
                  <Descriptions.Item label="网络ID">{config.networkID}</Descriptions.Item>
                  <Descriptions.Item label="物理地址">{config.macAddress}</Descriptions.Item>
                  <Descriptions.Item label="网关地址">{config.gatewayIP}</Descriptions.Item>
                  <Descriptions.Item label="DNS">{config.dnsIP}</Descriptions.Item>
                  <Descriptions.Item label="连接状态">
                    {(!config.connect_router_flag)?<Badge status="warning" text="未连接" />:<Badge status="success" text="已连接" />}
                  </Descriptions.Item>
                  <Descriptions.Item label="主机名">{config.getHostname}</Descriptions.Item>
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
export default Sta;
