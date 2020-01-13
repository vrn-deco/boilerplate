/*
 * @Author: benaozhi
 * @Date: 2019-12-30 16:40:51
 * @LastEditTime : 2020-01-08 18:17:40
 * @Description: 全局状态（业务相关状态尽量使用模块）
 */

import { VuexModule, Module } from 'vuex-module-decorators'

const isDev = process.env.NODE_ENV === 'development'

@Module
export default class GlobalModule extends VuexModule {
  isDev = isDev
}
