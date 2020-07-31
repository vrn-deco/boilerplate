/*
 * @Autor: yugeStrive
 * @Date: 2020-07-29 15:12:15
 * @LastEditTime: 2020-07-31 14:03:28
 * @Description: 响应拦截处理
 */

import config from '@/config'
import store from '@/store'
import { push } from 'connected-react-router'

const service = config.SERVICES

export const registerResponseInterceptor = (Axios) => {
  Axios.interceptors.response.use((response) => {
    const res = response.data
    const code = res[service.RESPONSE_CODE_FILED]
    if (code === service.RESPONSE_CODE.OK) {
      // 成功，直接返回 data
      return res[service.RESPONSE_DATA_FILED]
    } else if (code === service.RESPONSE_CODE.UNAUTHORIZED) {
      // token 过期或未登录
      // 当 config.UNAUTHORIZED_REDIRECT_PATH 有设置时进行自动跳转到先导页
      if (service.UNAUTHORIZED_REDIRECT_PATH) {
        store.dispatch(push(service.UNAUTHORIZED_REDIRECT_PATH))
      }
      // 抛出异常中断外部后续逻辑
      throw new Error(res[service.RESPONSE_MESSAGE_FILED])
    } else {
      // 其它 code，抛出异常
      throw new Error(res[service.RESPONSE_MESSAGE_FILED])
    }
  })
}
