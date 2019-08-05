/*
 * @Author: benaozhi
 * @Date: 2019-07-22 00:28:54
 * @LastEditTime: 2019-07-27 12:17:35
 * @Description: sql语句
 */

module.exports = {
    list: "SELECT id,title,address,apiName,time FROM study ORDER BY id ASC LIMIT ?,?",
    listTotal: "SELECT COUNT(id) as 'total' FROM study ORDER BY id ASC LIMIT ?,?",
    addInfo: "INSERT INTO study (title,address,apiName) VALUES (?, ?, ?)",
    delInfo: "DELETE FROM study WHERE id = ?",
    updateInfo: "UPDATE study SET title = ?, address = ?, apiName = ? WHERE id = ?"
};
