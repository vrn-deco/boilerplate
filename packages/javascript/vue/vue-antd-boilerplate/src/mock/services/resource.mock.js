/*
 * @Author: Cphayim
 * @Date: 2021-03-26 16:23:08
 * @Description: mock /resource 接口
 */
import Mock from 'mockjs'
import { buildPath, deepCopy, parseBody, response } from '../utils'

import allResource from '../data/resource.json'

let id = allResource.length

// 资源列表
Mock.mock('/resource/list' |> buildPath, 'post', options => {
  const { current = 1, size = 10, keyword = '' } = parseBody(options.body)

  // 过滤
  const filterList = allResource.filter(item => item.name.includes(keyword))
  // 分页
  const records = filterList.slice(size * (current - 1), size * current)

  return response({
    current,
    size,
    total: filterList.length,
    records,
  })
})

// 资源树
Mock.mock('/resource/tree' |> buildPath, 'post', options => {
  const { type } = parseBody(options.body)
  if (!type) return response(null, { code: 400, message: '缺少参数 type' })
  // 后面需要加字段，深拷贝一份再操作
  const filterResource = deepCopy(allResource).filter(item => item.type === type)
  const filterMap = new Map(filterResource.map(item => [item.resourceId, item]))
  const resultList = []
  filterMap.forEach((item, key) => {
    // 将元素添加到其父节点的 children 中
    if (filterMap.has(item.parentId)) {
      const parent = filterMap.get(item.parentId)
      if (parent.children) {
        parent.children.push(item)
      } else {
        parent.children = [item]
      }
    }
    // 将根元素添加到结果数组
    if (item.parentId === 0) {
      resultList.push(item)
    }
  })
  return response(resultList)
})

// 资源详情
Mock.mock('/resource/detail' |> buildPath, 'post', options => {
  const { resourceId } = parseBody(options.body)
  if (!resourceId) return response(null, { code: 400, message: '缺少参数 resourceId' })
  // 找到对应的资源
  const resource = allResource.find(item => item.resourceId === resourceId) |> deepCopy
  // 在资源上添加 parentList 字段
  resource.parentList = genParentList(resource)
  return response(resource)
})

// 删除资源
Mock.mock('/resource/remove' |> buildPath, 'post', options => {
  const { resourceId } = parseBody(options.body)
  const index = allResource.findIndex(item => item.resourceId === resourceId)
  allResource.splice(index, 1)
  return response()
})

// 新增/编辑资源
Mock.mock('/resource/addOrEdit' |> buildPath, 'post', options => {
  const { resourceId, ...args } = parseBody(options.body)
  let resource
  if (resourceId) {
    // 编辑
    const index = allResource.findIndex(item => item.resourceId === resourceId)
    resource = allResource[index]
    resource = { ...resource, ...args }
    allResource.splice(index, 1, resource)
  } else {
    // 新增
    resource = args
    resource.resourceId = ++id
    allResource.push(resource)
  }
  if (resource.parentId !== 0) {
    resource.parentName = allResource.find(item => item.resourceId === resource.parentId).name
  } else {
    resource.parentName = null
  }
  return response(resource)
})

function genParentList(resource) {
  const parentList = []
  let cur = resource
  // 当前节点的父节点不是顶级节点，则继续往上查找
  while (cur.parentId !== 0) {
    const parent = allResource.find(item => item.resourceId === cur.parentId)
    if (!parent) break
    parentList.unshift(parent.resourceId)
    cur = parent
  }
  return parentList
}
