/*
 * @Author: Cphayim
 * @Date: 2020-01-03 18:29:42
 * @Description: /auth 接口函数
 */
import { strictFetch, unstrictFetch } from './http'

import base64 from 'base-64'

// 登录
export async function login({ username, password }) {
  return strictFetch.post('/auth/login', {
    data: base64.encode(`${username}:${password}`),
  })
}

// 登出
export async function logout() {
  return strictFetch.post('/auth/logout')
}

// 获取用户信息和资源菜单
export async function getInfo() {
  const { userInfo, resources } = await strictFetch.post('/auth/info')
  return { userInfo, resources }
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
