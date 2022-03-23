/*
 * @Author: benaozhi
 * @Date: 2020-01-03 18:18:20
 * @Description: 认证 store
 */
import { VuexModule, Module, Action, Mutation } from 'vuex-module-decorators'

import { UseLoading } from '@/utils/decorators'
import { authAPI } from '@/apis'
import { LocalStorageItem } from '@/utils/storage'

// 创建两个 storage 管理器
const tokenLSI = new LocalStorageItem({ fieldName: 'token' })
const userInfoLSI = new LocalStorageItem({ fieldName: 'userInfo', jsonify: true })

@Module({ namespaced: true })
export default class AuthModule extends VuexModule {
  // 令牌
  _token = tokenLSI.get()
  // 用户信息
  _userInfo = userInfoLSI.get()

  get token() {
    return this._token
  }
  get isLogin() {
    return !!(this._token && this._userInfo)
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
  async login({ loginName, password }) {
    // 登录并保存 token
    const { token } = await authAPI.login({ loginName, password })
    this.context.commit('setToken', token)
  }

  // 退出登录
  @Action()
  async logout() {
    this.context.commit('removeToken')
  }
}
