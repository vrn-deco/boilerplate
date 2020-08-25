/*
 * @Autor: yugeStrive
 * @Date: 2020-07-08 09:48:04
 * @LastEditTime: 2020-07-13 15:09:11
 * @Description: 定义接口
 */

// import Md5 from 'js-md5'
// import Base64 from 'base-64'
import Axios, { AxiosConfig } from './services/axios'

export function login(data) {
  // 具体加密规则，按照前后端约定来设置加密
  // data.password = Md5(Base64(data.password))
  return Axios(
    new AxiosConfig({
      url: '/login/login',
      method: 'POST',
      data,
    })
  )
}
