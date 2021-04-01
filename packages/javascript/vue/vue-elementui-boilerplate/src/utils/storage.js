class StorageItem {
  constructor({ fieldName, jsonify = false }) {
    this.fieldName = fieldName
    this.jsonify = jsonify
  }
}
/**
 * 创建一个对单个字段的 localStorage 管理器
 */
export class LocalStorageItem extends StorageItem {
  get() {
    const v = localStorage.getItem(this.fieldName)
    return this.jsonify ? JSON.parse(v) : v
  }
  set(v) {
    v = this.jsonify ? JSON.stringify(v) : v
    localStorage.setItem(this.fieldName, v)
  }
  remove() {
    localStorage.removeItem(this.fieldName)
  }
}

/**
 * 创建一个对单个字段的 sessionStorage 管理器
 */
export class SessionStorageItem extends StorageItem {
  get() {
    const v = sessionStorage.getItem(this.fieldName)
    return this.jsonify ? JSON.parse(v) : v
  }
  set(v) {
    v = this.jsonify ? JSON.stringify(v) : v
    sessionStorage.setItem(this.fieldName, v)
  }
  remove() {
    sessionStorage.removeItem(this.fieldName)
  }
}
