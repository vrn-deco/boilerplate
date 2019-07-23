import { RuntimeValid } from './platform'

// 音频临时存放目录
const TMP_AUDIO_DIR = '_tmp/audio/'

export class Recorder {
  #recorder = null
  #options = null

  constructor(options = {}) {
    this._initRecorder()
    this._initOptions()
  }

  /**
   * 初始化录音对象
   * @private
   */
  @RuntimeValid
  _initRecorder() {
    this.#recorder = window.plus.audio.getRecorder()
  }

  /**
   * 初始化配置对象
   * @private
   */
  _initOptions() {
    this.#options = {
      filename: `${TMP_AUDIO_DIR}${Date.now()}.amr`,
      format: 'amr' // iOS、Android 通用格式
    }
  }

  /**
   * 获取录音对象（调试用）
   * @returns
   */
  getR() {
    return this.#recorder
  }

  /**
   * 获取配置对象
   * @returns
   */
  getOptions() {
    return this.#options
  }

  start() {
    return new Promise((resolve, reject) => {
      this.#recorder.record(this.#options, resolve, reject)
    })
  }

  stop() {
    this.#recorder.stop()
  }
}

export default {
  Recorder
}
