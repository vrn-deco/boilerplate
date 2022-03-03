/*
 * @Author: Cphayim
 * @Description: 服务接口类型
 */

// 响应体
export interface ResponseBody<T = unknown> {
  code: number
  message: string
  data: T
}

// 响应 code 枚举
export enum ResponseCode {
  // 通用 code
  OK = 0, // 成功
  BAD_PARAMS = 400, // 参数错误
  UNAUTHORIZED = 401, // token 失效
  FORBIDDEN = 403, // 拒绝访问（没有权限）
  NOT_FOUND = 404, // 没有该资源
  SERVER_ERROR = 500, // 服务端错误
  MAINTENANCE = 503, // 系统维护中
  // 业务 code
  // ...
}
