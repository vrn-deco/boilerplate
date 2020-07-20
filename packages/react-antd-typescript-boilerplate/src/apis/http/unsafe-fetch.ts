/*
 * @Author: Cphayim
 * @Date: 2020-07-16 17:15:01
 * @LastEditTime: 2020-07-16 17:30:45
 * @Description: 非严格的 http 请求工具（用于请求第三方接口等数据响应结构不固定的情况）
 */

import Axios from 'axios'

export const unsafeFetch = Axios.create()
