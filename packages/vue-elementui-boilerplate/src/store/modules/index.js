/*
 * @Author: benaozhi
 * @Date: 2020-01-03 18:14:45
 * @LastEditTime: 2020-08-03 18:57:44
 * @Description: 导出所有 store modules
 */
import { loginStore } from '@/views/web/login'

// 登录与权限
export { default as auth } from './auth/auth.store'

// 用于接收包引入模块
export { loginStore }
