/*
 * @Author: benaozhi
 * @Date: 2020-06-08 18:18:20
 * @LastEditTime: 2020-06-01 13:55:54
 * @Description: 弹框状态
 */
import { VuexModule, Module, Mutation } from 'vuex-module-decorators'

@Module({ namespaced: true })
export default class ModalModule extends VuexModule {
  _isShow = false

  get isShow() {
    return this._isShow
  }

  @Mutation
  setIsShow(bool) {
    this._isShow = bool
  }
}
