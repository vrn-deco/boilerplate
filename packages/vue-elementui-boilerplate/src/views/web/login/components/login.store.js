/*
 * @Author: benaozhi
 * @Date: 2020-07-30 18:48:35
 * @LastEditTime: 2020-09-04 15:52:12
 * @Description:
 */
import { VuexModule, Module, Action, Mutation } from 'vuex-module-decorators'

import { authAPI } from '@/apis'
import { UseLoading, SessionStorageItem, filterData } from '@/utils'
import router from '@/router'

// 创建 storage 管理器
const tokenLSI = new SessionStorageItem({ fieldName: 'token' })

@Module({ namespaced: true })
export default class LoginStore extends VuexModule {
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
  async login({ user, pass }) {
    // 登录并保存 token
    const userInfo = filterData(await authAPI.login({ username: user, password: pass }))
    this.context.commit('setToken', userInfo.token)
  }
  // 退出登录
  @Action()
  async loginOut() {
    await authAPI.loginOut()
    this.context.commit('removeToken')
  }
}
