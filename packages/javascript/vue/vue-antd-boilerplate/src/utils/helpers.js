/*
 * @Author: Cphayim
 * @Date: 2021-03-27 00:52:48
 * @Description: 工具函数
 */
import base64 from 'base-64'

/**
 * 例子:
 * export const abslyByArr = arr => arr.map(value => Math.abs(value))
 */

// token 格式化
export function authorizationFormat(token) {
  // return `Bearer ${token}`
  return base64.encode(`token:${token}`)
}
