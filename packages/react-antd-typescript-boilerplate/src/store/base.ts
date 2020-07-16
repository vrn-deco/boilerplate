/*
 * @Author: Cphayim
 * @Date: 2020-07-13 11:14:43
 * @LastEditTime: 2020-07-16 00:45:28
 * @Description: store 模块基础工具
 */

/**
 * Start: Constant 命名空间类装饰器
 */
interface ModuleOptions {
  readonly name: string
  readonly splitWord?: string
}

export function Module({ name, splitWord = '/' }: ModuleOptions): ClassDecorator {
  return (t: any) => {
    // 'SET_USER_INFO' => 'user/SET_USER_INFO'
    Object.keys(t).forEach((k) => (t[k] = `@@${name}${splitWord}${t[k]}`))
    return t
  }
}
/**
 * End: Constant 命名空间类装饰器
 */
