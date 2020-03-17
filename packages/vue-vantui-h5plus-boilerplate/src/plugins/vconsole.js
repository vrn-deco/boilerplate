/*
 * @Author: Cphayim
 * @Date: 2019-07-01 01:49:02
 * @LastEditTime: 2020-03-17 13:29:56
 * @Description: VConsole
 */

import VConsole from 'vconsole'
import config from '@/config'

if (process.env.NODE_ENV !== 'production' && config.VCONSOLE_ENABLE) {
  // eslint-disable-next-line no-new
  new VConsole()
}
