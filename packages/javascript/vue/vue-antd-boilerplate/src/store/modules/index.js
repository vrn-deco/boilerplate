/*
 * @Author: Cphayim
 * @Date: 2020-01-03 18:14:45
 * @Description: 导出所有 store 模块
 */

// 公共模块
export { default as auth } from './auth.store'
export { default as permission } from './permission.store'

// 业务模块
// 系统管理
export { default as resource } from '@/views/system/stores/resource.store'
export { default as user } from '@/views/system/stores/user.store'
