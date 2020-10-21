/*
 * @Author: Cphayim
 * @Date: 2020-07-15 12:49:14
 * @LastEditTime: 2020-10-21 14:55:27
 * @Description: 服务相关设置
 */
import { ENVS } from './envs'

// 开发环境地址
const DEV_BASE_URL = 'http://58.210.169.163:19006'
// 生产环境地址，如果和后端合并部署留空''或 '/'，独立部署同上填协议+主机名+端口号
const PROD_BASE_URL = '/'

// 是否启用 mock
const MOCK_ENABLE = false

export const SERVICES = {
  /*
    start: 网络请求相关配置
  */
  // 是否启用 mock
  MOCK_ENABLE,
  // 协议+主机名+端口号
  BASE_URL: ENVS.IS_DEV ? (MOCK_ENABLE ? '/' : DEV_BASE_URL) : PROD_BASE_URL,
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
    // 通用 CODE
    OK: 0, // ok
    BAD_PARAMS: 400, // 参数错误
    UNAUTHORIZED: 401, // 未通过认证（用户名密码错误或 token 无效）
    FORBIDDEN: 403, // 拒绝访问（没有权限）
    NOT_FOUND: 404, // 没有该资源
    SERVER_ERROR: 500, // 服务端错误
    MAINTENANCE: 503, // 系统维护中
    // 业务 CODE
    // ...
  },
  // 服务端返回 unauthorized 时跳转的路由地址（比如登录页），可选，如没有配置将抛出异常，可在 catch 中处理
  UNAUTHORIZED_REDIRECT_PATH: ENVS.LOGIN_PATH,
  /*
    end: 网络请求相关配置
  */
}
