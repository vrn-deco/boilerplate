/*
 * @Autor: yugeStrive
 * @Date: 2020-07-24 15:15:34
 * @LastEditTime: 2020-08-17 16:30:11
 * @Description: mockjs
 */

import Mock from 'mockjs'

Mock.mock('/mock', 'post', function (req) {
  return resBody(
    Mock.mock({
      'userInfo|4': [
        {
          //生成四个如下格式的数据
          id: 1, //数字从1开始，后续依次加1
          name: '@cname', //名字为随机中文名
          age: 25, //年龄是18-28之间的随机数
          sex: ['男', '女'], //性别是数组里的随机一项
        },
      ],
    })
  )
})

function resBody(data) {
  return {
    code: 0,
    msg: '请求成功',
    data,
  }
}
