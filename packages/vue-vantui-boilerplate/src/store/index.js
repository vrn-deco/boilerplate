/*
 * @Author: Cphayim
 * @Date: 2019-06-25 08:33:56
 * @LastEditTime: 2020-03-14 17:06:53
 * @Description: Store 入口
 */

import Vue from 'vue'
import Vuex from 'vuex'

import * as modules from './modules'
import GlobalModule from './global.store'

Vue.use(Vuex)

const store = new Vuex.Store({
  ...GlobalModule,
  modules,
})

export default store
