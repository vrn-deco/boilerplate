/*
 * @Author: Cphayim
 * @Date: 2019-06-11 17:06:51
 * @LastEditTime: 2019-06-12 00:43:09
 * @Description: 响应结构
 */
exports.HTTPResponse = class HTTPResponse {
  // httpStatus 仅用于设置 HTTP状态码，不在响应体 json 返回中显示
  $httpStatus = 500
  constructor({ httpStatus = 500, code = 999, message = 'Server Error o(╯□╰)o' } = {}) {
    this.$httpStatus = httpStatus
    this.code = code
    this.message = message
    this.timestamp = ~~(Date.now() / 1000)
  }
  get httpStatus() {
    return this.$httpStatus
  }
}

// TODO: 补充其他
