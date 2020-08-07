/*
 * @Autor: yugeStrive
 * @Date: 2020-08-07 15:41:05
 * @LastEditTime: 2020-08-07 17:08:53
 * @Description: 定义全局localstorage字段管理仓库
 */
import { LocalStorageItem } from '@/utils/storage'

const tokenLSI = new LocalStorageItem({ fieldName: 'token' })

export class Auth {
    static token = tokenLSI.get()

    setToken(token) {
        this.token = token
        tokenLSI.set(token)
    }

    clearToken() {
        this.token = null
        tokenLSI.remove()
    }
}