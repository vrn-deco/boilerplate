/*
 * @Author: benaozhi
 * @Date: 2020-07-19 19:25:44
 * @LastEditTime: 2020-10-21 15:08:38
 * @Description: 响应拦截器
 */
import config from '@/config'
import router from '@/router'

export const registerResponseInterceptors = axiosInstance => {
  axiosInstance.interceptors.response.use(validateCode)
}

/**
 * 验证响应数据的 code 是否正确
 */
function validateCode(response) {
  const res = response.data
  if (!res) {
    throw new Error(`请求失败`)
  }

  const code = res[config.SERVICES.RESPONSE_CODE_FILED]
  const { RESPONSE_CODE } = config.SERVICES

  if (code === RESPONSE_CODE.UNAUTHORIZED) {
    // token 过期或未登录
    // 当 UNAUTHORIZED_REDIRECT_PATH 有设置时进行自动跳转到登录页
    if (config.SERVICES.UNAUTHORIZED_REDIRECT_PATH) {
      router.replace({ path: config.SERVICES.UNAUTHORIZED_REDIRECT_PATH })
    }
    // 抛出异常中断外部后续逻辑
    throw new Error(res[config.SERVICES.RESPONSE_MESSAGE_FILED])
  } else {
    // 其他code，包括 RESPONSE_CODE.OK 在内全部放心
    // 如果有其它业务相关异常 CODE，请在外部处理
    return res
  }
}
