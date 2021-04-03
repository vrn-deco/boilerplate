/*
 * @Author: Cphayim
 * @Date: 2020-06-05 14:30:37
 * @LastEditTime: 2020-06-05 14:32:42
 * @Description:
 */
import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({
    code: 0,
    msg: '123',
    data: 'user',
  })
})

export default router
