/*
 * @Author: Cphayim
 * @Date: 2019-05-20 10:52:14
 * @LastEditTime: 2020-07-07 09:02:39
 * @Description: 表单控件聚合出口
 */

/**
 * ?抽象出该文件的目的是为了给 VRN-widget.vue 使用
 * ?若该文件内容位于 index.js 中，因为 index.js 包含了 VRNForm，VRNForm 包含了 VRNWidget，VRNWidget 使用时将导致循环引入报错
 */

import VRNInput from './input'
import VRNRadio from './radio'
import VRNCheckbox from './checkbox'
import VRNCascader from './cascader'
import VRNSelect from './select'
import VRNDatePicker from './data-picker'

export { VRNInput, VRNRadio, VRNCheckbox, VRNSelect, VRNCascader, VRNDatePicker }
