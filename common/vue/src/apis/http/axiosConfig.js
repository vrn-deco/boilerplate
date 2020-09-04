/*
 * @Author: benaozhi
 * @Date: 2020-09-04 14:49:35
 * @LastEditTime: 2020-09-04 14:49:52
 * @Description:
 */
import config from '@/config'

export class AxiosConfig {
  /**
   * @param {Object} options
   * @param {string} [options.baseURL] 协议+主机名+端口号，不传递将取当前环境（开发/生产）配置下的 BASE_URL
   * @param {string} options.url 请求路径
   * @param {Object} [options.data = {}] 请求数据
   * @param {Object} [options.headers = {}] 请求头
   * @param {string} [options.responseType = 'json'] 服务端返回的数据类型，默认为 json
   */
  constructor({
    baseURL,
    url,
    method = 'GET',
    data = {},
    headers = {},
    responseType = 'json',
  } = {}) {
    if (!url) {
      throw new RangeError('缺少 url 参数')
    }
    // 如果没有传入 baseURL 使用 GLOBAL_CONFIG 对应当前环境的 DEFAULT 配置
    this.baseURL = baseURL || config.BASE_URL
    this.url = url
    this.method = method
    this.headers = headers
    if (this.method === 'GET') {
      this.params = data
    } else {
      this.data = data
    }
    this.responseType = responseType
  }
}
