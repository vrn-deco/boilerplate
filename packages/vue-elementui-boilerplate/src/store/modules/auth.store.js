/*
 * @Author: benaozhi
 * @Date: 2020-01-03 18:18:20
 * @LastEditTime: 2020-10-21 14:23:02
 * @Description: 认证 store
 */
import { VuexModule, Module, Action, Mutation } from 'vuex-module-decorators'

import { authAPI } from '@/apis'
import router from '@/router'
import { UseLoading } from '@/utils/decorators'
import { LocalStorageItem } from '@/utils/storage'

// 创建 storage 管理器
const tokenLSI = new LocalStorageItem({ fieldName: 'token' })

@Module({ namespaced: true })
export default class AuthModule extends VuexModule {
  // 令牌
  _token = tokenLSI.get()

  get token() {
    return this._token
  }

  @Mutation
  setToken(token) {
    this._token = token
    tokenLSI.set(token)
  }

  @Mutation
  removeToken() {
    this._token = null
    tokenLSI.remove()
  }

  // 登录
  @Action()
  @UseLoading('正在登录...')
  async login({ username, password }) {
    // 登录并保存 token
    const userInfo = await authAPI.login({ username, password })
    this.context.commit('setToken', userInfo.token)
    router.replace({ path: '/' })
  }
  // 退出登录
  @Action()
  async loginOut() {
    await authAPI.loginOut()
    this.context.commit('removeToken')
  }
}
