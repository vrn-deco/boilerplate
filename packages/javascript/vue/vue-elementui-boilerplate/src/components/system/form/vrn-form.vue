<!--
 * 融合表单组件
 * Author: Cphayim
 * CreatDate: 2019-03-05
 * version: v1.0
 *
 * @param {Array<Array<WidgetData>>} structData
 * @see '@/components/form/struct-data.js -> StructData'
 -->
<template>
  <div v-if="structData" class="vrn_formtable">
    <!-- 遍历行 -->
    <div class="row" v-for="(rowData, rowIndex) in structData" :key="rowIndex">
      <!-- 遍历列 -->
      <div class="col" v-for="(widgetData, colIndex) in rowData" :key="colIndex">
        <VrnWidget
          :widgetData="widgetData"
          :rowIndex="rowIndex"
          :colIndex="colIndex"
          @update="handleUpdate"
          @validity="handleValidity"
        />
      </div>
      <!-- END：遍历列 -->
    </div>
    <!-- END：遍历行 -->
  </div>
</template>

<script>
import { flatStructData } from './utils.js'
import VrnWidget from '@/components/system/form/vrn-widget.vue'

export default {
  // 组件名
  name: 'VrnForm',
  components: {
    VrnWidget
  },
  model: {
    prop: 'structData',
    event: 'change'
  },
  // 组件属性
  props: {
    // 结构化数据（二维数组）
    structData: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      /**
       * 用于保存表单中未通过验证的字段 key
       * @property {Set<string>}
       */
      invalidKeySet: new Set()
    }
  },
  watch: {},
  methods: {
    /**
     * update 事件处理
     * @param {Object} params
     * @param {number} params.rowIndex 行索引
     * @param {number} params.colIndex 列索引
     * @param {WidgetData} params.widgetData widget 数据
     */
    handleUpdate({ rowIndex, colIndex, widgetData }) {
      // 接收 Widget 上抛的 widgetData，根据 colIndex 和 widgetData 合并到 structData
      const newStructData = this._combineStructData({
        rowIndex,
        colIndex,
        widgetData
      })
      this.$emit('change', newStructData)
    },
    /**
     * 处理合法性
     * @param {Object} params
     * @param {string} params.key WidgetData.key
     * @param {boolean} params.isValid 是否有效
     */
    handleValidity({ key, isValid }) {
      isValid ? this.invalidKeySet.delete(key) : this.invalidKeySet.add(key)
    },
    /**
     * 合并 StructData，插入新的 widgetData
     * @private
     * @param {Object} params
     * @param {number} params.rowIndex 行索引
     * @param {number} params.colIndex 列索引
     * @param {WidgetData} params.widgetData widget 数据
     * @return {Array<Array<WidgetData>>}
     */
    _combineStructData({ rowIndex, colIndex, widgetData }) {
      const newStructData = this.structData.map(rowData => [...rowData])
      try {
        newStructData[rowIndex][colIndex] = widgetData
      } catch (error) {
        console.warn(`VRNForm: 接收到了无效的索引 (row -> ${rowIndex}, col -> ${colIndex})`)
      }
      return newStructData
    },
    /**
     * 获取表单键值对数据
     * @return {[x:string]: string}
     */
    getMap() {
      // 如果存在未通过验证的字段，则返回 null
      return this.invalidKeySet.size ? null : this._scanfDataByStructData()
    },

    /**
     * 数据剥离，将 vue 处理后的响应对象转为普通对象
     * @param {any} data
     * @return {any}
     */
    _peel(data) {
      return typeof data === 'object' ? JSON.parse(JSON.stringify(data)) : data
    },
    /**
     * 扫描 structData 返回 dataMap 键值对
     * @private
     * @return {{[key:string]: any}}
     */
    _scanfDataByStructData() {
      const flat = flatStructData(this.structData)
      return flat.reduce(
        (dataMap, widgetData) => ({
          ...dataMap,
          [widgetData.key]: this._peel(widgetData.data.value)
        }),
        {}
      )
    }
  }
}
</script>

<style lang="scss">
.vrn_formtable {
  width: 100%;
  /* overflow: hidden; */
  .row {
    display: flex;
    width: 100%;
    margin: 5px 0;
    .col {
      flex: 1;
      height: 100%;
    }
  }
}
</style>
