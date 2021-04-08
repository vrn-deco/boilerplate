/*
 * @Author: Cphayim
 * @Date: 2021-03-26 16:23:08
 * @Description: mock /auth 接口
 */
import Mock, { Random } from 'mockjs'
import base64 from 'base-64'

import { dashboardRouteNames } from '@/views/dashboard/dashboard.routes'
import { systemRouteNames } from '@/views/system/system.routes'
import { buildPath, parseBody, response } from '../utils'

// 登录
Mock.mock('/auth/login' |> buildPath, 'post', options => {
  const { data } = parseBody(options.body)
  const [username, password] = base64.decode(data).split(':')
  if (!username || !password) {
    return response(null, { code: 400, message: '账号密码不能为空' })
  }
  if (username === 'admin' && password === '123456') {
    return response({ token: '123', expireTime: Date.now() })
  } else {
    return response(null, { code: 403, message: '账号或密码错误' })
  }
})

// 登出
Mock.mock('/auth/logout' |> buildPath, 'post', options => {
  return response()
})

// 用户信息和资源菜单
Mock.mock('/auth/info' |> buildPath, 'post', options => {
  const userInfo = {
    userId: Random.integer(),
    username: Random.first(),
    nickname: Random.name(),
    phone: Random.string('number', 11),
    email: Random.email(),
    status: 0,
    roleId: Random.integer(),
    roleName: '管理员',
  }
  const resources = [
    {
      resourceId: Random.integer(),
      name: '仪表盘',
      url: dashboardRouteNames.index,
      type: 2,
      parentId: Random.integer(),
      icon: Random.word(),
      enabled: 0,
      children: [
        {
          resourceId: Random.integer(),
          name: '工作台',
          url: dashboardRouteNames.workPlace,
          type: 2,
          parentId: Random.integer(),
          icon: Random.word(),
          enabled: 0,
        },
      ],
    },
    {
      resourceId: Random.integer(),
      name: '系统管理',
      url: systemRouteNames.index,
      type: 2,
      parentId: Random.integer(),
      icon: Random.word(),
      enabled: 0,
      children: [
        {
          resourceId: Random.integer(),
          name: '用户管理',
          url: systemRouteNames.user.index,
          type: 2,
          parentId: Random.integer(),
          icon: Random.word(),
          enabled: 0,
        },
        {
          resourceId: Random.integer(),
          name: '资源配置',
          url: systemRouteNames.resource.index,
          type: 2,
          parentId: Random.integer(),
          icon: Random.word(),
          enabled: 0,
        },
      ],
    },
  ]
  return response({ userInfo, resources })
})
