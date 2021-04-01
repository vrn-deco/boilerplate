const axios = require('axios')
const { config } = require('../../system/config')

const api = ({url, method = 'POST', data}) => {
  return new Promise((resolve, reject) => {
    if(url) {
      if(method === 'POST'){
        axios.post(config.appCode + url, data).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(err)
        })
      } else {
        axios.get(config.appCode + url, data).then((res) => {
          resolve(res.data)
        }).catch((err) => {
          reject(err)
        })
      }
    } else {
      throw new RangeError('缺少 url 参数')
    }
  })
}

module.exports = { api }
