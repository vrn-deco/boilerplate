/*
 * @Author: Cphayim
 * @Date: 2019-09-29 13:59:27
 * @LastEditTime: 2020-07-13 02:25:13
 * @Description: 过滤器入口
 */

// demo，可删除
import { arg } from './arg'
export const registerFilters = Vue => {
// 这里注册你的全局过滤器
  arg(Vue)
}
