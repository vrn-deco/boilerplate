/*
 * @Author: benaozhi
 * @Date: 2019-07-27 15:32:43
 * @LastEditTime: 2019-07-27 17:48:53
 * @Description:
 */
const pool = require('../../system/db.js');
const sqlMap = require('./sqlMap');
const util = require('../../util/util');
const uuid = require('node-uuid');
const md5 = require('js-md5')
const { getDetail } = require('./service')
const axios = require('axios')

module.exports = {
  newFrontEnd(req, res, next){
    let name = req.body.name
    let accessId = req.body.accessId
    pool.getConnection((err, connection) => {
      connection.query(sqlMap.insertUser, [name, name, accessId], (err) => {
        new util.Err().isErr(res, err, () => {
          connection.query(sqlMap.selectId,[], (err, result1) => {
            new util.Err().isErr(res, err, () => {
              connection.query(sqlMap.selectAddress,[], (err, result)=>{
                new util.Err().isErr(res, err, () => {
                  let arr = [];
                  for(let i = 0; i < result.length; i++){
                    let path = result[i].address + result[i].apiName
                    let data = {uid: result1[0].uid, nickname: name, accessId: accessId}
                    arr.push(new getDetail(path,data))
                  }
                  axios.all(arr).then(axios.spread(function (acct, perms) {
                    // 两个请求现在都执行完成
                  }));
                })
              })
            })
          })
        })
      })
    })
  }
};
