const login = require('../apiComponents/login')
const system = require('../apiComponents/system')

module.exports = (app) => {
  // 后端api路由
  app.use('/login', login)
  app.use('/system',system)
}
