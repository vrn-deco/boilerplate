/*
 * @Author: benaozhi
 * @Date: 2020-01-03 18:29:42
 * @LastEditTime: 2020-08-03 19:00:59
 * @Description:
 */
import Axios, { AxiosConfig } from '@/apis/services/axios'

// 登录
export function login({ username, password }) {
  return Axios(
    new AxiosConfig({
      url: '/auth/login',
      method: 'POST',
      data: {
        username,
        password,
      },
    }),
  )
}

// 获取用户信息
export function userInfo() {
  return Axios(
    new AxiosConfig({
      url: '/auth/info',
      method: 'POST',
    }),
  )
}
