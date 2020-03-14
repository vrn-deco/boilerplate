/*
 * @Author: Cphayim
 * @Date: 2020-03-14 16:17:42
 * @LastEditTime: 2020-03-14 16:25:50
 * @Description:
 */

const DEV_BASE_URL = 'http://58.210.169.163:19006'
const PROD_BASE_URL = ''
const IS_DEV = process.env.NODE_ENV === 'development'

export default {
  BASE_URL: IS_DEV ? DEV_BASE_URL : PROD_BASE_URL,
  VCONSOLE_ENABLE: true,
}
