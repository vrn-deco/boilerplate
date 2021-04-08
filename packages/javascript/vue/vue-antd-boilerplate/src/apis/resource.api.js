/*
 * @Author: Cphayim
 * @Date: 2021-03-27 22:17:42
 * @Description: /resource 接口函数
 */

import { ResourceTypeEnum } from '@/enums/resource.enum'
import { strictFetch } from './http'

// 资源列表
export async function getList({ current = 1, size = 10, keyword, type = 0 }) {
  return strictFetch.post('/resource/list', {
    current,
    size,
    keyword,
  })
}

// 资源树
export async function getTree({ type = ResourceTypeEnum.展示平台 }) {
  const list = await strictFetch.post('/resource/tree', {
    type,
  })
  // 返回包装根节点的树
  return {
    resourceId: 0,
    name: 'ROOT',
    children: list,
  }
}

// 资源详情
export async function getDetail({ resourceId }) {
  const resourceDetail = await strictFetch.post('/resource/detail', {
    resourceId,
  })
  // 资源树中添加了虚拟根节点 0 ↑
  // 为 parentList 中补充 0
  resourceDetail.parentList.unshift(0)
  return resourceDetail
}

// 删除资源
export async function remove({ resourceId }) {
  return strictFetch.post('/resource/remove', {
    resourceId,
  })
}

// 新增/编辑资源
export async function addOrEdit({
  resourceId,
  name,
  url,
  type,
  parentId,
  icon,
  sort,
  enabled,
  remark,
}) {
  if (!url) {
    url = '#' // 占位标记
  }
  return strictFetch.post('/resource/addOrEdit', {
    resourceId,
    name,
    url,
    type,
    parentId,
    icon,
    sort,
    enabled,
    remark,
  })
}
