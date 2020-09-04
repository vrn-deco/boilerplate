/*
 * @Author: benaozhi
 * @Date: 2020-07-30 18:49:40
 * @LastEditTime: 2020-08-03 21:45:21
 * @Description:
 */
import login from './login.vue'
export { default as loginStore } from './components/login.store'

const loginRouter = {
  path: '/login',
  name: login.name,
  component: login,
  meta: {
    title: '登录',
    keepAlive: false,
    menu: false,
    menuLevel: 1,
  },
  children: [],
}

export { login, loginRouter }
