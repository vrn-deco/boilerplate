/*
 * @Author: benaozhi
 * @Date: 2019-12-30 16:40:51
 * @LastEditTime: 2020-10-21 13:50:18
 * @Description: 全局状态（业务相关状态尽量使用模块）
 */

import { VuexModule, Module, Mutation } from 'vuex-module-decorators'

@Module
export default class GlobalModule extends VuexModule {
  keepAliveComponents = [] // 缓存组件名的列表，用于 keep-alive include

  // 加入缓存列表
  @Mutation
  keepAlive(componentName) {
    // 防止重复添加
    !this.keepAliveComponents.includes(componentName) &&
      this.keepAliveComponents.push(componentName)
  }
  // 移出缓存列表
  @Mutation
  noKeepAlive(componentName) {
    const index = this.keepAliveComponents.indexOf(componentName)
    index !== -1 && this.keepAliveComponents.splice(index, 1)
  }
}
