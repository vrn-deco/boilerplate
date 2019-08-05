/**
 *  title
 *
 *  useage
 *
 *  Author: aozhi
 *  CreatDate: 2019-04-03
 */
module.exports = {
    loginAuthentication:"SELECT id,nickname,accessId FROM `users` WHERE username = ? AND password = ? AND isOpen = 0",
    selectUser:"SELECT id FROM `users` WHERE id = ? AND password = ?",
    updatePassWord: "UPDATE users SET `password` = ? WHERE id = ?",
    insertToken: "INSERT INTO token (token) VALUES (?)"
};
