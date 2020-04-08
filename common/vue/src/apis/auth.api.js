/*
 * @Author: benaozhi
 * @Date: 2020-01-03 18:29:42
 * @LastEditTime : 2020-01-08 18:23:32
 * @Description:
 */
import b64 from 'base-64'
import Axios, { AxiosConfig } from '@/apis/services/axios'

// 登录
export function login(data) {
  return Axios(
    new AxiosConfig({
      url: '/login',
      method: 'POST',
      data: {
        data: b64.encode(`${data.loginName}:${data.password}`),
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
