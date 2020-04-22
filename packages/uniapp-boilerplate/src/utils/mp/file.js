/*
 * @Author: Cphayim
 * @Date: 2020-03-09 17:08:04
 * @LastEditTime: 2020-03-10 23:52:22
 * @Description:
 */

 /**
 * 获取图片信息
 * @export
 * @param {string} path
 * @returns
 */
export function getImageInfo(path) {
  return new Promise((resolve, reject) => {
    uni.getImageInfo({
      src: path,
      success: resolve,
      fail: reject
    })
  })
}

/**
 * 获取文件信息
 * @export
 * @param {string} path
 * @returns
 */
export function getFileInfo(path) {
  return new Promise((resolve, reject) => {
    uni.getFileInfo({
      filePath: path,
      success: resolve,
      fail: reject
    })
  })
}

/**
 * 将字节转换为指定单位
 * @export
 * @param {number} byte
 * @param {string} [unit='MB']
 * @returns
 */
export function byteToAny(byte, unit = 'MB') {
  const rules = {
    B: 0,
    KB: 1,
    MB: 2,
    GB: 3,
    TB: 4
  }
  const rule = rules[unit.toUpperCase()]
  if(!rule) {
    throw new TypeError(`${unit.toUpperCase()} 不是有效的单位`)
  }
  const seed = Math.pow(1024, rule[unit])
  return byte / seed
}
