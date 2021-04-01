/*
 * @Author: benaozhi
 * @Date: 2019-08-10 01:36:29
 * @LastEditTime: 2019-08-17 16:10:10
 * @Description: 数据库查询工具
 * @Exports { CreateSql }
 */
const { createPool, createConn } = require('./sysUtil')

class CreateSql{
  num = 0
  connection = null
  constructor(res){
    this.res = res
  }
  executeSql (sql, dataArr = []) {
    return new Promise(async (reslove, reject) => {
      if(this.num <= 0){
        this.connection = await createPool()
        let result = await createConn(this.res, this.connection, sql, dataArr)
        reslove(result)
      } else {
        let result = await createConn(this.res, this.connection, sql, dataArr)
        reslove(result)
      }
    })
  }
  closeConn () {
    this.connection.release()
  }
}

module.exports = { CreateSql }
