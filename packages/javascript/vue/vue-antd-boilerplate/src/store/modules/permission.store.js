/*
 * @Author: Cphayim
 * @Date: 2021-03-25 17:22:56
 * @Description: 许可模块（权限控制）
 */
import { VuexModule, Module, Action, Mutation } from 'vuex-module-decorators'

import { constantRoutes, asyncRoutes } from '@/router/routes'
import { UseLoading } from '@/utils/decorators'
import exceptionRoutes from '@/views/exception/exception.routes'

@Module({ namespaced: true })
export default class PermissionModule extends VuexModule {
  // 所有能访问的路由，costantRoutes + addRoutes
  _routes = constantRoutes
  // 被添加的动态路由，根据 _resources 从 dynamicRoutes 中提取
  _addRoutes = []
  // Map<Resource.url, Resource>
  // 标记了当前用户能访问的所有异步路由中的资源
  _resourceMap = null

  get routes() {
    return this._routes
  }

  get addRoutes() {
    return this._addRoutes
  }

  get resourceMap() {
    return this._resourceMap
  }

  @Mutation
  setRoutes(addRoutes) {
    this._addRoutes = addRoutes
    this._routes = this._routes.concat(addRoutes)
  }

  @Mutation
  setResourceMap(map) {
    this._resourceMap = map
  }

  @Action()
  @UseLoading()
  async generateRoutes(resources) {
    try {
      // 将 resources 树转存为 Map<Resource.url, Resource>
      const resourceMap = recordToMap(new Map(), resources)
      this.context.commit('setResourceMap', resourceMap)

      const accessedRoutes = filterAsyncRouter(asyncRoutes, resourceMap)
      this.context.commit('setRoutes', accessedRoutes)
      return accessedRoutes
    } catch (error) {
      console.error(error)
      throw new Error('生成资源图失败')
    }
  }
}

// 将 resources 和其子资源全部存入 Map<resource.url, resource> 中
function recordToMap(map, resources) {
  resources.forEach(resource => {
    map.set(resource.url, resource)
    // 递归子资源树
    if (resource.children && resource.children.length) {
      recordToMap(map, resource.children)
    }
  })
  return map
}

// 过滤异步路由表中有权限的路由
function filterAsyncRouter(asyncRoutes, resourceMap) {
  return asyncRoutes.filter(route => {
    // fix: 可能没有 meta
    route.meta = route.meta ?? {}
    if (!route.meta.skipPermission && !resourceMap.has(route.name)) return false

    // route.name 在 resourceMap 中存在即有访问权限
    // 将 resource 挂载到 route.meta 下
    route.meta.resource = resourceMap.get(route.name)

    // 递归子路由
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, resourceMap)
      // 将 route redirect 指向过滤后的第一个子路由（可能原本的第一个被过滤掉了）或 404 页面
      route.redirect = route.children[0]?.path ?? exceptionRoutes[0].path
    }
    return true
  })
}
