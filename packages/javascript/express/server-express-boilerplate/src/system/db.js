/*
 * @Author: benaozhi
 * @Date: 2019-06-19 16:19:51
 * @LastEditTime: 2019-08-17 16:22:25
 * @Description: 数据库信息
 */

// 数据库连接配置
const mysql = require('mysql');
const db = { config } = require('../../public/config').dev;
module.exports = mysql.createPool({
    host: db.host,  // 新建数据库连接时的 主机名或ID地址 内容
    user: db.user,
    password: db.password, // root 密码
    database: db.database, // 数据库名
    port: db.port,
    multipleStatements: true    // 多语句查询
});
