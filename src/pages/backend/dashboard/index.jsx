import React, {Component} from 'react';
import {Alert, Descriptions, Badge,Button,Col, Divider, Input, message, Row, Spin} from "antd";
import {NotificationOutlined,WifiOutlined,LinkOutlined,ThunderboltOutlined,BarsOutlined} from "@ant-design/icons";
import './index.less'
import {getHome} from "../../../api";
import {openNotificationWithIcon} from "../../../utils/window";
/*
 * 文件名：index.jsx
 * 作者：saya
 * 创建日期：2020/7/18 - 10:33 上午
 * 描述：
 */

// 定义组件（ES6）
class DashBoard extends Component {

    state = {
        loading: false,
        config: {}
    };

    /**
     * 获取面板数据
     * @returns {Promise<void>}
     */
    getData = async () => {
        let _this = this;
        _this.setState({loading: true});
        const result = await getHome();
        let {code, data} = result;
        _this.setState({loading: false});
        if (code !== 0) {
            openNotificationWithIcon("error", "操作结果", "修改成功");
            return
        }
        _this.setState({config: data});
    }

    /**
     * 转换设备工作模式
     * @param type
     */
    modeEnum = (type) => {
        if(0 === type){
            // WIFI_MODE_NULL
            return 'WIFI_MODE_NULL'
        }else if(1 === type){
            // WIFI_MODE_STA
            return 'WIFI_MODE_STA'
        }else if(2 === type){
            // WIFI_MODE_AP
            return 'WIFI_MODE_AP'
        }else if(3 === type){
            // WIFI_MODE_APSTA
            return 'WIFI_MODE_APSTA'
        }else if(4 === type){
            // WIFI_MODE_MAX
            return 'WIFI_MODE_MAX'
        }else {
            return 'UNDEFINED'
        }
    }

    componentDidMount() {
        this.getData();
    };


    render() {
        const {loading, config} = this.state;
        return (
            <div className="dashboard-page">
                <Alert
                    message={<Col span={18} offset={3} className="notice-div"><NotificationOutlined/>：当设备作为无线热点时，默认最大同时连接数为4个</Col>}
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
                        <Row gutter={[16, 16]}>
                            <Col span={4} offset={4}>
                                <div className="dashboard-div-wrapper bk-clr-one">
                                    <div className="dashboard-div-icon">
                                        <WifiOutlined />
                                    </div>
                                    <Divider className="divider"/>
                                    <h6>连接状态</h6>
                                    <h5 id="connect_router_flag">{(!config.connect_router_flag)?'未连接':'已连接'}</h5>
                                </div>
                            </Col>
                            <Col span={4}>
                                <div className="dashboard-div-wrapper bk-clr-two">
                                    <div className="dashboard-div-icon">
                                        <LinkOutlined />
                                    </div>
                                    <Divider className="divider"/>
                                    <h6>已连接个数</h6>
                                    <h5 id="connect_router_flag">{config.softAPgetStationNum}</h5>
                                </div>
                            </Col>
                            <Col span={4}>
                                <div className="dashboard-div-wrapper bk-clr-three">
                                    <div className="dashboard-div-icon">
                                        <BarsOutlined />
                                    </div>
                                    <Divider className="divider"/>
                                    <h6>工作模式</h6>
                                    <h5 id="connect_router_flag">{this.modeEnum(config.getMode)}</h5>
                                </div>
                            </Col>
                            <Col span={4}>
                                <div className="dashboard-div-wrapper bk-clr-four">
                                    <div className="dashboard-div-icon">
                                        <ThunderboltOutlined />
                                    </div>
                                    <Divider className="divider"/>
                                    <h5>重连模式</h5>
                                    <h4 id="connect_router_flag">{(!config.getAutoReconnect)?'手动':'自动'}</h4>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={18} offset={3}>
                                <Descriptions title="当前设备运行信息" layout="vertical" bordered>
                                    <Descriptions.Item label="已连接网络">{config.sta_ssid}</Descriptions.Item>
                                    <Descriptions.Item label="无线热点名称">{config.ap_ssid}</Descriptions.Item>
                                    <Descriptions.Item label="设备状态">{config.status}</Descriptions.Item>
                                    <Descriptions.Item label="设备状态码">{config.getStatusBits}</Descriptions.Item>
                                    <Descriptions.Item label="主机SSID">{config.SSID}</Descriptions.Item>
                                    <Descriptions.Item label="MQTT连接状态">
                                        {(!config.connect_mqtt_flag)?<Badge status="warning" text="未连接" />:<Badge status="success" text="已连接" />}
                                    </Descriptions.Item>
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
export default DashBoard;