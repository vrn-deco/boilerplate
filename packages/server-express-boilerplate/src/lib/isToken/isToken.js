/*
 * @Author: benaozhi
 * @Date: 2019-06-14 22:04:26
 * @LastEditTime: 2019-08-16 15:52:34
 * @Description: 判断Token
 * @Exports { isToken }
 */

const moment = require('moment');
const sqlMap = require('./sqlMap');
const { Headers, setResult } = require('../../util/util');
const { CreateSql } = require('../../lib/utilSql')

/**
 * 判断token是否有效
 * @param {*} res
 * @param {*} auth req.headers.authorization
 */
const isToken = (res, auth) => {
    return new Promise(async (resolve, reject) => {
        let querySql = new CreateSql(res)
        let token = Headers(auth)
        let result = await querySql.executeSql(sqlMap.isToken, [token])
        let now = moment()
        if(result.length > 0) {
            let isDate = moment(result[0].ti).add(2,'h').isAfter(now);
            if(isDate) {
                resolve(result[0].id);
            } else {
                //删除失败
                await querySql.executeSql(sqlMap.delToken, [token])
                res.json(setResult("",10004));
                resolve(-1);
            }
        } else {
            //无token，无效令牌
            res.json(setResult("无效令牌",10004,"无效令牌"))
            resolve(-2);
        }
    })
}

module.exports = { isToken };
