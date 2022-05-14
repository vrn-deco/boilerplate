import { ResponseBody, LoginDTO, UserInfo } from '@/types'
import { strictFetch } from '@/utils/http'

// 登录
export async function login(username: string, password: string) {
  const { data: resBody } = await strictFetch.post<ResponseBody<LoginDTO>>('/auth/login', {
    username,
    password,
  })
  return resBody.data
}

// 获取当前用户信息
export async function queryCurrentUserInfo() {
  const { data: resBody } = await strictFetch.post<ResponseBody<UserInfo>>('/auth/info')
  return resBody.data
}
