/*
 * @Author: benaozhi
 * @Date: 2020-01-03 18:29:42
 * @LastEditTime: 2020-10-12 14:24:13
 * @Description:
 */
import { strictAxios } from './http/strict-axios'
import { unstrictAxios } from './http/unstrict-axios'

// 登录
export async function login({ username, password }) {
  return strictAxios({
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
  return strictAxios({
    url: '/auth/info',
    method: 'POST',
  })
}

/**
 * 如果请求第三方接口使用 unstrictAxios 避免进入拦截器逻辑
 */
export async function outerInfo() {
  return unstrictAxios({
    baseURL: 'https://abc.com',
    url: '/xxx',
    method: 'GET',
    params: {
      query1: 'aaa',
      query2: 'bbb',
    },
  })
}
