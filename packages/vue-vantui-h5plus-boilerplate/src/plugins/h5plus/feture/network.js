/*
 * @Author: Cphayim
 * @Date: 2019-06-25 11:19:47
 * @LastEditTime: 2019-06-26 14:06:43
 * @Description: 网络状态
 */
import platform from './platform'

function getCurrentMetwprlType() {
  const NETWORK_TYPE = ['UNKNOW', 'NONE', 'ETHERNET', 'WIFI', '2G', '3G', '4G']
  if(platform.plus) {
    return NETWORK_TYPE[window.plus.networkinfo.getCurrentType()]
  }
  return null
}

export default {
  getCurrentMetwprlType
}
