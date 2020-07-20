/*
 * @Author: benaozhi
 * @Date: 2020-07-19 17:27:03
 * @LastEditTime: 2020-07-19 19:34:41
 * @Description:
 */
import { defaultResponse } from './default'
export const responseInterceptors = response => {
  // 这里注册你的返回拦截
  defaultResponse(response)
}
