/*
 * @Author: Cphayim
 * @Date: 2019-07-02 10:30:52
 * @Description: 本地存储
 */

import { RuntimeValid } from './platform'

export default class Storage {
  @RuntimeValid
  static getLength() {
    return window.plus.storage.getLength()
  }
  @RuntimeValid
  static getItem(key) {
    return window.plus.storage.getItem(key)
  }
  @RuntimeValid
  static setItem(key, val) {
    window.plus.storage.setItem(key, val)
  }
  @RuntimeValid
  static removeItem(key) {
    window.plus.storage.removeItem(key)
  }
  @RuntimeValid
  static clear(key) {
    window.plus.storage.clear(key)
  }
}
