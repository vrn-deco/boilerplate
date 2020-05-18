/*
 * @Author: Cphayim
 * @Date: 2020-05-14 15:23:05
 * @LastEditTime: 2020-05-14 15:37:56
 * @Description:
 */

import { VantUIDemoPage } from '@/views/demo'

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
