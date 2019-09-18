/*
 * @Author: Cphayim
 * @Date: 2019-09-10 13:36:27
 * @LastEditTime: 2019-09-17 15:14:29
 * @Description: counter action
 */

import { action } from 'typesafe-actions'
import { ADD, INCREMENT } from './constants'

// 原生 redux 写法
// export const increment = () => ({ type: INCREMENT })
export const increment = () => action(INCREMENT)

// 原生 redux 写法
// export const add = (amount: number) => ({ type: ADD, payload: amount })
export const add = (amount: number) => action(ADD, amount)
