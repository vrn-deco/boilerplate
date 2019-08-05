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
const uuid = require('node-uuid');
const md5 = require('js-md5')
module.exports = {
    login(req, res, next) {
        let username = req.body.username;
        let password = req.body.password;
        pool.getConnection((err, connection) => {
            connection.query(sqlMap.loginAuthentication, [username, password], (err, result) => {
                if(err){
                    res.json(util.setResult("",10002));
                }else{
                    if(result.length !== 0){
                        res.json(util.setResult(result[0],10001));
                    }else{
                        res.json(util.setResult("用户名或密码错误",10010,"用户名或密码错误"));
                    }
                }
                connection.release();
            })
        })
    },
    setPassword(req, res, next){
        "use strict";
        let uid = req.body.uid
        let passwordInit = req.body.passwordInit
        let password = req.body.password
        pool.getConnection((err, connection) => {
            connection.query(sqlMap.selectUser,[uid, passwordInit], (err, result) => {
                new util.Err().isErr(res, err, () => {
                    if(result.length !== 0){
                        connection.query(sqlMap.updatePassWord,[password, uid], (err, result1) => {
                            new util.Err().isErr(res, err, () => {
                                res.json(util.setResult("success",10001))
                            })
                        })
                    }else{
                        res.json(util.setResult("原密码错误",10010,"原密码错误"))
                    }
                })
            })
        })
    },
    systemLogin(req,res,next){
        let username = req.body.username
        let password = req.body.password
        let userInfo = {
            username: "nt_admin",
            password: "netintech"
        }
        pool.getConnection((err,connection) => {
            if(username === userInfo.username && md5(password) === md5(userInfo.password)){
                let token = uuid.v4()
                connection.query(sqlMap.insertToken,[token], (err, result) => {
                    new util.Err().isErr(res,err, () => {
                        let resJson = {token: token}
                        res.json(util.setResult(resJson,10001))
                    })
                })
                connection.release();
            }else{
                res.json(util.setResult("登录失败",10002,"登录失败"))
            }
        })
    }
};
