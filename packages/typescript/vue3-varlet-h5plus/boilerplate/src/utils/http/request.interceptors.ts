/*
 * @Author: benaozhi
 * @Description: 请求拦截器
 */
import { AxiosInstance, AxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/stores/auth.store'

export const registerRequestInterceptors = (axios: AxiosInstance) => {
  axios.interceptors.request.use(authorize)
}

/**
 * 添加 token 到 header
 */
function authorize(requestConfig: AxiosRequestConfig) {
  // 从 store 中获取 token
  const token = useAuthStore().token
  if (!requestConfig.headers) {
    requestConfig.headers = {}
  }
  // token 存在且请求头中没有 Authorization 字段时添加
  if (token && !requestConfig.headers.Authorization) {
    requestConfig.headers.Authorization = `Bearer ${token}`
  }
  return requestConfig
}
