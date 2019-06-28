/*
 * @Author: Cphayim
 * @Date: 2019-06-25 11:12:05
 * @LastEditTime: 2019-06-25 11:19:09
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

if(plus) {
  platform.plus = true
}

if(stream) {
  platform.stream = true
}

if(wechat) {
  platform.wechat = true
}

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
