/*
 * @Author: Cphayim
 * @Date: 2020-06-05 13:51:44
 * @LastEditTime: 2020-06-05 14:01:25
 * @Description:
 */
import express from 'express'
import { Logger } from '@naughty/logger'
import { registerMiddleware } from './middleware'
import { registerRouter } from './router'

const app = express()

registerMiddleware(app)
registerRouter(app)

app.listen(3000, () => Logger.info('Server is ruining'))
