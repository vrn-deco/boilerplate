/*
 * @Author: Cphayim
 * @Date: 2020-03-14 17:38:09
 * @LastEditTime: 2020-03-14 17:41:30
 * @Description: 配置文件
 */

const IS_DEV = process.env.NODE_ENV === 'development'

const DEV_BASE_URL = 'http://58.210.169.163:19006'
const PROD_BASE_URL = ''

export default {
  BASE_URL: IS_DEV ? DEV_BASE_URL : PROD_BASE_URL,
  VCONSOLE_ENABLE: true,
}
