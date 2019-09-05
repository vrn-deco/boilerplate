/**
 *  title
 *
 *  useage
 *
 *  Author: aozhi
 *  CreatDate: 2019-04-03
 */
const express = require('express');
const router = express.Router();
const api = require('./api');

router.post('/test', (req, res, next) => {
    api.test(req, res, next);
});

module.exports = router;
