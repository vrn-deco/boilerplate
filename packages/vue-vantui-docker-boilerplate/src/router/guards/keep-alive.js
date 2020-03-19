/*
 * @Author: Cphayim
 * @Date: 2019-10-06 01:34:44
 * @LastEditTime: 2019-10-14 01:07:47
 * @Description:
 */

import store from '@/store'

/**
 * 缓存处理前置
 * @typedef beforeGuard
 */
export function keepAliveGuard(to, from, next) {
  /**
   * 逻辑：
   * 从父页面进入子页面或兄弟时，如果子页面开启缓存，将子页面加入缓存列表
   * 从子页面返回父页面或进入兄弟页面时，如果子页面开启缓存，将子页面移出缓存列表
   * 兄弟页面跳转，当开启缓存，始终移除和加入
   */
  // 如果 to 开启缓存, 且从 from 是 to 的父页面或者 to 是第一屏页面
  if (to.meta.keepAlive && (from.meta.index <= to.meta.index || from.name === null)) {
    // 将 to 添加到缓存列表
    store.commit('keepAlive', to.name)
  }
  // 如果 from 开启缓存（已经被缓存）, 且 from 是 to 的子页面或兄弟页面
  if (from.meta.keepAlive && from.meta.index >= to.meta.index) {
    // 将 from 移出缓存列表
    store.commit('noKeepAlive', from.name)
  }
  next()
}
