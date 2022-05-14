/*
 * @Author: Cphayim
 * @Description: 服务接口和约定配置
 */

import { APP } from './app'

export const SERVER = {
  // 接口 base_url
  BASE_URL: import.meta.env.VITE_APP_SERVER_BASE_URL,

  /**
   * 注意事项：
   * 1.因后端返回的统一结构不同，你可能需要修改 @/types/server.ts 中的 ResponseBody 接口类型
   * 2.根据不同的 code 含义约定，你还需要修改 @/types/server.ts 中的 ResponseCode 枚举类型
   */

  // 拦截器的默认行为：
  // 在服务端返回 ResponseBody.code === RESPONSE_CODE.UNAUTHORIZED 时跳转的路由地址（比如登录页）
  // 可选，如果是空字符串将仅抛出异常，可在 catch 中处理
  UNAUTHORIZED_REDIRECT_PATH: APP.LOGIN_PATH,
}
