/*
 * @Date: 2019-05-21 13:57:58
 * @Description: 工具函数
 */
import b64 from 'base-64'
/**
 * 例子:
 * export const abslyByArr = arr => arr.map(value => Math.abs(value))
 *
 * 使用:
 * import { abslyByArr } from '@/utils'
 * abslyByArr([-1,2,-3]) // [1,2,3]
 */

// const random = parseInt(Math.random() * Math.pow(10, 6)).toString()
// config.headers.Authorization = base64.encode(`${random}:${token}`)

export const authorizationFormat = (token) => b64.encode(`token:${token}`)
