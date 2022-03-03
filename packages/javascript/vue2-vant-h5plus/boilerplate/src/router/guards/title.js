/*
 * @Author: benaozhi
 * @Date: 2020-01-13 15:56:40
 * @Description:
 */

/**
 * 更新页面 title 守卫
 * @typedef afterGuard
 */
export function updateTitleGuard(to, from) {
  document.title = to.meta.title
}
