import Vue from 'vue'
import Vuex from 'vuex'
import * as modules from './modules'

Vue.use(Vuex)

const globalStore = {
  state: {},
  mutations: {},
  actions: {}
}

export default new Vuex.Store({
  strict: true,
  ...globalStore,
  modules
})
