/*
 * @Author: Cphayim
 * @Date: 2019-07-01 01:49:02
 * @LastEditTime: 2019-07-01 01:50:53
 * @Description: VConsole
 */

import VConsole from 'vconsole'

if(process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line no-new
  new VConsole()
}
