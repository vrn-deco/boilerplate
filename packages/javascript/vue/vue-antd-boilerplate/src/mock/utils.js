/*
 * @Author: Cphayim
 * @Date: 2021-03-26 16:26:29
 * @Description: mock 工具函数
 */
import { join } from 'path'

class ResBody {
  constructor({ code = 0, message = 'ok', data = null } = {}) {
    this.code = code
    this.message = message
    this.data = data
  }
}

export function response(data, { code = 0, message = 'ok' } = {}) {
  return new ResBody({ code, message, data })
}

export function buildPath(path) {
  return new RegExp(join(path))
}

export function parseBody(jsonStr) {
  try {
    return JSON.parse(jsonStr)
  } catch (error) {
    console.log(`[mock]: json 解析错误: ${jsonStr}`)
    console.error(error)
    return false
  }
}

export function deepCopy(obj) {
  return obj |> JSON.stringify |> JSON.parse
}
