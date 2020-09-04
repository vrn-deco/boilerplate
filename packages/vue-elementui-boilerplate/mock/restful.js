/*
 * @Author: benaozhi
 * @Date: 2020-08-03 18:45:15
 * @LastEditTime: 2020-08-19 18:00:59
 * @Description:
 */
import config from '@/config'

export class Restful {
  static setResult(data, code, desc) {
    return {
      [config.RESPONSE_CODE_FILED]: code || config.RESPONSE_CODE.OK,
      [config.RESPONSE_MESSAGE_FILED]: desc || 'success',
      [config.RESPONSE_DATA_FILED]: data
    }
  }
}
