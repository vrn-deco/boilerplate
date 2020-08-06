/*
 * @Autor: yugeStrive
 * @Date: 2020-07-21 08:59:25
 * @LastEditTime: 2020-08-05 10:40:08
 * @Description: 常用正则
 */

/**
 * 验证正整数
 * @param {*} val
 * @param {Function} callback
 */
export const validateNumber = (val, callback) => {
  if (!Number(val)) {
    callback(new Error('请输入正整数'))
  } else {
    const reg = /^[0-9]*[1-9][0-9]*$/
    const rsCheck = reg.test(val)
    if (!rsCheck) {
      callback(new Error('请输入正整数'))
    } else {
      callback()
    }
  }
}

/**
 * 验证数字
 * @param {*} val
 * @param {Function} callback
 */
export const validateFigure = (val, callback) => {
  const reg = /[\d.]/g
  const isFigure = reg.test(val)
  if (!isFigure) {
    callback(new Error('请输入数字'))
  } else {
    callback()
  }
}

/**
 * 验证只是汉字
 * @param {*} val
 * @param {Function} callback
 */
export const validateChina = (val, callback) => {
  const reg = /^[\u4e00-\u9fa5]+$/
  const isChina = reg.test(val)
  if (!isChina) {
    callback(new Error('请输入汉字'))
  } else {
    callback()
  }
}

/**
 * 验证手机号码或者固定电话
 * @param {*} val
 * @param {Function} callback
 */
export const validatePhone = (val, callback) => {
  const reg = /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/
  const isPhone = reg.test(val)
  if (!isPhone) {
    callback(new Error('请输入正确的电话号码或者固话号码'))
  } else {
    callback()
  }
}

/**
 * 车牌号验证
 * @param {*} val
 * @param {Function} callback
 */
export const validateCarNum = (val, callback) => {
  const reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
  const isCPH = reg.test(val)
  if (!isCPH) {
    callback(new Error('请输入正确的车牌号'))
  } else {
    callback()
  }
}
