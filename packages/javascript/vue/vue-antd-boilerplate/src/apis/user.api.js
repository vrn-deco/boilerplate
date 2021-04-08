/*
 * @Author: Cphayim
 * @Date: 2021-03-27 22:17:42
 * @Description: /user 接口函数
 */

import { strictFetch } from './http'

// 用户列表
export async function getList({ current = 1, size = 10, keyword }) {
  return strictFetch.post('/user/list', {
    current,
    size,
    keyword,
  })
}

// 用户详情
export async function getDetail({ userId }) {
  return await strictFetch.post('/user/detail', {
    userId,
  })
}

// 删除用户
export async function remove({ userId }) {
  return strictFetch.post('/user/remove', {
    userId,
  })
}

// 新增/编辑用户
export async function addOrEdit({
  userId,
  username,
  nickname,
  password,
  phone,
  email,
  status,
  remark,
}) {
  return strictFetch.post('/user/addOrEdit', {
    userId,
    username,
    nickname,
    password,
    phone,
    email,
    status,
    remark,
  })
}
