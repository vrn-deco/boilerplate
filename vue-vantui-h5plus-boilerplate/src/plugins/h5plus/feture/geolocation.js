/*
 * @Author: Cphayim
 * @Date: 2019-06-25 15:06:31
 * @LastEditTime: 2019-06-26 14:07:21
 * @Description: 地理信息
 */

/**
 * 获取当前设备位置信息
 * @param {Object} [options={}]
 * @param {boolean} [options.enableHighAccuracy=false] 是否高精确度获取位置信息
 * @param {number} [options.timeout=0] 超时时间（毫秒），0为不设置超时
 * @param {"system"|"baidu"|"amap"} [options.provider=null] 优先使用的定位模块，可不设置，自动判断
 * @returns {Promise}
 */
const getCurrentPosition = (options = {}) => {
  return new Promise((resolve, reject) => {
    window.plus.geolocation.getCurrentPosition(
      position => resolve(position),
      error => reject(error),
      options
    )
  })
}

/**
 * 监听地理位置变化
 * @param {Object} [options={}] 参数
 * @param {boolean} [options.enableHighAccuracy=false] 是否高精确度获取位置信息
 * @param {number} [options.timeout=0] 超时时间（毫秒），0为不设置超时
 * @param {number} [options.maximumAge=5000] 获取位置信息的间隔时间（毫秒，不小于 1000），默认为 5000
 * @param {number} [options.provider=null] 超时时间（毫秒），0为不设置超时
 * @param {Function} callback 监听器回调函数
 * @return {number} 监听器 ID
 */
const watchPosition = (callback, options = {}) => {
  return window.plus.geolocation.watchPosition(callback, err => console.err(err), options)
}

/**
 * 关闭监听设备位置信息
 * @param {number} watchId watchPosition 函数返回的监听器 ID
 */
const clearWatch = watchId => {
  window.plus.geolocation.clearWatch(watchId)
}

export default {
  getCurrentPosition,
  watchPosition,
  clearWatch
}
