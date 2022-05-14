/*
 * @Author: Cphayim
 * @Description: 客户端环境配置项
 */
// eslint-disable-next-line
// @ts-ignore-next-line
import pkg from '@/../package.json'

export const APP = {
  /**
   * 基本配置
   */
  // 当前运行模式
  MODE: process.env.NODE_ENV,
  // 应用名称
  APP_NAME: process.env.VUE_APP_NAME,
  // 应用版本
  VERSION: pkg.version,
  // 客户端密钥（用于本地加密）
  CSK: process.env.VUE_APP_SECRET_CODE,

  /**
   * 路由配置
   */
  // 首页 path（自动跳转用）
  HOME_PATH: '/',
  // 登录页 path（自动跳转用）
  LOGIN_PATH: '/auth/login',

  /**
   * 其它配置，例如第三方插件
   */
  VCONSOLE_ENABLE: process.env.NODE_ENV === 'development',
}
