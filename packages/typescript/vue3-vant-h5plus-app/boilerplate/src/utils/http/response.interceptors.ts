/*
 * @Author: benaozhi
 * @Description: 响应拦截器
 */
import { AxiosInstance, AxiosResponse } from 'axios'
import { router } from '@/router'
import { ResponseBody, ResponseCode } from '@/types'
import config from '@/config'
import { useAuthStore } from '@/stores/auth.store'

export const registerResponseInterceptors = (axios: AxiosInstance) => {
  axios.interceptors.response.use(validateCode)
}

/**
 * 验证响应数据的 code 是否正确
 */
function validateCode(response: AxiosResponse<ResponseBody>) {
  const resBody = response.data
  if (!resBody || resBody.code === undefined) {
    // 服务端没有返回正确的 response body
    throw new Error(`请求失败`)
  }

  const code = resBody.code

  // 这里只对需要提前处理的 code 进行处理
  if (code === ResponseCode.OK) {
    return response
  } else if (code === ResponseCode.UNAUTHORIZED) {
    // token 过期或未登录
    // 当 UNAUTHORIZED_REDIRECT_PATH 有设置时进行自动跳转到登录页
    if (config.SERVER.UNAUTHORIZED_REDIRECT_PATH) {
      // 清掉 token 让 isLogin 变为 false
      useAuthStore().clearToken()
      router.push({ path: config.SERVER.UNAUTHORIZED_REDIRECT_PATH })
    }
    // 抛出异常中断外部后续逻辑
    throw new Error(resBody.message)
  } else {
    // 1. 如有接口特定的业务 code 需在外层处理，这里可以选择放行
    return response
    // 2. 也可以选择直接抛出异常
    // throw new Error(resBody.message)
  }
}
