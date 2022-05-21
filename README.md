# 项目说明

本项目作为构建通用物联网的前端项目，主题采用react+less+antd。其中第一个tag版本作为标准化的模板项目，可以直接使用。

## 重要说明！！！
* 本版本使用了较高版本的antd，不完全兼容上一个版本
* 页面路由绝对禁止出现/backend、/frontend、/warehouse（远景包括map）
* 在定义接口代理时，上述的路由单词已经被定义，如果使用，刷新页面将出现404

## 构建步骤

### 创建项目

* create-react-app universal-iot

> Tips:如果提示-bash: create-react-app: command not found，请使用sudu npm install -g create-react-app进行安装

### 安装antd

* npm install antd

### 按需加载

* npm install  react-app-rewired customize-cra babel-plugin-import
* 在根目录创建config-overrides.js文件，并写入内容
* 修改package.json文件
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
改为：
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
  },
  目的是启动运行项目时加载config-overrides.js配置文件

### 自定义主题

* 下载工具包 npm install less less-loader
* 修改config-overrides.js

### 引入路由

```shell script
  npm add react-router-dom
```

### 安装 axios
```shell script
    npm add axios
```
### 安装 store
```shell script
    npm install store
```
### 安装 http-proxy-middleware 用于设置多个代理
```shell script
    npm install http-proxy-middleware
```

### 重大变更历程事件

> ## 2021-10-18 修改记录-重大修改
* 完成项目初始架构，及标准化模板构建

> ## 2022-05-21 代码封存
* 将之前的master分支代码检出到admin-layout-template
* admin-layout-template作为标准的后台管理项目


### 大数据模板
http://www.bootstrapmb.com/tag/dashuju
http://www.bootstrapmb.com/item/8615
