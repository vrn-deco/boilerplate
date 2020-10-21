/*
 * @Date: 2019-05-21 13:57:58
 * @Description: 工具函数
 */

/**
 * 例子:
 * export const abslyByArr = arr => arr.map(value => Math.abs(value))
 */

// token 格式化
export function authorizationFormat(token) {
  return `Bearer ${token}`
}
