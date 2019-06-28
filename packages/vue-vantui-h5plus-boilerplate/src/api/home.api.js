import Axios, { AxiosConfig } from '@/services/axios'

/**
 * 例子
 * 所有函数中应使用 new AxiosConfig() 来创建配置，并均应返回 Axios 的调用结果
 * @param {Object} data
 * @param {string} data.name
 * @param {number} data.age
 * @return {Promise<any>}
 * @example
 * 使用范例
 * const res = await homeDataApi({name:'Cphayim', age:18})
 */
export function homeDataApi(data) {
  return Axios(
    new AxiosConfig({
      url: '/v1/homedata',
      method: 'POST',
      data
    })
  )
}
