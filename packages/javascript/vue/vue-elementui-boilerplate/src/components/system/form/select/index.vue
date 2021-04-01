<!--
 * 级联选择器组件
 * @Author: Cphayim
 * @CreatDate: 2019-05-19
 * @Version: v1.0
 *
 * @param {SelectData} props.data
 * @see '@/components/form/struct-data.js -> SelectData'
 -->
<template>
  <el-select
    v-model="value"
    @change="handleChange"
    :disabled="data.disabled"
    :multiple="data.multiple"
    :multiple-limit="data.limit"
    :collapse-tags="data.collapse"
    :clearable="data.clearable"
    :filterable="data.filterable"
    :placeholder="data.placeholder"
    :size="data.size"
    :allow-create="data.createItem"
    autocomplete="off"
  >
    <el-option
      v-for="(selectOption, index) in data.options"
      :key="selectOption.value"
      :label="selectOption.label"
      :value="selectOption.value"
      :data-index="index"
    />
  </el-select>
</template>

<script>
export default {
  name: 'VRNSelect',
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
     * @param {SelectData} data
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

<style lang="scss">
</style>
