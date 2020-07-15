/*
 * @Author: Cphayim
 * @Date: 2020-07-15 12:46:48
 * @LastEditTime: 2020-07-15 12:55:08
 * @Description:
 */

import config from '@/config'
import { createHashHistory, createBrowserHistory } from 'history'

// 使用 Hash 路由或 Hisotry 路由
export const history = config.ENVS.ROUTE_MODE === 'hash' ? createHashHistory() : createBrowserHistory()
