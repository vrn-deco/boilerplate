/**
 *  title
 *
 *  useage
 *
 *  Author: aozhi
 *  CreatDate: 2019-04-10
 */
module.exports = {
    isToken: "SELECT time as ti FROM token WHERE token = ?",
    delToken: "DELETE FROM token WHERE token = ?"
};
