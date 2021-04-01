const apiRouter = require('../api')

module.exports = (app) => {
  // 后端api路由
  Object.keys(apiRouter).forEach((item) => {
    app.use('/' + item, apiRouter[item])
  })
}
