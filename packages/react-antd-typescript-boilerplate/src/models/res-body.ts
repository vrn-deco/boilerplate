/*
 * @Author: Cphayim
 * @Date: 2020-07-17 09:06:56
 * @LastEditTime: 2020-07-17 09:35:46
 * @Description: 响应结构
 */

export interface ResBody<T = any> {
  code: number
  msg: string
  data: T
  [x: string]: any
}
