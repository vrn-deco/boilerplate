/**
 * 控件配置类
 * @abstract 抽象类
 */
export class ControlData {
  constructor({ type, disabled = false, required = false }) {
    if (!type || typeof type !== 'string') {
      throw new TypeError(`Param 'type' is required and must be 'string'`)
    }
    this.type = type
    this.disabled = disabled
    this.required = required
  }
}
