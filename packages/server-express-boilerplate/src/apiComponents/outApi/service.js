/*
 * @Author: benaozhi
 * @Date: 2019-07-27 16:59:20
 * @LastEditTime: 2019-07-27 17:16:03
 * @Description:
 */
const axios from 'axios'

exports.getDetail = class getDetail {
  constructor(url,data = {}){
    return axios.post(url, data)
  }
};
