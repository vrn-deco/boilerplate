/*
 * @Author: benaozhi
 * @Date: 2019-08-10 00:33:44
 * @LastEditTime: 2019-08-17 15:47:57
 * @Description:
 */

const sqlMap = require('./sqlMap');
const { CreateSql } = require('../../lib/utilSql');
const { setResult, Headers } = require('../../util/util')

let api = {
    async test(req, res, next) {
        let isOpen = req.body.isOpen
        let querySql = new CreateSql(res)
        // let uid = await isToken(res, req.headers.authorization)//获取用户id
        let result = await querySql.executeSql(sqlMap.testSql, [isOpen])
        res.json(setResult(result,10001))
        //关闭连接
        querySql.closeConn()
    }
}

module.exports = api
