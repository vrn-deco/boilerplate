/**
 *  title
 *
 *  useage
 *
 *  Author: aozhi
 *  CreatDate: 2019-04-03
 */
module.exports = {
    selectAddress: "SELECT title, address, apiName FROM study",
    insertUser: "INSERT INTO users (username, nickname, accessId) VALUES (?, ?, ?)",
    selectId: "SELECT LAST_INSERT_ID() as 'uid'",
    selectUsers: "SELECT id, accessId, nickname FROM users"
};
