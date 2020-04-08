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

// token 格式化
export function authorizationFormat(token) {
  return b64.encode(`token:${token}`)
}

/**
 * 通过二进制数据下载文件
 * @param {Blob} data
 * @param {string} fileName
 */
export function downloadFile(data, fileName) {
  if (!data) {
    return
  }
  let blob = new Blob([data])
  if ('download' in document.createElement('a')) {
    // 不是IE浏览器
    let url = window.URL.createObjectURL(blob)
    let link = document.createElement('a')
    link.href = url
    link.setAttribute('download', fileName)
    link.click()
    window.URL.revokeObjectURL(url) // 释放掉blob对象
  } else {
    // IE 10+
    window.navigator.msSaveBlob(blob, fileName)
  }
}

/**
 * blob 转为json，处理服务器返回的错误信息
 * 用于下载文件等返回二进制数据接口错误时使用
 * @param blob 数据
 */
export function blobToText(blob) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsText(blob)
    fileReader.onload = function() {
      try {
        const result = JSON.parse(this.result)
        if (result && result['code'] !== 0) {
          resolve(result)
        } else {
          reject(new Error())
        }
      } catch (e) {
        reject(new Error())
      }
    }
  })
}
