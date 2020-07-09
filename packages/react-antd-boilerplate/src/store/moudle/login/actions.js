/*
 * @Autor: yugeStrive
 * @Date: 2020-07-09 14:17:30
 * @LastEditTime: 2020-07-09 16:48:40
 * @Description: login模块action
 */

import { REMEMBER_PASSWORD } from './constants'

// 是否记住密码
export const changeRemember = (data) => ({ type: REMEMBER_PASSWORD, payload: data })
