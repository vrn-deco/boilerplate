<!--
 * @Author: Cphayim
 * @Date: 2019-10-06 23:43:17
 * @LastEditTime: 2019-10-14 09:34:08
 * @Description: 简单的 Picker 组件
 *
 * props
 * - label: string ['标题'] 左侧标题
 * - placeholder: string ['请选择'] 占位符
 * - options: Array<string | number> 选项
 * - value: string | number 显示在表单上的值
 *
 * emits
 * - change(payload) 当下拉选项值被改变时触发
 *          payload: {
 *              index: number // 选项的索引
 *              value: string | number  // 选项的值
 *          }
 -->

<template>
  <div class="simple-picker">
    <van-field
      readonly
      :is-link="!disabled"
      center
      :label="label"
      :value="value"
      :placeholder="placeholder"
      @click="!disabled && (showPicker = true)"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="options"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'Picker',
  props: {
    label: {
      type: String,
      default: '标题',
    },
    placeholder: {
      type: String,
      default: '请选择',
    },
    // 选项 SelectOption[]
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [String, Number],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showPicker: false,
    }
  },
  computed: {},
  methods: {
    onConfirm(value, index) {
      this.showPicker = false
      this.$emit('change', { value, index })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
