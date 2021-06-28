/*
 * @Author: Cphayim
 * @Date: 2020-07-15 12:44:44
 * @LastEditTime: 2020-10-21 09:57:44
 * @Description: 环境配置
 */
import { version } from '@/../package.json'

export const ENVS = {
  // 项目名
  PROJECT_NAME: 'vrn_project',
  // 站点标题
  SITE_TITLE: 'VRN',
  // 版本号
  VERSION: `v${version}`,
  /**
   * start: 环境和安全性
   */
  // 是否是开发环境（测试环境也算作开发环境）
  IS_DEV: process.env.NODE_ENV !== 'production',
  // 客户端安全密钥（仅用于本地 AES 加密存储，请不要和服务端任何密钥一致）
  CSK: process.env.VUE_APP_SECRET_CODE || 'secret_code',
  /**
   * end: 环境和安全性
   */

  /**
   * start: 路由相关
   */
  // 路由模式 'hash' 或 'history'
  ROUTE_MODE: 'hash',
  // 登录页 path（用于自动跳转）
  LOGIN_PATH: '/login',
  // 首页 path（用于自动跳转）
  HOME_PATH: '/',
  /**
   * end: 路由相关
   */

  /**
   * start: Plugins 插件相关
   */
  // vconsole 插件开关，设置为 true 也仅在开发环境下生效（通用配置文件，PC端项目请忽略此项）
  VCONSOLE_ENABLE: true,
  /**
   * end: Plugins 插件相关
   */
}
