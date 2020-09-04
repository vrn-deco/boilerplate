/*
 * @Author: benaozhi
 * @Date: 2020-07-30 15:43:57
 * @LastEditTime: 2020-07-30 16:03:32
 * @Description:
 */
// code 对应的字段名，上例就是 'code'
export const RESPONSE_CODE_FILED = 'code'
// message 对应的字段名，上例就是 'msg'
export const RESPONSE_MESSAGE_FILED = 'msg'
// data 对应的字段名，上例就是 'data'
export const RESPONSE_DATA_FILED = 'data'
// 几种特定需要前端处理的 code 值（将在 axios 基础服务中自动处理，其余将抛出异常，可在 catch 中处理）
export const RESPONSE_CODE = {
  OK: 0, // ok
  UNAUTHORIZED: 401, // token 过期
  SERVER_ERROR: 500, // 服务端错误
  MAINTENANCE: 503, // 系统维护中
}
