/*
 * @Author: Cphayim
 * @Date: 2020-07-15 12:44:44
 * @Description: 环境配置
 */
import { version } from '@/../package.json'

export const ENVS = {
  PROJECT_NAME: 'vrn-deco',
  DESCIPTION: 'The project description',
  AUTHOR: 'Your Name',
  COPYRIGHT: 'Name',
  // 版本号
  VERSION: `v${version}`,
  /**
   * start: 环境和安全性
   */
  // 是否是开发环境（测试环境也算作开发环境）
  IS_DEV: process.env.NODE_ENV !== 'production',
  // 客户端安全密钥（仅用于本地 AES 加密存储，请不要和服务端任何密钥一致）
  CSK: process.env.VUE_APP_SECRET_CODE || 'secret_code',
  // 暗号开关
  CIPHER_ENABLE: true,
  /**
   * end: 环境和安全性
   */

  /**
   * start: 路由相关
   */
  // 路由模式 'hash' 或 'history'
  ROUTE_MODE: 'history',
  // 登录页 path（用于自动跳转）
  LOGIN_PATH: '/auth/login',
  // 首页 path（用于自动跳转）
  HOME_PATH: '/',
  /**
   * end: 路由相关
   */

  /**
   * start: Plugins 插件相关
   */
  ANTD: {
    navTheme: 'dark', // sidebar theme ['dark', 'light'] 两种主题
    primaryColor: '#66cc99', // 默认主题色
    layout: 'sidemenu', // 整体布局方式 ['sidemenu', 'topmenu'] 两种布局
    contentWidth: 'Fluid', // 内容区布局： 流式 |  固定
    fixedHeader: true, // 固定 Header : boolean
    fixSiderbar: true, // 固定左侧菜单栏 ： boolean
    colorWeak: false, // 色盲模式
  },
  /**
   * end: Plugins 插件相关
   */
}
