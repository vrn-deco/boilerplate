<!--
 * @Author: Cphayim
 * @Date: 2019-10-09 09:13:29
 * @Description: 时间选择器
 *
 * props
 * - label: string ['标题'] 左侧标题
 * - placeholder: string ['请选择'] 占位符
 * - value: string | number 显示在表单上的值
 * - type: 'datetime' | 'date' | 'time' | 'year-month' ['datetime'] 类型
 *
 * emits
 * - change(payload) 当下拉选项值被改变时触发
 *          payload: Date
 -->
<template>
  <div class="datetime-picker">
    <van-field
      readonly
      clickable
      is-link
      center
      :label="label"
      :value="value"
      :placeholder="placeholder"
      @click="showPicker = true"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        :type="type"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'DatetimePicker',
  components: {},
  props: {
    label: {
      type: String,
      default: '标题',
    },
    placeholder: {
      type: String,
      default: '请选择',
    },
    value: {
      type: [String, Date],
    },
    type: {
      type: String,
      default: 'datetime',
    },
  },
  data() {
    return {
      showPicker: false,
      currentDate: new Date(),
    }
  },
  computed: {},
  methods: {
    onConfirm(value) {
      this.showPicker = false
      this.$emit('change', value)
    },
  },
}
</script>

<style lang="scss" scoped></style>
