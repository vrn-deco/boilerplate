/*
 * @Author: benaozhi
 * @Date: 2020-08-03 18:44:08
 * @LastEditTime: 2020-10-21 14:53:21
 * @Description:模拟用户登陆
 */
import { genResBody } from '../tool.js'

export default {
  'post|/auth/login': option => {
    const { password, username } = JSON.parse(option.body)
    if (username === 'admin' && password === '123456') {
      return genResBody({
        token: 'token',
      })
    } else {
      return genResBody(null, 401, '用户名或密码错误')
    }
  },
}
