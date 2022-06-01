import React, { Component } from 'react';
import {Alert, Button, Col, Form, Input, message, Row, Spin,Switch} from "antd";
import {clearTrimValueEvent} from "../../../utils/string";
import {NotificationOutlined,SettingOutlined,CheckOutlined,CloseOutlined} from '@ant-design/icons';
import {getMqttConfig,setMqttConfig} from "../../../api";
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
class Mqtt extends Component {

  formRef = React.createRef();

  state = {
    loading: false,
    config:{}
  };

  /**
   * 获取mqtt配置
   * @returns {Promise<void>}
   */
  getMqttConfigData = async () => {
    let _this = this;
    _this.setState({loading: true});
    const result = await getMqttConfig();
    let {code, data} = result;
    _this.setState({loading: false});
    if (code !== 0) {
      openNotificationWithIcon("error", "操作结果", "修改成功");
      return
    }
    data.flag = '1' === data.flag
    data.status = '1' === data.status
    _this.setState({config: data},()=>{
      _this.formRef.current.setFieldsValue(data);
    });
  }

  /**
   * 响应修改密码事件
   */
  submitHandle = async () => {
    let _this = this;
    _this.formRef.current.validateFields(["flag","host","port"]).then(async (value) =>  {
      console.log(value)
      let _params = new URLSearchParams();
      _params.append('flag', true === value.flag ? 1:0);
      _params.append('port', value.port);
      _params.append('host', value.host);
      _this.setState({loading: true});
      const result = await setMqttConfig(_params);
      let {code, data} = result;
      _this.setState({loading: false});
      if (code === 0) {
        openNotificationWithIcon("success", "操作结果", "修改成功");
      } else {
        message.error('修改MQTT配置失败');
      }
    }).catch(e => console.log("修改MQTT配置异常",e));
  };

  componentDidMount() {
    this.getMqttConfigData();
  };

  render() {
    const {loading,config} = this.state;
    return (
      <div className="password-page">
        <Alert
          message={<Col span={18} offset={3} className="notice-div"><NotificationOutlined/>：当设备需要进行数据的远程上报和控制时，需要进行连接配置。</Col>}
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
                  <Form.Item label="是否开启" name="flag" valuePropName={config.flag?'checked':null}>
                    <Switch checkedChildren="开启" unCheckedChildren="关闭" />
                  </Form.Item>
                  <Form.Item label="MQTT连接状态" name="status" valuePropName={config.status?'checked':null}>
                    <Switch disabled={true} checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} defaultChecked/>
                  </Form.Item>
                  <Form.Item label="服务器" name="host" initialValue={config.host} getValueFromEvent={ (e) => clearTrimValueEvent(e)}
                             rules={[{required: true, message: '请输入服务器'},{min: 4, message: '长度在 4 到 32 个字符'},{max: 30, message: '长度在 4 到 32 个字符'}]}>
                    <Input type='text' placeholder="请输入服务器地址" />
                  </Form.Item>
                  <Form.Item label="端口" name="port" initialValue={config.port} getValueFromEvent={ (e) => clearTrimValueEvent(e)}
                             rules={[{required: true, message: '请输入端口'},{min: 1, message: '长度在 1 到 5 个字符'},{max: 5, message: '长度在 1 到 5 个字符'}]}>
                    <Input type='number' placeholder="请输入端口" />
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
export default Mqtt;
