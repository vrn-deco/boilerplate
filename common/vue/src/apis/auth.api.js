/*
 * @Author: benaozhi
 * @Date: 2020-01-03 18:29:42
 * @LastEditTime: 2020-09-04 15:11:39
 * @Description:
 */
import Axios, { AxiosConfig } from '@/apis/http/strict-axios'

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
