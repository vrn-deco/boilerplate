/*
 * @Author: Cphayim
 * @Date: 2020-01-03 18:18:20
 * @Description: 用户管理 store
 */
import { VuexModule, Module, Action, Mutation } from 'vuex-module-decorators'

import { userAPI } from '@/apis'
import { UseLoading } from '@/utils/decorators'
import { FormState } from '@/enums/common.enum'

@Module({ namespaced: true })
export default class UserModule extends VuexModule {
  // 当前页列表数据
  list = []
  // 列表 loading
  loading = true
  // 搜索关键字
  keyword = ''
  // 分页
  pagination = {
    current: 1,
    pageSize: 10,
    total: 0,
  }

  // 新增/编辑 modal 的状态
  modal = {
    state: FormState.Done,
    cur: null,
  }

  @Mutation
  setList(list = []) {
    this.list = list
  }

  @Mutation
  setKeyword(keyword) {
    this.keyword = keyword
  }

  @Mutation
  setPagination({ current = 1, pageSize = 10, total = 0 } = {}) {
    this.pagination = { current, pageSize, total }
  }

  @Mutation
  setLoading(bool) {
    this.loading = bool
  }

  @Mutation
  setModal({ state = FormState.Done, cur = null } = {}) {
    if (state === FormState.Edit && !cur) {
      throw new Error('进入编辑模式必须指定一个实体')
    }
    this.modal.state = state
    this.modal.cur = cur
  }

  // 重置
  @Action
  reset(isAll = true) {
    this.context.commit('setPagination')
    this.context.commit('setLoading', true)
    this.context.commit('setModal')
    if (isAll) {
      this.context.commit('setList')
    }
  }

  // 获取列表
  // 通过搜索调用时传递 keyword
  // 普通加载和分页加载不传递
  @Action
  @UseLoading()
  async fetchList({ keyword } = {}) {
    if (keyword !== undefined && this.keyword !== keyword) {
      this.context.dispatch('reset', false)
      this.context.commit('setKeyword', keyword)
    }

    try {
      this.context.commit('setLoading', true)
      const { current, size, total, records } = await userAPI.getList({
        current: this.pagination.current,
        size: this.pagination.pageSize,
        keyword: this.keyword,
      })
      this.context.commit('setPagination', { pageSize: size, current, total })
      this.context.commit('setList', records)
    } finally {
      this.context.commit('setLoading', false)
    }
  }

  // 删除用户
  @Action
  @UseLoading()
  async remove({ userId }) {
    await userAPI.remove({ userId })
    // 更新列表
    this.context.dispatch('fetchList')
  }

  // 获取用户详情
  @Action
  @UseLoading()
  async fetchDetail({ userId }) {
    return userAPI.getDetail({ userId })
  }

  @Action
  @UseLoading()
  async addOrEdit(user) {
    const newUser = await userAPI.addOrEdit(user)
    // 更新列表
    this.context.dispatch('fetchList')
    return newUser
  }
}
