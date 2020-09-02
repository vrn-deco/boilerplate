<!--
 * 复选框组件
 * @Author: Cphayim
 * @CreatDate: 2019-05-19
 * @Version: v1.0
 *
 * @param {CheckboxData} props.data
 * @see '@/components/form/struct-data.js -> CheckboxData'
 -->
<template>
  <!-- CheckboxGroup -->
  <el-checkbox-group
    v-model="value"
    @change="handleChange"
    :disabled="data.disabled"
  >
    <!-- Checkbox（条件渲染） -->
    <template v-if="data.useButton">
      <!-- 按钮样式的 Checkbox -->
      <el-checkbox-button
        v-for="(checkOption, index) in data.options"
        :key="checkOption.value"
        :data-index="index"
        :label="checkOption.value"
        :disabled="checkOption.disabled"
      >
        {{checkOption.label || checkOption.value}}
      </el-checkbox-button>
    </template>

    <template v-else>
      <!-- 普通样式的 Checkbox -->
      <el-checkbox
        v-for="(checkOption, index) in data.options"
        :key="checkOption.value"
        :data-index="index"
        :label="checkOption.value"
        :border="data.hasBorder"
        :disabled="checkOption.disabled"
      >
        {{checkOption.label || checkOption.value}}
      </el-checkbox>
    </template>
    <!-- END:Checkbox -->
  </el-checkbox-group>
  <!-- END:CheckboxGroup -->
</template>

<script>
export default {
  name: 'VRNCheckbox',
  components: {},
  props: {
    data: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      value: ''
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
     * @param {CheckboxData} data
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
