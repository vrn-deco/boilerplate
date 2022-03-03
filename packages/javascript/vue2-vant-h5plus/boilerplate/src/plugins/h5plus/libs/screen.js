/*
 * @Author: Cphayim
 * @Date: 2019-07-01 09:16:50
 * @Description: 屏幕信息
 */
import { RuntimeValid } from './platform'

export default class Screen {
  /**
   * 获取屏幕信息
   * @static
   * @return {Object}
   */
  @RuntimeValid
  static getInfo() {
    return window.plus.screen
  }
}
