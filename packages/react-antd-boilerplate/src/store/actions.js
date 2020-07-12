/*
 * @Autor: yugeStrive
 * @Date: 2020-07-09 14:17:30
 * @LastEditTime: 2020-07-09 15:40:16
 * @Description: action
 */

import { TITLE, STATUS } from './constants'

// 改变标题
export const changeTitle = (data) => ({ type: TITLE, payload: data })

// 改变状态
export const changeStatus = (data) => ({ type: STATUS, payload: data })
