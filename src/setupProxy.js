//const proxy = require('http-proxy-middleware');//0.x.x版本的引用方式
const { createProxyMiddleware } = require('http-proxy-middleware');//1.0.0版本的引用方式
const dev = "http://192.168.3.9:80";
const pro = "http://laboratory.saya.ac.cn";
const url = dev;
// 配置多个跨域设置
//重要说明！！！
//页面路由绝对禁止出现/backend1、/frontend、/warehouse（远景包括map）
//在定义接口代理时，上述的路由单词已经被定义，如果使用，刷新页面将出现404，
//参考 https://wenku.baidu.com/view/ab794f39f9d6195f312b3169a45177232f60e4e5.html
module.exports = function (app) {
    // ...You can now register proxies as you wish!
    app.use(createProxyMiddleware('/api/**', {
        target: url,
        changeOrigin: true,
    }));
};
