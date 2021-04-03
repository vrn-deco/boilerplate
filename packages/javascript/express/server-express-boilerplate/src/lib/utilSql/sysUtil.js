/*
 * @Author: benaozhi
 * @Date: 2019-08-08 18:07:52
 * @LastEditTime: 2019-08-17 16:07:44
 * @Description: sql查询方法
 * @Exports { createPool, createConn }
 */
const pool = require('../../system/db');
const { setResult } = require('../../util/util');

/**
 * 创建连接池
 */
const createPool = () => {
  return new Promise((reslove, reject) => {
    pool.getConnection((err, connection) => {
      if(err){
        reject(err)
      }else{
        reslove(connection)
      }
    })
  })
}

/**
 * 创建连接
 * @param {Connection} conn
 * @param {String} sql
 * @param {Array} dataArr
 */
const createConn = (res, conn, sql, dataArr) => {
  return new Promise((reslove, reject) => {
    conn.query(sql, dataArr, (err, result) => {
      if(err){
        res.json(setResult("",10002));
        console.log(err);
        reject(err)
      }else{
        reslove(result)
      }
    })
  })
}

module.exports = { createPool, createConn }
