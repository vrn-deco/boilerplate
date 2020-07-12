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
