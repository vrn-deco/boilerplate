<!--
 * 级联选择器组件
 * @Author: Cphayim
 * @CreatDate: 2019-05-20
 * @Version: v1.0
 *
 * @param {DatePickerData} props.data
 * @see '@/components/form/struct-data.js -> DatePickerData'
 -->
<template>
  <el-date-picker
    v-model="value"
    @change="handleChange"
    :type="data.pickerType"
    :readonly="data.readonly"
    :disabled="data.disabled"
    :editable="data.editable"
    :clearable="data.clearable"
    :placeholder="data.placeholder"
    :start-placeholder="data.placeholderStart"
    :end-placeholder="data.placeholderEnd"
    :format="data.format"
    :align="data.align"
    :range-separator="data.separator"
    :size="data.size"
  />
</template>

<script>
import moment from 'moment'
export default {
  name: 'VRNDatePicker',
  components: {},
  props: {
    data: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      value: []
    }
  },
  watch: {
    data: {
      immediate: true,
      deep: true,
      handler(newData, oldData) {
        this.initValue(newData)
      }
    }
  },
  computed: {},
  methods: {
    /**
     * 初始化 value
     * 当 props.data 改变时应当调用
     * @param {DatePickerData} data
     */
    initValue(data) {
      this.value = data.value
    },
    /**
     * change 事件处理
     * ?需要格式化后 emit
     * @param {Date | Array<Date>} value
     */
    handleChange(value) {
      // 将新值通知父组件更新数据
      const data = { ...this.data, value: this._format(value) }
      this.$emit('change', data)
    },
    /**
     * 对 change 事件传递的时间格式化
     * @param {Date | Array<Date>} value 可能是 Date(非范围模式) 或 Array<Date>(范围模式)
     * @param {string} [formatStr] 指定格式
     * ?注意，如果使用 DatePickerData.format 需要 .toUpperCase()
     * @returns {string | Array<string>}
     */
    _format(value, formatStr = 'YYYY-MM-DD') {
      if (!Array.isArray(value)) {
        return moment(value).format(formatStr)
      }
      return value.map(value => this._format(value))
    },
    /**
     * 获取 value
     * @return {Array<string>}
     */
    getVal() {
      return this.value
    }
  }
}
</script>
