/*
 * @Author: Cphayim
 * @Date: 2020-01-03 18:18:20
 * @Description: 资源管理 store
 */
import { VuexModule, Module, Action, Mutation } from 'vuex-module-decorators'

import { resourceAPI } from '@/apis'
import { UseLoading } from '@/utils/decorators'
import { FormState } from '@/enums/common.enum'
import { ResourceTypeEnum } from '@/enums/resource.enum'

@Module({ namespaced: true })
export default class ResourceModule extends VuexModule {
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

  // resource 树，用于选择父节点，需要插入根节点 0
  treeMap = {
    [ResourceTypeEnum.展示平台]: null,
    [ResourceTypeEnum.管理平台]: null,
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

  @Mutation
  setTreeMap(treeMap) {
    this.treeMap = treeMap
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

  // 获取资源列表
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
      const { current, size, total, records } = await resourceAPI.getList({
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

  // 删除资源
  @Action
  @UseLoading()
  async remove({ resourceId }) {
    await resourceAPI.remove({ resourceId })
    // 更新列表
    this.context.dispatch('fetchList')
    // 更新资源树
    this.context.dispatch('fetchTree')
  }

  // 获取资源树
  @Action
  @UseLoading()
  async fetchTree() {
    const [rootNode1, rootNode2] = await Promise.all([
      resourceAPI.getTree({ type: ResourceTypeEnum.展示平台 }),
      resourceAPI.getTree({ type: ResourceTypeEnum.管理平台 }),
    ])
    this.context.commit('setTreeMap', {
      [ResourceTypeEnum.展示平台]: rootNode1,
      [ResourceTypeEnum.管理平台]: rootNode2,
    })
  }

  // 获取资源详情
  @Action
  @UseLoading()
  async fetchDetail({ resourceId }) {
    const resourceDetail = await resourceAPI.getDetail({ resourceId })
    return resourceDetail
  }

  @Action
  @UseLoading()
  async addOrEdit(resource) {
    const newResource = await resourceAPI.addOrEdit(resource)
    // 更新列表
    this.context.dispatch('fetchList')
    // 更新资源树
    this.context.dispatch('fetchTree')
    return newResource
  }
}
