/*
 * @Author: Cphayim
 * @Date: 2020-07-20 20:48:19
 * @LastEditTime: 2020-07-20 20:57:03
 * @Description:
 */
export enum TodoState {
  UNFINISHED = 0,
  FINISHED = 1,
}

export interface Todo {
  // id
  id?: number
  // 内容
  content: string
  // 状态
  state: TodoState
}
