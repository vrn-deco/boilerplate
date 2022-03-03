class StorageItem {
  constructor({ fieldName, jsonify = false, b64 = false, storage = localStorage }) {
    this.fieldName = fieldName
    this.jsonify = jsonify
    this.b64 = b64
    this.storage = storage
  }

  get() {
    let value = this.storage.getItem(this.fieldName)
    if (this.b64) {
      value = this._b64Decode(value)
    }
    if (this.jsonify) {
      value = this._jsonDecode(value)
    }
    return value
  }

  set(value) {
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

  _jsonEncode(v) {
    return this.jsonify ? JSON.stringify(v) : v
  }
  _jsonDecode(v) {
    return this.jsonify ? JSON.parse(v) : v
  }
  _b64Encode(v) {
    return btoa(v).replace(/=/g, '').split('').reverse().join()
  }
  _b64Decode(v) {
    return atob(v.split('').reverse().join())
  }
}
/**
 * 创建一个对单个字段的 localStorage 管理器
 */
export class LocalStorageItem extends StorageItem {
  constructor({ fieldName, jsonify = false, b64 = false }) {
    super({ fieldName, jsonify, b64, storage: localStorage })
  }
}

/**
 * 创建一个对单个字段的 sessionStorage 管理器
 */
export class SessionStorageItem extends StorageItem {
  constructor({ fieldName, jsonify = false, b64 = false }) {
    super({ fieldName, jsonify, b64, storage: sessionStorage })
  }
}
