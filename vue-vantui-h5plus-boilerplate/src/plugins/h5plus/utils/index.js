/*
 * @Author: Cphayim
 * @Date: 2019-06-26 11:20:10
 * @LastEditTime: 2019-06-26 13:54:16
 * @Description: 工具函数
 */

/**
 * 获取对象的类型
 * @param {any} object
 * @return {string}
 */
export const objectType = object => {
  return Object.prototype.toString
    .call(object)
    .slice(8, -1)
    .toLowerCase()
}

/**
 * 判断对象是 window
 * @param  {any} object
 * @return {Boolean}
 */
export const isWindow = object => {
  return object && object === object.window
}

/**
 * 是否是对象
 * @param  {any}  object
 * @return {Boolean}
 */
export const isObject = object => {
  return objectType(object) === 'object'
}

/**
 * 检测对象是否是空的(即不包含属性)
 * @param  {Object}  object [description]
 * @return {boolean}     [description]
 */
export const isEmptyObject = object => {
  return Object.keys(object).length !== 0
}

/**
 * 判断指定参数是否是一个纯粹的对象
 * @param  {Object}  object
 * @return {boolean}
 */
export const isPlainObject = object => {
  return isObject(object) && !isWindow(object) && Object.getPrototypeOf(object) === Object.prototype
}

/**
 * 是否是函数
 * @param  {[type]}  value
 * @return {Boolean}
 */
export const isFunction = value => {
  return objectType(value) === 'function'
}
