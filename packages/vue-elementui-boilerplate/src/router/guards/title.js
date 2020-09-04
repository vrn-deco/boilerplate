/*
 * @Author: benaozhi
 * @Date: 2020-01-13 15:56:40
 * @LastEditTime: 2020-08-03 17:40:49
 * @Description:
 */

import config from '@/config'

/**
 * 更新页面 title 守卫
 * @typedef afterGuard
 */
export function updateTitleGuard(to, from) {
  const title = (to.meta && to.meta.title) || ''
  // 设置页面标题为 "路由标题 | 项目名称"
  document.title = title ? `${title} | ${config.PROJECT_NAME}` : config.PROJECT_NAME
}
