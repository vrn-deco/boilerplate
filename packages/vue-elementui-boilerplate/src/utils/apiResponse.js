/*
 * @Author: benaozhi
 * @Date: 2020-09-04 15:47:38
 * @LastEditTime: 2020-09-04 15:50:34
 * @Description: 用于处理一些数据返回格式等的工具
 */
import config from '@/config'

/**
 * 过滤restfulAPI格式数据，仅返回数据部分
 * @param {Object<restfulAPI>} res
 */
export function filterData(res) {
  return res[config.RESPONSE_DATA_FILED]
}
