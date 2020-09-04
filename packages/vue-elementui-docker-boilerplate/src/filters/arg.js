
/*
 * @Author: Cphayim
 * @Date: 2019-09-29 13:59:27
 * @LastEditTime: 2019-09-29 14:01:21
 * @Description: 税率配置
 */
export const arg = Vue => {
// 这里注册模块过滤器
  Vue.filter('optionTypeFil', optionTypeFil)
}
// 税率配置操作
function optionTypeFil(val) {
  return ['', '新增', '修改', '删除'][val]
}
