/*
 * @Author: benaozhi
 * @Date: 2019-07-22 00:28:54
 * @LastEditTime: 2019-07-23 00:20:40
 * @Description: router
 */

const express = require('express');
const router = express.Router();
const api = require('./api');

router.post('/list', (req, res, next) => {
    api.list(req, res, next);
});

router.post('/addInfo', (req, res, next) => {
    api.addInfo(req, res, next);
});

router.post('/delInfo', (req, res, next) => {
    api.delInfo(req, res, next);
});

router.post('/updateInfo', (req, res, next) => {
    api.updateInfo(req, res, next);
});

module.exports = router;
