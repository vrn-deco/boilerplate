/*
 * @Autor: yugeStrive
 * @Date: 2020-08-07 13:42:03
 * @LastEditTime: 2020-08-07 14:35:01
 * @Description: webSocket
 */

export default class Socket {
  url = ''
  ws = null
  receiveCallbacks = []

  /**
   * @param {string} url
   * @memberof Socket
   */
  constructor(url) {
    if (!url) {
      throw new TypeError('new Socket url 参数必须是一个有效的 url 字符串')
    }
    this.url = url
  }

  /**
   * 发起连接
   */
  connect(openedHandler = (event) => {}) {
    // 一个实例只能够调用一次 connect 方法
    if (this.ws) return this
    if (typeof openedHandler !== 'function') {
      throw new TypeError('socket.connect openedHandler 参数必须是一个回调函数')
    }
    this.ws = new WebSocket(this.url)
    this.ws.addEventListener('open', openedHandler)
    this.ws.addEventListener('message', this._receive.bind(this))
    return this
  }

  /**
   * 关闭连接
   */
  close(closedHandler = (event) => {}) {
    if (!this.ws) return this
    if (typeof closedHandler !== 'function') {
      throw new TypeError('socket.close closedHandle 参数必须是一个回调函数')
    }
    this.ws.addEventListener('close', closedHandler)
    this.ws.close()
    return this
  }

  /**
   * 发送消息
   * @param {string | Object} data
   */
  send(data) {
    if (!this.ws || !this._isOpenState()) return this
    if (!data) {
      throw new TypeError(`socket.send data 参数必须是一个字符串或对象`)
    }
    if (typeof data === 'object') {
      data = JSON.stringify(data)
    }
    this.ws.send(data)
    return this
  }

  /**
   * 接收消息
   */
  _receive(e) {
    let data = e.data
    try {
      // 尝试解析，如果解析失败，当做字符串传递给处理器
      data = JSON.parse(data)
    } catch (error) {}
    this.receiveCallbacks.forEach((cb) => cb(data))
  }

  /**
   * 添加接收处理器
   */
  addReceiveHandler(receiveCallback = () => {}) {
    if (typeof receiveCallback !== 'function') {
      throw new TypeError(`socket.addReceiveHandler recevieHandler 参数必须是一个回调函数`)
    }
    this.receiveCallbacks.push(receiveCallback)
    return this
  }

  /**
   * 判断是否是开启状态
   */
  _isOpenState() {
    let isOpen = false
    switch (this.ws?.readyState) {
      case WebSocket.CONNECTING:
        break
      case WebSocket.OPEN:
        isOpen = true
        break
      case WebSocket.CLOSING:
        break
      case WebSocket.CLOSED:
        break
      default:
        break
    }
    return isOpen
  }
}
