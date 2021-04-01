/*
 * @Autor: yugeStrive
 * @Date: 2020-07-29 15:12:15
 * @LastEditTime: 2020-09-04 17:32:18
 * @Description: 响应拦截处理
 */

import config from '@/config'
import { history } from '@/router/history'

const service = config.SERVICES

export const registerResponseInterceptor = (Axios) => {
  Axios.interceptors.response.use((response) => {
    const res = response.data
    const code = res[service.RESPONSE_CODE_FILED]
    if (code === service.RESPONSE_CODE.UNAUTHORIZED) {
      // token 过期或未登录
      // 当 config.UNAUTHORIZED_REDIRECT_PATH 有设置时进行自动跳转到先导页
      if (service.UNAUTHORIZED_REDIRECT_PATH) {
        // store.dispatch(push(service.UNAUTHORIZED_REDIRECT_PATH))
        history.replace(service.UNAUTHORIZED_REDIRECT_PATH)
      }
      // 抛出异常中断外部后续逻辑
      throw new Error(res[service.RESPONSE_MESSAGE_FILED])
    } else {
      // 包含ResponseCode.OK和其它具体业务 code，全部当做成功放行
      return res
    }
  })
}
