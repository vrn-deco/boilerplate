/*
 * @Author: Cphayim
 * @Date: 2019-06-25 11:12:05
 * @LastEditTime: 2019-07-02 10:21:37
 * @Description: 平台信息
 */

const platform = {
  plus: false,
  stream: false,
  wechat: false,
  android: false,
  iphone: false,
  ipad: false,
  version: ''
}

const ua = navigator.userAgent

// plus
const plus = ua.match(/Html5Plus/i)
// stream
const stream = ua.match(/StreamApp/i)
// wechat
const wechat = ua.match(/(MicroMessenger)\/([\d.]+)/i)
// android
const android = ua.match(/(Android);?[\s/]+([\d.]+)?/)
// iphone
const iphone = ua.match(/(iPhone\sOS)\s([\d_]+)/)
// ipad
const ipad = ua.match(/(iPad).*OS\s([\d_]+)/)

if(plus) platform.plus = true

if(stream) platform.stream = true

if(wechat) platform.wechat = true

if(android) {
  platform.android = true
  platform.version = android[2]
  platform.isBadAndroid = !/Chrome\/\d/.test(window.navigator.appVersion)
}

if(iphone) {
  platform.ios = platform.iphone = true
  platform.version = iphone[2].replace(/_/g, '.')
}

if(ipad) {
  platform.ios = platform.ipad = true
  platform.version = ipad[2].replace(/_/g, '.')
}
export default platform

/**
 * 判断是否是 Plus 运行环境
 * 如果不是，在非生产环境下抛出警告
 * @export
 */
export function isPlusRuntime() {
  if(!platform.plus && process.env.NODE_ENV !== 'production') {
    console.warn(
      '你在代码中调用了 plusAPI，当前运行环境非 plus 运行时，请确保使用模拟器、基座或真机调试'
    )
  }
  return platform.plus
}

export function RuntimeValid(t, p, d) {
  const fn = d.value
  d.value = function(...args) {
    if(!isPlusRuntime()) return null
    return fn.call(this, ...args)
  }
}
