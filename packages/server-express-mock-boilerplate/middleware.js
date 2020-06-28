/*
 * @Author: Cphayim
 * @Date: 2020-06-05 13:55:16
 * @LastEditTime: 2020-06-05 14:43:19
 * @Description:
 */
import bodyParser from 'body-parser'
import morgan from 'morgan'

export function registerMiddleware(app) {
  app.use(morgan('short'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
}
