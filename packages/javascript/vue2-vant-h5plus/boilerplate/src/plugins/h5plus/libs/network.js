/*
 * @Author: Cphayim
 * @Date: 2019-06-25 11:19:47
 * @Description: 网络状态
 */
import { RuntimeValid } from './platform'

export default class Network {
  /**
   * 获取当前网络类型
   * @static
   * @return {string}
   */
  @RuntimeValid
  static getCurrentType() {
    const NETWORK_TYPE = ['UNKNOW', 'NONE', 'ETHERNET', 'WIFI', '2G', '3G', '4G']
    return NETWORK_TYPE[window.plus.networkinfo.getCurrentType()]
  }
}
