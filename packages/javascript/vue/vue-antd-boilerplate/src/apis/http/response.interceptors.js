/*
 * @Author: benaozhi
 * @Date: 2020-07-19 19:25:44
 * @Description: 响应拦截器
 */
import config from '@/config'
// import router from '@/router'
import store from '@/store'

export const registerResponseInterceptors = axiosInstance => {
  axiosInstance.interceptors.response.use(validateCode)
}

/**
 * 验证响应数据的 code 是否正确
 */
function validateCode(response) {
  const res = response.data
  if (!res) {
    throw new Error('请求失败')
  }

  const code = res[config.SERVICES.RESPONSE_CODE_FILED]
  const { RESPONSE_CODE, RESPONSE_DATA_FILED } = config.SERVICES
  if (code === RESPONSE_CODE.OK) {
    return res[RESPONSE_DATA_FILED]
  } else if (code === RESPONSE_CODE.UNAUTHORIZED) {
    // token 过期或未登录
    // 当 UNAUTHORIZED_REDIRECT_PATH 有设置时进行自动跳转到登录页
    // if (config.SERVICES.UNAUTHORIZED_REDIRECT_PATH) {
    //   router.replace({ path: config.SERVICES.UNAUTHORIZED_REDIRECT_PATH })
    // }
    store.dispatch('auth/logout', true)
    // 抛出异常中断外部后续逻辑
    throw new Error(res[config.SERVICES.RESPONSE_MESSAGE_FILED])
  } else {
    throw new Error(res[config.SERVICES.RESPONSE_MESSAGE_FILED])
  }
}
