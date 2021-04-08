/*
 * @Author: Cphayim
 * @Date: 2020-01-03 18:18:20
 * @Description: 认证 store
 */
import { VuexModule, Module, Action, Mutation } from 'vuex-module-decorators'

import { authAPI } from '@/apis'
// import router from '@/router'
import { UseLoading } from '@/utils/decorators'
import { LocalStorageItem } from '@/utils/storage'

// 创建 storage 管理器
const tokenLSI = new LocalStorageItem({ fieldName: '__token__' })

@Module({ namespaced: true })
export default class AuthModule extends VuexModule {
  // 令牌
  _token = tokenLSI.get()
  // 用户信息
  _userInfo = null
  // 资源树
  _resources = []

  get token() {
    return this._token
  }

  get userInfo() {
    return this._userInfo
  }

  get resources() {
    return this._resources
  }

  get isLogin() {
    return Boolean(this.token)
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

  @Mutation
  setUserInfo(userInfo) {
    this._userInfo = userInfo
  }

  @Mutation
  setResources(resources) {
    this._resources = resources
  }

  // 登录
  @Action()
  @UseLoading()
  async login({ username, password }) {
    // 登录并保存 token
    const data = await authAPI.login({ username, password })
    this.context.commit('setToken', data.token)
  }

  // 退出登录
  @Action()
  async logout(silent = false) {
    if (!silent) {
      await authAPI.logout()
    }
    this.context.commit('removeToken')
    // 刷掉添加的动态路由
    location.href = '/'
  }

  // 获取用户信息和资源菜单
  @Action()
  @UseLoading()
  async getInfo() {
    const { userInfo, resources } = await authAPI.getInfo()
    this.context.commit('setUserInfo', userInfo)
    this.context.commit('setResources', resources)
    return resources
  }
}
