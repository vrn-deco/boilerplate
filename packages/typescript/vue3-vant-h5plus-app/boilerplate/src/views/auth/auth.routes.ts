import { RouteRecordRaw } from 'vue-router'
import Login from './Login.vue'

export default [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
] as RouteRecordRaw[]
