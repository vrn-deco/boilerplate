/*
 * @Author: Cphayim
 * @Date: 2020-07-06 10:27:19
 * @LastEditTime: 2020-07-06 10:30:43
 * @Description:
 */

export function getArgByEnvOrBlock(field) {
  if(return process.env.NODE_ENV[field]){
    return process.env.NODE_ENV[field]
  }else {
    throw new ReferenceError(`找不到环境变量 ${field}, 请检查 env 文件或 CI 环境变量设置`)
  }
}
