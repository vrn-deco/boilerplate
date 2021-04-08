/*
 * @Author: Cphayim
 * @Date: 2021-03-27 00:12:35
 * @Description: 进度条控制
 */

import NProgress from '@/plugins/nprogress'

export function startProgressGuard(tp, from, next) {
  NProgress.start()
  next()
}

export function doneProgressGuard() {
  NProgress.done()
}
