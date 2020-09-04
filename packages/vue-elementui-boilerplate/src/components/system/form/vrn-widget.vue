<!--
 * 表单控件装饰组件（隔离层，用于自动创建表单）
 * @Author: Cphayim
 * @CreatDate: 2019-05-13
 * @Version: v1.0
 *
 * @param {WidgetData} props.widgetData
 * @see '@/components/form/struct-data.js -> WidgetData'
 * @param {number} props.rowIndex
 -->
<template>
  <div v-if="widgetData.data" class="VRN-widget">
    <!-- 左侧标签文字 -->
    <div class="label">{{widgetData.title}}</div>
    <!-- END:左侧标签文字 -->

    <!-- 右侧内容 -->
    <div class="control-wrap">
      <!-- 自动注入表单控件区 -->
      <template>
        <!-- Input 输入框 -->
        <VRNInput
          v-if="InputData.type === widgetData.data.type"
          :data="widgetData.data"
          @change="handleChange"
          @validity="handleValidity"
        />
        <!-- Radio 单选框 -->
        <VRNRadio
          v-else-if="RadioData.type === widgetData.data.type"
          :data="widgetData.data"
          @change="handleChange"
        />
        <!-- Radio 单选框 -->
        <VRNRadio
          v-else-if="RadioData.type === widgetData.data.type"
          :data="widgetData.data"
          @change="handleChange"
        />
        <!-- Checkbox 复选框 -->
        <VRNCheckbox
          v-else-if="CheckboxData.type === widgetData.data.type"
          :data="widgetData.data"
          @change="handleChange"
        />
        <!-- Cascader 级联选择器 -->
        <VRNSelect
          v-else-if="SelectData.type === widgetData.data.type"
          :data="widgetData.data"
          @change="handleChange"
        />
        <!-- Cascader 级联选择器 -->
        <VRNCascader
          v-else-if="CascaderData.type === widgetData.data.type"
          :data="widgetData.data"
          @change="handleChange"
        />
        <!-- DatePicker 日期选择器 -->
        <VRNDatePicker
          v-else-if="DatePickerData.type === widgetData.data.type"
          :data="widgetData.data"
          @change="handleChange"
        />

      </template>
      <!-- END:自动注入表单控件区 -->
    </div>
    <!-- END:右侧内容 -->
  </div>
</template>

<script>
/**
 * TODO: 插槽自定义内容
 */
/* eslint-disable vue/no-unused-components */
import {
  InputData,
  RadioData,
  CheckboxData,
  SelectData,
  CascaderData,
  DatePickerData
} from './struct-data'
import { VRNInput, VRNRadio, VRNCheckbox, VRNSelect, VRNCascader, VRNDatePicker } from './controls'

export default {
  name: 'VRNWidget',
  components: {
    VRNInput,
    VRNRadio,
    VRNCheckbox,
    VRNSelect,
    VRNCascader,
    VRNDatePicker
  },
  props: {
    // 表单控件装饰数据
    widgetData: {
      type: Object,
      required: true
    },
    // VRNForm 遍历产生的行索引
    rowIndex: {
      type: Number,
      required: true
    },
    // VRNForm 遍历产生的列索引
    colIndex: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      InputData,
      RadioData,
      CheckboxData,
      SelectData,
      CascaderData,
      DatePickerData
    }
  },
  methods: {
    /**
     * change 事件处理
     * 接收子组件上抛的 ControlData 子类数据
     * @param {ControlData} controlData
     */
    handleChange(controlData) {
      // 接收 Control 上抛的 ControlData 的子类数据，合并到 widgetData
      const widgetData = { ...this.widgetData, data: controlData }
      // 携带父组件下发的行索引和列索引并通知父组件更新数据
      const { rowIndex, colIndex } = this
      this.$emit('update', { widgetData, rowIndex, colIndex })
      // ?注意这里的事件名是 'update'
    },

    /**
     * 处理合法性
     * @param {boolean} isValid
     */
    handleValidity(isValid) {
      // 将子控件上报的合法性带上 key 上报
      this.$emit('validity', { key: this.widgetData.key, isValid })
    }
  }
}
</script>

<style lang="scss">
$height: 40px;
.VRN-widget {
  display: flex;
  width: 100%;
  /* height: 100%; */
  min-width: 225px;
  /* min-height: $height; */
  .label {
    width: 100px;
    min-height: $height;
    padding: 0 10px;
    line-height: $height;
    text-align: right;
  }
  .control-wrap {
    flex: 1;
    display: flex;
    align-items: center;
  }
  .vrn_cascader {
    width: 75%;
    height: 100%;
  }
}
</style>
