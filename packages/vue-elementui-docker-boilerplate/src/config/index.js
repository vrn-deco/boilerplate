/*
 * @Author: Cphayim
 * @Date: 2020-03-14 17:38:09
 * @LastEditTime: 2020-04-10 08:49:45
 * @Description: 配置文件
 */

const IS_DEV = process.env.NODE_ENV === 'development'

// 开发环境地址
const DEV_BASE_URL = 'http://58.210.169.163:19006'
// 生产环境地址，如果和后端合并部署留空''或 '/'，独立部署同上填协议+主机名+端口号
const PROD_BASE_URL = ''

export default {
  // 是否是开发环境
  IS_DEV,
  // vconsole 插件开关，设置为 true 也仅在开发环境下生效（PC端项目请忽略）
  VCONSOLE_ENABLE: true,
  // base url
  BASE_URL: IS_DEV ? DEV_BASE_URL : PROD_BASE_URL,
  // response body 中的 code 状态码
  RESPONSE_CODE: {
    OK: 0, // ok
    UNAUTHORIZED: 401, // token 过期
    SERVER_ERROR: 500, // 服务端错误
    MAINTENANCE: 503, // 系统维护中
  },
}
