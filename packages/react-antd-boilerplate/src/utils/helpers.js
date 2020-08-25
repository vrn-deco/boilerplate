/*
 * @Autor: yugeStrive
 * @Date: 2020-07-21 08:59:25
 * @LastEditTime: 2020-07-21 09:55:18
 * @Description: 工具函数
 */
import Base64 from 'base-64'
/**
 * 使用:
 * import { abslyByArr } from '@/utils'
 * abslyByArr([-1,2,-3]) // [1,2,3]
 */
// 取数组绝对值
export const abslyByArr = (arr) => arr.map((value) => Math.abs(value))

// 对用户的token信息进行base64编码加密
export const authorizationFormat = (token) => Base64.encode(`token:${token}`)

// 深拷贝，并过滤空数组
export const deepClone = (obj) => {
  const newObj = obj.constructor === Array ? [] : {}
  for (let keys in obj) {
    if (obj.hasOwnProperty(keys) && obj[keys].length !== 0) {
      if (obj[keys] && typeof obj[keys] === 'object') {
        newObj[keys] = obj[keys].constructor === Array ? [] : {}
        newObj[keys] = deepClone(obj[keys])
      } else {
        newObj[keys] = obj[keys]
      }
    }
  }
  return newObj
}
