/*
 * @Author: benaozhi
 * @Date: 2019-12-30 16:40:51
 * @Description: 全局状态（业务相关状态尽量使用模块）
 */

import { VuexModule, Module, Mutation } from 'vuex-module-decorators'

@Module
export default class GlobalModule extends VuexModule {}
