/*
 * @Author: Cphayim
 * @Date: 2019-07-01 01:49:02
 * @Description: VConsole
 */

import VConsole from 'vconsole'
import config from '@/config'

if (process.env.NODE_ENV !== 'production' && config.ENVS.VCONSOLE_ENABLE) {
  // eslint-disable-next-line no-new
  new VConsole()
}
