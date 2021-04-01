/*
 * @Author: Cphayim
 * @Date: 2020-06-05 14:45:17
 * @LastEditTime: 2020-06-05 14:57:29
 * @Description:
 */
export class ResponseBody {
  constructor({ code = 0, msg = 'OK', data } = {}) {
    this.code = code
    this.msg = msg
    this.data = data
  }
}
