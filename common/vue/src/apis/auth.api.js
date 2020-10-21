/*
 * @Author: benaozhi
 * @Date: 2020-01-03 18:29:42
 * @LastEditTime: 2020-10-21 09:50:15
 * @Description:
 */
import { strictFetch, unstrictFetch } from './http'

// 登录
export async function login({ username, password }) {
  return strictFetch({
    url: '/auth/login',
    method: 'POST',
    data: {
      username,
      password,
    },
  })
}

// 获取用户信息
export async function userInfo() {
  return strictFetch({
    url: '/auth/info',
    method: 'POST',
  })
}

/**
 * 如果请求第三方接口使用 unstrictAxios 避免进入拦截器逻辑
 */
export async function outerInfo() {
  return unstrictFetch({
    baseURL: 'https://abc.com',
    url: '/xxx',
    method: 'GET',
    params: {
      query1: 'aaa',
      query2: 'bbb',
    },
  })
}
