/*
 * @Author: Cphayim
 * @Date: 2019-08-21 16:20:40
 * @Description: 装饰器
 */

import { Exclude, Expose } from 'class-transformer'

/**
 * 在 jsonify 时排除属性，被装饰器的属性不会返回到前端
 *
 * 要求：全局需要设置 `ClassSerializerInterceptor` 拦截器
 * @typedef 属性装饰器
 */
export function ExcludeToJson(): PropertyDecorator {
  return Exclude({ toPlainOnly: true })
}

/**
 * 在 jsonify 前计算访问器的值并附加
 *
 * 要求：全局需要设置 `ClassSerializerInterceptor` 拦截器
 * @typedef 访问器装饰器
 */
export function ComputedToJson(): PropertyDecorator {
  return Expose()
}

/**
 * 文件接收器
 *
 * 接收文件（multipart/form-data）
 * @typedef 方法装饰器
 */
// export function FileReceiver(fileFiled = 'file') {
//   return UseInterceptors(FileInterceptor(fileFiled))
// }

/**
 * 文件列表接收器
 *
 * 接收文件数组（multipart/form-data）
 * @typedef 方法装饰器
 */
// export function FileListReceiver(fileListFiled = 'files') {
//   return UseInterceptors(FilesInterceptor(fileListFiled))
// }

export function RequestDTO(): ClassDecorator {
  return () => {
    //
  }
}

export function ResponseDTO(): ClassDecorator {
  return () => {
    //
  }
}
