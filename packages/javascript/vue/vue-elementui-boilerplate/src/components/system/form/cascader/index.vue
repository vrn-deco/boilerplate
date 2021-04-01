<!--
 * 级联选择器组件
 * @Author: Cphayim
 * @CreatDate: 2019-05-20
 * @Version: v1.0
 *
 * @param {CascaderData} props.data
 * @see '@/components/form/struct-data.js -> CascaderData'
 -->
<template>
  <el-cascader
    v-model="value"
    @change="handleChange"
    :options="data.options"
    :separator="data.separator"
    :placeholder="data.placeholder"
    :disabled="data.disabled"
    :clearable="data.clearable"
    :expand-trigger="data.expand"
    :filterable="data.filterable"
    :debounce="data.debounce"
    :change-on-select="data.loose"
    :size="data.size"
  ></el-cascader>
</template>

<script>
export default {
  name: 'VRNCascader',
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
     * @param {CascaderData} data
     */
    initValue(data) {
      this.value = data.value
    },
    /**
     * change 事件处理
     * @param {Array<string>} value
     */
    handleChange(value) {
      // 将新值通知父组件更新数据
      const data = { ...this.data, value }
      this.$emit('change', data)
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
