/**
 *  title
 *
 *  useage
 *
 *  Author: aozhi
 *  CreatDate: 2019-04-03
 */

const pool = require('../../system/db.js');
const sqlMap = require('./sqlMap');
const util = require('../../util/util');
const services = require('../../services')
module.exports = {
    list(req, res, next){
        "use strict";
        let pageSize = req.body.pageSize
        let currentPage = (req.body.currentPage - 1 ) * pageSize
        let json = {}
        pool.getConnection((err, connection) => {
            services.isToken(req.headers.authorization).then((data) => {
                new util.Err().isTokenDue(res, data, () => {
                    connection.query(sqlMap.list,[currentPage, pageSize], (err, result) => {
                        new util.Err().isErr(res, err, () => {
                            connection.query(sqlMap.listTotal,[currentPage, pageSize], (err, result1) => {
                                new util.Err().isErr(res, err, () => {
                                    json.data = result
                                    if(result1.length === 0){
                                        json.total = 0
                                    }else{
                                        json.total = result1[0].total
                                    }
                                    res.json(util.setResult(json,10001))
                                })
                            })
                        })
                    })
                    connection.release();
                })
            });

        })
    },
    addInfo(req,res,next){
        let title = req.body.title
        let address = req.body.address
        let apiName = req.body.apiName
        pool.getConnection((err, connection) => {
            services.isToken(req.headers.authorization).then((data) => {
                connection.query(sqlMap.addInfo,[title, address, apiName], (err,result) => {
                    new util.Err().isErr(res, err, () => {
                        res.json(util.setResult("success", 10001, "success"))
                    })
                })
                connection.release();
            })
        })
    },
    delInfo(req,res,next){
        let id = req.body.id
        pool.getConnection((err, connection) => {
            services.isToken(req.headers.authorization).then((data) => {
                connection.query(sqlMap.delInfo,[id], (err,result) => {
                    new util.Err().isErr(res, err, () => {
                        res.json(util.setResult("success", 10001, "success"))
                    })
                })
                connection.release();
            })
        })
    },
    updateInfo(req,res,next){
        let id = req.body.id
        let title = req.body.title
        let address = req.body.address
        let apiName = req.body.apiName
        pool.getConnection((err, connection) => {
            services.isToken(req.headers.authorization).then((data) => {
                connection.query(sqlMap.updateInfo,[title, address, apiName, id], (err,result) => {
                    new util.Err().isErr(res, err, () => {
                        res.json(util.setResult("success", 10001, "success"))
                    })
                })
                connection.release();
            })
        })
    },
};
