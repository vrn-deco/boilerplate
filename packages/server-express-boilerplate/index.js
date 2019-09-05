/**
 *  title
 *
 *  useage
 *
 *  Author: aozhi
 *  CreatDate: 2019-04-03
 */
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // post 数据是需要
const Path = require('path');
const router = require('./src/router')
const interceptor = require('./src/system/Interceptor')
const config = require('./public/config')

//设置静态服务
app.use(express.static(Path.join(Path.resolve(),"static")));
app.use(bodyParser.json());
interceptor(app);
router(app);

// 监听端口
app.listen(config.nodePort);
console.log('success listen at port:' + config.nodePort + '......');
