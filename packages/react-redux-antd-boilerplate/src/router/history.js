/*
 * @Autor: yugeStrive
 * @Date: 2020-07-16 14:15:07
 * @LastEditTime: 2020-07-16 14:46:12
 * @Description: 自定义history
 */

import config from '@/config'
import { createBrowserHistory, createHashHistory } from 'history'

export const history =
  config.ENVS.ROUTE_MODE === 'hash' ? createHashHistory() : createBrowserHistory()
