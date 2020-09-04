/*
 * @Author: Cphayim
 * @Date: 2020-03-14 17:38:09
 * @LastEditTime: 2020-08-05 10:35:56
 * @Description: 配置文件
 */

import { DEV_BASE_URL, PROD_BASE_URL } from './base.url'
import RESPONSE_CODE from './response.code'

const IS_DEV = process.env.NODE_ENV === 'development'

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
  RESPONSE_CODE,
  // 服务端返回 unauthorized 时跳转的路由地址（比如登录页），可选，如没有配置将抛出异常，可在 catch 中处理
  UNAUTHORIZED_REDIRECT_PATH: '/login',
  /*
    end: 网络请求相关配置
  */
}
