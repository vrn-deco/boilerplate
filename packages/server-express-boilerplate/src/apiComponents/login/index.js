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

router.post('/login', (req, res, next) => {
    api.login(req, res, next);
});

router.post('/setPassword', (req, res, next) => {
    api.setPassword(req, res, next);
});
router.post('/systemLogin', (req, res, next) => {
    api.systemLogin(req, res, next);
});

module.exports = router;
