/**
 * 更新 structData 中对应 key 的 value
 * @param {Array<Array<WidgetData>>} structData 二维数组配置项
 * @param {string} key 键
 * @param {any} value 值
 */
export function updateValueByKey(structData, key, value) {
  const flat = flatStructData(structData)
  flat.forEach(widgetData => {
    if (widgetData.key === key) {
      widgetData.data.value = value
    }
  })
}

/**
 * 通过键值对对象更新 structData 的值
 * @param {Array<Array<WidgetData>>} structData 二维数组配置项
 * @param {{[key:string]: any}} map 数据对象
 */
export function updateValueByMap(structData, map) {
  if (!map || typeof map !== 'object') {
    throw TypeError('params map must be Object type')
  }
  const flat = flatStructData(structData)
  flat.forEach(widgetData => {
    if (map.hasOwnProperty(widgetData.key)) {
      widgetData.data.value = map[widgetData.key]
    }
  })
}

/**
 * 将 structData 二维数组拍平
 * @param {Array<Array<WidgetData>>} structData 二维数组配置项
 * @return {Array<WidgetData>}
 */
export function flatStructData(structData) {
  return structData.reduce((pre, cur) => {
    if (!Array.isArray(cur)) {
      return [...pre, cur]
    } else {
      return [...pre, ...flatStructData(cur)]
    }
  }, [])
}
