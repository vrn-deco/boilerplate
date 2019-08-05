/**
 *  title
 *
 *  useage
 *
 *  Author: aozhi
 *  CreatDate: 2019-04-10
 */
const pool = require('../system/db.js');
const sqlMap = require('./sqlMap');
const util = require('../util/util');
const moment = require('moment');

module.exports = {
    isToken(auth){
        "use strict";
        return new Promise((resolve,reject)=>{
            pool.getConnection((err, connection) => {
                let token = util.Headers(auth);
                connection.query(sqlMap.isToken,[token],(err, result) =>{
                    if(err){
                        reject(err);
                    }else{
                        let now = moment();
                        if(result.length > 0){
                            let ti1 = moment(result[0].ti).add(2,'h');
                            let isDate = ti1.isAfter(now);
                            if(isDate){
                                resolve(result[0].id);
                            }else{
                                connection.query(sqlMap.delToken,[token],(err, result) => {
                                    if(err){
                                        reject(err);
                                    }else{
                                        //删除失败
                                        resolve(-1);
                                    }
                                });
                            }
                        }else{
                            //无token，无效令牌
                            resolve(-2);
                        }
                    }
                    connection.release();
                })
            });
        })
    }
};
