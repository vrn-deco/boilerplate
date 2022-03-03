/*
 * @Author: Cphayim
 * @Date: 2020-05-14 15:23:05
 * @Description:
 */

import VantUIDemoPage from './vant-ui.vue'

export default [
  {
    path: '/demo/vant-ui',
    name: VantUIDemoPage.name,
    component: VantUIDemoPage,
    meta: {
      title: 'VantUI 示例',
      index: 1,
      keepAlive: false,
    },
  },
]
