/*
 * @Author: Cphayim
 * @Date: 2019-10-05 03:02:56
 * @LastEditTime: 2020-03-27 15:43:01
 * @Description: 配置文件
 */

const IS_DEV = process.env.NODE_ENV === 'development'

// 开发环境
const DEV_BASE_URL = 'http://58.210.169.163:19006'
// 生产环境
const PROD_BASE_URL = ''

export default {
  BASE_URL: IS_DEV ? DEV_BASE_URL : PROD_BASE_URL
}
