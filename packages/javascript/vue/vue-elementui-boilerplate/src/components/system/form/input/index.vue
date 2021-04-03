<!--
 * 输入框组件
 * @Author: Cphayim
 * @CreatDate: 2019-05-14
 * @Version: v1.0
 *
 * @param {InputData} props.data
 * @see '@/components/form/struct-data.js -> InputData'
 -->
<template>
  <el-input
    :class="['vrn-input', { invalid: !isValid }]"
    v-model="value"
    @change="handleChange"
    :type="data.inputType"
    :placeholder="data.placeholder"
    :disabled="data.disabled"
    autocomplete="off"
  />
</template>

<script>
export default {
  name: 'VRNInput',
  components: {},
  model: {
    prop: 'data',
    event: 'change',
  },
  props: {
    data: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      value: '',
      isValid: true, // 是否是有效值
    }
  },
  watch: {
    data: {
      immediate: true,
      deep: true,
      handler(newData, oldData) {
        this.initValue(newData)
      },
    },
  },
  methods: {
    /**
     * 初始化 value
     * 当 props.data 改变时应当调用，并验证数据有效性
     * @param {InputData} data
     */
    initValue(data) {
      this.value = data.value
      this.validate(data.value)
    },
    /**
     * change 事件处理
     * @param {string} value
     */
    handleChange(value) {
      // 将新值通知父组件更新数据
      const data = { ...this.data, value }
      this.$emit('change', data)
      // 此处不需要验证数据的有效性，待 props 更新后触发验证
    },
    /**
     * 将数据有效性上报（如果外层使用了 VRNForm 则能够收集信息）
     * @param {string} value
     */
    validate(value) {
      const isValid = this._verify(value, this.data.required, this.data.regexp)
      this.isValid = isValid
      this.$emit('validity', isValid)
    },
    /**
     * 验证数据有效性
     * @private
     * @param {string} value 值
     * @param {boolean} required 是否必填
     * @param {RegExp | null} regexp 正则
     * @return {boolean}
     */
    _verify(value, required, regexp) {
      // 没有正则
      if (!(regexp instanceof RegExp)) {
        // 根据是否必填和是否有值返回验证信息
        return required ? !!value : true
      }
      // 有正则
      if (value) {
        // 有值则验证正则
        return regexp.test(value)
      } else {
        // 没值则判断是否必填
        return !required
      }
    },
    /**
     * 获取 value
     * @return {string}
     */
    getVal() {
      return this.value
    },
  },
}
</script>

<style lang="scss">
.vrn-input {
  &.invalid {
    .el-input__inner {
      border-color: red;
    }
  }
}
</style>
