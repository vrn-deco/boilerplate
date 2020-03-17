/*
 * @Author: Cphayim
 * @Date: 2019-09-26 09:30:11
 * @LastEditTime: 2020-03-14 18:06:45
 * @Description: 设置相关 store
 */
import { VuexModule, Module, Mutation } from 'vuex-module-decorators'

@Module({ namespaced: true })
export default class SettingModule extends VuexModule {
  // tab bar
  tabs = [
    {
      title: '商城',
      to: '/mall/tab',
      icon: 'shop-o',
    },
    {
      title: '资讯',
      to: '/info/tab',
      icon: 'newspaper-o',
    },
    {
      title: '我',
      to: '/user/tab',
      icon: 'user-o',
    },
  ]
  // 侧栏开关
  sideSwitch = false
  // 侧栏
  sideNav = [
    // { title: 菜单显示文字, to: 跳转的路由 path, icon: 显示的图标（vant icon）, admin: 是否只有管理员才显示, confirm: 跳转是否需要二次确认}
    { title: '用户管理', to: '/user/list', icon: 'user', admin: true, confirm: false },
    { title: '单位管理', to: '/unit/list', icon: 'unit', admin: true, confirm: false },
    { title: '角色管理', to: '/role/list', icon: 'role', admin: true, confirm: false },
    { title: '会议管理', to: '/meeting/list', icon: 'meeting', admin: true, confirm: false },
    { title: '退出登录', to: '/auth/logout', icon: 'exit', admin: false, confirm: true },
  ]
  @Mutation
  toggleSide(boolVal) {
    // 没有传值时进行切换，否则设为那个值
    if (boolVal === undefined) {
      this.sideSwitch = !this.sideSwitch
    } else {
      this.sideSwitch = boolVal
    }
  }
}
