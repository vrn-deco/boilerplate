/*
 * @Author: benaozhi
 * @Date: 2020-08-03 18:44:08
 * @LastEditTime: 2020-08-03 23:22:16
 * @Description:模拟用户登陆
 */
import { Restful } from '../restful.js'

export default {
  'post|/auth/login': (option) => {
    const { password, username } = JSON.parse(option.body)
    if (username === 'admin' && password === '123456') {
      return Restful.setResult({
        user: username,
        token: 'token'
      })
    } else {
      return Restful.setResult({
        user: null
      }, '10002', '用户名或密码错误')
    }
  }
}
