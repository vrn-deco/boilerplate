const cors = require('cors');
const errHandle = require('./response');

module.exports = (app) => {
  app.use(cors({
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST'],
    alloweHeaders: ['Conten-Type', 'Authorization'],
    credentials: true    // 是否带cookie
  }));
  /**
 * 自定义错误拦截
 */
  app.use(function(err, req, res, next) {
    // console.error(err)
    // TODO: 做日志记录。。。

    // 如果抛出的异常不是自定义异常的子类，返回 ServerError
    const response = err instanceof errHandle.HTTPResponse ? err : "";
    res.status(response.$httpStatus).json(response)
  })
}
