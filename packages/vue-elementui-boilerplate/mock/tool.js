/*
 * @Author: benaozhi
 * @Date: 2020-08-03 18:45:15
 * @LastEditTime: 2020-10-21 14:51:43
 * @Description: response body
 */
import config from '@/config'

export function genResBody(data, code = config.SERVICES.RESPONSE_CODE.OK, message = 'OK') {
  return {
    [config.SERVICES.RESPONSE_CODE_FILED]: code,
    [config.SERVICES.RESPONSE_MESSAGE_FILED]: message,
    [config.SERVICES.RESPONSE_DATA_FILED]: data,
  }
}
