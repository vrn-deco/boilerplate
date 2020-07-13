/*
 * @Author: Cphayim
 * @Date: 2020-03-14 17:38:09
 * @LastEditTime: 2020-07-13 15:32:27
 * @Description: 配置文件
 */

const IS_DEV = process.env.NODE_ENV === 'development'

// 开发环境地址
const DEV_BASE_URL = 'https://myvx.netintech.cn:4433/pc'
// 生产环境地址，如果和后端合并部署留空''或 '/'，独立部署同上填协议+主机名+端口号
const PROD_BASE_URL = '/'

export default {
  // 是否是开发环境
  IS_DEV,
  // vconsole 插件开关，设置为 true 也仅在开发环境下生效（PC端项目请忽略）
  VCONSOLE_ENABLE: true,

  /*
    start: 网络请求相关配置
  */
  // 协议+主机名+端口号
  BASE_URL: IS_DEV ? DEV_BASE_URL : PROD_BASE_URL,
  /**
   * 这里假设假设你的服务端返回的 response body 为
   * {
   *    code: number,
   *    msg: string,
   *    data: any
   * }
   * 类型的 json 对象
   */
  // code 对应的字段名，上例就是 'code'
  RESPONSE_CODE_FILED: 'code',
  // message 对应的字段名，上例就是 'msg'
  RESPONSE_MESSAGE_FILED: 'msg',
  // data 对应的字段名，上例就是 'data'
  RESPONSE_DATA_FILED: 'data',
  // 几种特定需要前端处理的 code 值（将在 axios 基础服务中自动处理，其余将抛出异常，可在 catch 中处理）
  RESPONSE_CODE: {
    OK: 0, // ok
    UNAUTHORIZED: 401, // token 过期
    SERVER_ERROR: 500, // 服务端错误
    MAINTENANCE: 503, // 系统维护中
  },
  // 服务端返回 unauthorized 时跳转的路由地址（比如登录页），可选，如没有配置将抛出异常，可在 catch 中处理
  UNAUTHORIZED_REDIRECT_PATH: '/',
  /*
    end: 网络请求相关配置
  */
}
