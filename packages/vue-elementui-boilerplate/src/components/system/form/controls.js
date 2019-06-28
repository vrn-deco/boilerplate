/*
 * @Author: Cphayim
 * @Date: 2019-05-20 10:52:14
 * @LastEditTime: 2019-05-20 10:57:50
 * @Description: 表单控件聚合出口
 */

/**
 * ?抽象出该文件的目的是为了给 nt-widget.vue 使用
 * ?若该文件内容位于 index.js 中，因为 index.js 包含了 NTForm，NTForm 包含了 NTWidget，NTWidget 使用时将导致循环引入报错
 */

import NTInput from './input'
import NTRadio from './radio'
import NTCheckbox from './checkbox'
import NTCascader from './cascader'
import NTSelect from './select'
import NTDatePicker from './data-picker'

export { NTInput, NTRadio, NTCheckbox, NTSelect, NTCascader, NTDatePicker }
