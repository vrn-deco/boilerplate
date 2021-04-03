<!--
 * 单选框组件
 * @Author: Cphayim
 * @CreatDate: 2019-05-15
 * @Version: v1.0
 *
 * @param {RadioData} props.data
 * @see '@/components/form/struct-data.js -> RadioData'
 -->
<template>
  <!-- RadioGroup -->
  <el-radio-group
    v-model="value"
    @change="handleChange"
    :disabled="data.disabled"
  >
    <!-- Radio（条件渲染） -->
    <template v-if="data.useButton">
      <!-- 按钮样式的 Radio -->
      <el-radio-button
        v-for="(radioOption, index) in data.options"
        :key="radioOption.value"
        :data-index="index"
        :label="radioOption.value"
        :disabled="radioOption.disabled"
      >
        {{radioOption.label || radioOption.value}}
      </el-radio-button>
    </template>

    <template v-else>
      <!-- 普通样式的 Radio -->
      <el-radio
        v-for="(radioOption, index) in data.options"
        :key="radioOption.value"
        :data-index="index"
        :label="radioOption.value"
        :border="data.hasBorder"
        :disabled="radioOption.disabled"
      >
        {{radioOption.label || radioOption.value}}
      </el-radio>
    </template>
    <!-- END:Radio -->
  </el-radio-group>
  <!-- END:RadioGroup -->
</template>

<script>
export default {
  name: 'VRNRadio',
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
     * @param {RadioData} data
     */
    initValue(data) {
      this.value = data.value
    },
    /**
     * change 事件处理
     * @param {string | number | boolean} value
     */
    handleChange(value) {
      // 将新值通知父组件更新数据
      const data = { ...this.data, value }
      this.$emit('change', data)
    },
    /**
     * 获取 value
     * @return {string | number | boolean}
     */
    getVal() {
      return this.value
    }
  }
}
</script>

<style lang="scss">
.el-radio {
  margin-right: 20px;
  &.is-bordered {
    margin-right: 0;
  }
}
</style>
