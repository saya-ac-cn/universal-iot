import ajax from './ajax'
/**
 * 重要说明！！！
 * 因为，后台已对「/backend，/frontend，/files」接口代理,页面路由绝对禁止出现/backend、/frontend、/files（远景包括map）
 * 在定义接口代理时，上述的路由单词已经被定义，如果使用，刷新页面将出现404，
 * @type {string}
 */

// 后台api接口
let backendAPI = '/api';


// 登录接口
export const requestLogin = params => ajax(`${backendAPI}/login.action`, params, 'POST');
// 修改密码
export const updatePassword = params => ajax(`${backendAPI}/password.action`, params, 'POST');
// 获取mqtt配置
export const getMqttConfig = params => ajax(`${backendAPI}/mqtt.action`, params, 'GET');
// 设置mqtt配置
export const setMqttConfig = params => ajax(`${backendAPI}/mqtt.action`, params, 'POST');
// 获取sta配置
export const getStaConfig = params => ajax(`${backendAPI}/sta.action`, params, 'GET');
// 配置sta
export const setStaConfig = params => ajax(`${backendAPI}/sta.action`, params, 'POST');
// 获取ap配置
export const getApConfig = params => ajax(`${backendAPI}/ap.action`, params, 'GET');
// 配置ap
export const setApConfig = params => ajax(`${backendAPI}/ap.action`, params, 'POST');
// 获取主页数据
export const getHome = params => ajax(`${backendAPI}/home.action`, params, 'GET');

// 注销接口
export const requestLogout = params => ajax(`${backendAPI}/logout`, params, 'POST');