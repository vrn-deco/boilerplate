/*
 * @Autor: yugeStrive
 * @Date: 2020-07-09 16:15:34
 * @LastEditTime: 2020-07-12 10:52:50
 * @Description: 导入导出多个reducer
 */

import { HomeStore } from './homeStore'

export const moudleReducer = {
    homeStore: HomeStore.createReducer
}
