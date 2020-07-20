/*
 * @Author: Cphayim
 * @Date: 2020-07-13 10:55:12
 * @LastEditTime: 2020-07-17 17:29:25
 * @Description:
 */
import { action, createReducer } from 'typesafe-actions'

import { Module } from '@/store/base'
import { LocalStorageItem } from '@/utils/storage'

// token storage 管理器
const tokenLSI = new LocalStorageItem({ fieldName: 'token' })

@Module({ name: 'global' })
class GlobalConstant {
  static readonly SET_TOKEN = 'SET_TOKEN'
  static readonly CLEAR_TOKEN = 'CLEAR_TOKEN'
}

class GlobalAction {
  // 设置 token
  static setToken = (token: string) => action(GlobalConstant.SET_TOKEN, token)
  // 清除 token
  static clearToken = () => action(GlobalConstant.CLEAR_TOKEN)
}

export type GlobalState = Readonly<{
  token: string | null
}>
const initialState: GlobalState = {
  // 从 storage 中获取 token
  token: tokenLSI.get(),
}

export class GlobalStore {
  static readonly action = GlobalAction

  static getReducer() {
    return (
      createReducer(initialState)
        // 处理设置 token
        .handleAction(GlobalConstant.SET_TOKEN, (state, { type, payload }) => ({
          ...state,
          token: payload,
        }))
        // 处理清除 token
        .handleAction(GlobalConstant.CLEAR_TOKEN, (state, { type }) => ({ ...state, token: null }))
    )
  }
}
