/*
 * @Author: Cphayim
 * @Date: 2020-06-05 13:56:17
 * @LastEditTime: 2020-06-05 14:32:26
 * @Description:
 */

import path from 'path'
import fs from 'fs'

export async function registerRouter(app) {
  const routeFiles = fs.readdirSync(__dirname).filter((file) => /\.route\.js$/.test(file))

  const routes = await Promise.all(
    routeFiles.map(async (file) => {
      return {
        name: file.split('.')[0],
        module: (await import(path.join(__dirname, file))).default,
      }
    })
  )
  routes.forEach((item) => {
    if (typeof item.module !== 'function') return
    app.use(`/${item.name}`, item.module)
  })
}
