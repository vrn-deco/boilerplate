/*
 * @Author: benaozhi
 * @Date: 2020-01-03 18:18:20
 * @LastEditTime: 2020-07-13 01:49:34
 * @Description: 认证 store
 */
import { VuexModule, Module, Action, Mutation } from 'vuex-module-decorators'

import { authAPI } from '@/apis'
import { UseLoading, SessionStorageItem } from '@/utils'
import router from '@/router/index1'

// 创建两个 storage 管理器
const tokenLSI = new SessionStorageItem({ fieldName: 'token' })

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
    router.replace({ path: '/system' })
  }

  @Mutation
  removeToken() {
    this._token = null
    tokenLSI.remove()
  }

  // 登录
  @Action({ rawError: true })
  @UseLoading('正在登录...')
  async login() {
    // 登录并保存 token
    const userInfo = await authAPI.login({})
    this.context.commit('setToken', userInfo.token)
  }
  // 退出登录
  @Action()
  async loginOut() {
    await authAPI.loginOut()
    this.context.commit('removeToken')
  }
}
