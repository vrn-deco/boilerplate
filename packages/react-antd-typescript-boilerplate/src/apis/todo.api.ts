/*
 * @Author: Cphayim
 * @Date: 2020-07-16 10:58:15
 * @LastEditTime: 2020-07-20 21:03:48
 * @Description: 用户模块数据接口
 */
import { safeFetch } from './http'
import { ResBody } from '@/models/res-body'
import { Todo, TodoState } from '@/models/todo'

export async function getAll(): Promise<Todo[]> {
  const response = await safeFetch.get<ResBody<Todo[]>>('/v1/todo/')
  const todos: Todo[] = response.data.data
  return todos
}

export async function add(content: string): Promise<Todo> {
  const response = await safeFetch.post<ResBody<Todo>>('/v1/todo/add', { content })
  const resBody: ResBody<Todo> = response.data
  const todo: Todo = resBody.data
  return todo
}

export async function setState(id: number, state: TodoState): Promise<Todo> {
  const response = await safeFetch.post<ResBody<Todo>>('/v1/todo/state', { id, state })
  const resBody: ResBody<Todo> = response.data
  const todo: Todo = resBody.data
  return todo
}

export async function remove(id: number): Promise<void> {
  await safeFetch.post<ResBody<void>>('/v1/todo/del', { id })
}
