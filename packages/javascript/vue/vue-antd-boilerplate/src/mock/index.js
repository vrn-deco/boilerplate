/*
 * @Author: Cphayim
 * @Date: 2020-07-27 23:42:53
 * @Description: Mock
 */
import Mock from 'mockjs'

require('./services/auth.mock')

require('./services/resource.mock')
require('./services/user.mock')

Mock.setup({
  timeout: '200-600',
})
console.log('[mock]: mock start!')
