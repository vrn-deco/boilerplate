interface StorageItemFields {
  readonly fieldName: string
  readonly jsonify?: boolean
  readonly b64?: boolean
  readonly storage?: Storage
}

class StorageItem<T> implements StorageItemFields {
  readonly fieldName: string
  readonly jsonify: boolean
  readonly b64: boolean
  readonly storage: Storage

  constructor({
    fieldName,
    jsonify = false,
    b64 = false,
    storage = localStorage,
  }: StorageItemFields) {
    this.fieldName = fieldName
    this.jsonify = jsonify
    this.b64 = b64
    this.storage = storage
  }

  get() {
    let value = this.storage.getItem(this.fieldName)
    if (!value) return null

    if (this.b64) {
      value = this._b64Decode(value)
    }
    if (this.jsonify) {
      value = this._jsonDecode(value)
    }
    return value
  }

  set(value: any) {
    if (this.jsonify) {
      value = this._jsonEncode(value)
    }
    if (this.b64) {
      value = this._b64Encode(value)
    }
    this.storage.setItem(this.fieldName, value)
  }

  remove() {
    this.storage.removeItem(this.fieldName)
  }

  _jsonEncode(v: string) {
    return JSON.stringify(v)
  }
  _jsonDecode(v: any) {
    return JSON.parse(v)
  }
  _b64Encode(v: string) {
    return btoa(v).replace(/=/g, '').split('').reverse().join()
  }
  _b64Decode(v: string) {
    return atob(v.split('').reverse().join())
  }
}

/**
 * 创建一个对单个字段的 localStorage 管理器
 */
export class LocalStorageItem<T> extends StorageItem<T> {
  constructor({ fieldName, jsonify = false, b64 = false }: StorageItemFields) {
    super({ fieldName, jsonify, b64, storage: localStorage })
  }
}

/**
 * 创建一个对单个字段的 sessionStorage 管理器
 */
export class SessionStorageItem<T> extends StorageItem<T> {
  constructor({ fieldName, jsonify = false, b64 = false }: StorageItemFields) {
    super({ fieldName, jsonify, b64, storage: sessionStorage })
  }
}
