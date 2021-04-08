/*
 * @Author: Cphayim
 * @Date: 2021-03-26 16:23:08
 * @Description: mock /user 接口
 */
import Mock from 'mockjs'
import { buildPath, deepCopy, parseBody, response } from '../utils'

import allUser from '../data/user.json'

let id = allUser.length

// 用户列表
Mock.mock('/user/list' |> buildPath, 'post', options => {
  const { current = 1, size = 10, keyword = '' } = parseBody(options.body)

  // 过滤
  const filterList = allUser.filter(
    item => item.username.includes(keyword) || item.nickname.includes(keyword),
  )
  // 分页
  const records = filterList.slice(size * (current - 1), size * current)

  return response({
    current,
    size,
    total: filterList.length,
    records,
  })
})

// 用户详情
Mock.mock('/user/detail' |> buildPath, 'post', options => {
  const { userId } = parseBody(options.body)
  if (!userId) return response(null, { code: 400, message: '缺少参数 userId' })
  const user = allUser.find(item => item.userId === userId) |> deepCopy
  return response(user)
})

// 删除用户
Mock.mock('/user/remove' |> buildPath, 'post', options => {
  const { userId } = parseBody(options.body)
  const index = allUser.findIndex(item => item.userId === userId)
  allUser.splice(index, 1)
  return response()
})

// 新增/编辑用户
Mock.mock('/user/addOrEdit' |> buildPath, 'post', options => {
  const { userId, ...args } = parseBody(options.body)
  let user
  if (userId) {
    // 编辑
    const index = allUser.findIndex(item => item.userId === userId)
    user = allUser[index]
    user = { ...user, ...args }
    allUser.splice(index, 1, user)
  } else {
    // 新增
    user = args
    user.userId = ++id
    allUser.push(user)
  }
  if (!user.roleId) {
    user.roleId = 2
    user.roleName = '成员'
  }
  return response(user)
})
