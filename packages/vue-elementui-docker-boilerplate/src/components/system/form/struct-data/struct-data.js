/*
 * @Author: Cphayim
 * @Date: 2019-05-14 00:04:01
 * @LastEditTime: 2020-09-03 02:16:24
 * @Description: 表单控件相关配置类
 */

import { ControlData } from './base'

/**
 * VRNForm 接收的包含 WidgetData 的二维数组
 * export type StructData = Array<Array<WidgetData>>
 */

/**
 * 表单装饰数据配置类
 * @use VRNWiget
 */
export class WidgetData {
  /**
   * @param {Object} params
   * @param {string} params.key 表单关键字
   * @param {string} [params.title] 表单控件左侧文字
   * @param {ControlData} params.data 控件数据
   */
  constructor({ key, title = '控件文字', data }) {
    if (!key || typeof key !== 'string') {
      throw new TypeError(`Param 'key' is required and must be 'string'`)
    }
    if (!data || !(data instanceof ControlData)) {
      throw new TypeError(`Param 'key' is required and must be 'ControlData'`)
    }
    this.key = key
    this.title = title
    this.data = data
  }
}

/**
 * Input 输入框控件配置类
 * @extends ControlData
 * @use VRNInput
 */
export class InputData extends ControlData {
  static type = 'input'
  /**
   * @param {Object} params
   * @param {'text' | 'password'} [params.inputType] 输入框类型
   * @param {string} [params.value] 值
   * @param {string} [params.placeholder] 占位符
   * @param {boolean} [params.disabled] 是否禁用
   * @param {boolean} [params.required] 是否必填
   * @param {RegExp | null} [params.regexp] 验证用正则
   */
  constructor({
    inputType = 'text',
    value = '',
    placeholder = '',
    disabled = false,
    required = false,
    regexp = null
  }) {
    super({ type: InputData.type, disabled, required })
    this.inputType = inputType
    this.value = value
    this.placeholder = placeholder
    this.regexp = regexp
  }
}

/**
 * Radio 单选框控件配置类
 * 配置的信息将传递给 el-radio-group
 * options 内的数据传递给 el-radio 或 el-radio-button
 * @extends ControlData
 * @use VRNRadio
 */
export class RadioData extends ControlData {
  static type = 'radio'
  /**
   * @param {Object} params
   * @param {string | number | boolean} params.value 选中值
   * @param {Array<RadioOption>} [params.options] Radio 选项数组
   * @param {boolean} [params.disabled] 是否禁用整个 RadioGroup
   * @param {boolean} [params.useButton] 是否使用 button 样式的 Radio
   * @param {boolean} [params.hasBorder] 是否显示边框样式
   * @param {'medium' | 'small' | 'mini'} [params.size] 样式大小（仅当 useButton 或 hasBorder 为 true 时有效）
   * @param {boolean} [params.required] 是否必填
   */
  constructor({
    value,
    options = [],
    disabled = false,
    useButton = false,
    hasBorder = false,
    size = 'small',
    required = false
  }) {
    super({ type: RadioData.type, disabled, required })
    this.value = value
    this.name = name
    this.options = options
    this.useButton = useButton
    this.hasBorder = hasBorder
    this.size = size
  }
}

/**
 * Radio 选项类
 */
export class RadioOption {
  /**
   * @param {Object} params
   * @param {string | number | boolean} params.value 该 Radio 对应的值
   * @param {string} [params.label] 用于显示的文字
   * @param {string} [params.disabled] 是否禁用单个 Radio
   */
  constructor({ label, value, disabled = false }) {
    this.value = value
    this.label = label || value // 如果没有传递 label 则使用 value
    this.disabled = disabled
  }
}

/**
 * Checkbox 复选框控件配置类
 * 配置的信息将传递给 el-checkbox-group
 * options 内的数据传递给 el-checkbox 或 el-checkbox-button
 * @extends ControlData
 * @use VRNCheckbox
 */
export class CheckboxData extends ControlData {
  static type = 'checkbox'
  /**
   * @param {Object} params
   * @param {Array<string>} params.value 被选中的值组成的数组
   * @param {Array<CheckboxOption>} [params.options] Checkbox 选项数组
   * @param {boolean} [params.disabled] 是否禁用整个 CheckboxGroup
   * @param {number} [params.min] 可被勾选的最小数量
   * @param {number} [params.max] 可被勾选的最大数量
   * @param {boolean} [params.useButton] 是否使用 button 样式的 Checkbox
   * @param {boolean} [params.hasBorder] 是否显示边框样式
   * @param {'medium' | 'small' | 'mini'} [params.size] 样式大小（仅当 useButton 或 hasBorder 为 true 时有效）
   * @param {boolean} [params.required] 是否必填
   */
  constructor({
    value = [],
    options = [],
    disabled = false,
    min = 0,
    max = 9999,
    useButton = false,
    hasBorder = false,
    size = 'small',
    required = false
  }) {
    super({ type: CheckboxData.type, disabled, required })
    this.value = value
    this.options = options
    this.min = min
    this.max = max
    this.useButton = useButton
    this.hasBorder = hasBorder
    this.size = size
  }
}

/**
 * Checkbox 选项类
 */
export class CheckboxOption {
  /**
   * @param {Object} params
   * @param {string | number | boolean} params.value 该 Checkbox 对应的值
   * @param {string} [params.label] 用于显示的文字
   * @param {string} [params.disabled] 是否禁用单个 Checkbox
   */
  constructor({ label, value, disabled = false }) {
    this.value = value
    this.label = label || value // 如果没有传递 label 则使用 value
    this.disabled = disabled
  }
}

/**
 * Select 选择器控件配置类
 * @extends ControlData
 * @use VRNSelect
 */
export class SelectData extends ControlData {
  static type = 'select'
  /**
   * @param {Object} params
   * @param {Array<string>} params.value 被选中的值组成的数组
   * @param {Array<SelectOption>} [params.options] Select 选项数组
   * @param {boolean} [params.disabled] 是否禁用整个 Select
   * @param {boolean} [params.multiple] 是否多选
   * @param {boolean} [params.limit] 多选时用户最多可以选择的项目数，为 0 则不限制
   * @param {boolean} [params.collapse] 多选时是否将选中的个数显示为数字（默认为文字）
   * @param {string} [params.placeholder] 占位符
   * @param {boolean} [params.clearable] 是否支持清空选项
   * @param {boolean} [params.filterable] 是否可搜索选项
   * @param {'medium' | 'small' | 'mini'} [params.size] 样式大小
   * @param {boolean} [params.createItem] 是否可输入(请确保createItem为true时，filterable也为true，否则会导致createItem无效)
   * @param {boolean} [params.required] 是否必填
   */
  constructor({
    value = [],
    options = [],
    disabled = false,
    multiple = false,
    limit = 0,
    collapse = false,
    placeholder = '',
    clearable = false,
    filterable = false,
    size = 'medium',
    createItem = false,
    required = false
  }) {
    super({ type: SelectData.type, disabled, required })
    this.value = value
    this.options = options
    this.disabled = disabled
    this.multiple = multiple
    this.limit = limit
    this.collapse = collapse
    this.placeholder = placeholder
    this.clearable = clearable
    this.filterable = filterable
    this.size = size
    this.createItem = createItem
  }
}

/**
 * Select 选项类
 */
export class SelectOption {
  /**
   * @param {Object} params
   * @param {string} params.value 该 Option 对应的值
   * @param {string} params.label 用于显示的文字
   * @param {string} [params.disabled] 是否禁用单个选项
   */
  constructor({ value, label, disabled = false }) {
    this.value = value
    this.label = label || value // 如果没有传入 label 则使用 value
    this.disabled = disabled
  }
}

/**
 * Cascader 级联选择器控件配置类
 * @extends ControlData
 * @use VRNCascader
 */
export class CascaderData extends ControlData {
  static type = 'cascader'
  /**
   * @param {Object} params
   * @param {Array<string>} params.value 被选中的值组成的数组
   * @param {Array<CascaderOption>} [params.options] Cascader 选项数组
   * @param {boolean} [params.disabled] 是否禁用整个 Cascader
   * @param {string} [params.separator] 选项分隔符，默认是 '/'
   * @param {string} [params.placeholder] 占位符
   * @param {boolean} [params.clearable] 是否支持清空选项
   * @param {'click' | 'hover'} [params.expand] 次级菜单的展开方式
   * @param {boolean} [params.filterable] 是否可搜索选项
   * @param {number} [params.debounce] 搜索关键词输入的去抖延迟，毫秒
   * @param {boolean} [params.loose] 是否宽松模式（例如默认有三层则必须选三层，如果启用宽松模式可以只选一层或两层）
   * @param {'medium' | 'small' | 'mini'} [params.size] 样式大小
   * @param {boolean} [params.required] 是否必填
   */
  constructor({
    value = [],
    options = [],
    disabled = false,
    separator = '/',
    placeholder = '',
    clearable = false,
    expand = 'click',
    filterable = false,
    debounce = 300,
    loose = false,
    size = 'medium',
    required = false
  }) {
    super({ type: CascaderData.type, disabled, required })
    this.value = value
    this.options = options
    this.disabled = disabled
    this.separator = separator
    this.placeholder = placeholder
    this.clearable = clearable
    this.filterable = filterable
    this.debounce = debounce
    this.loose = loose
    this.size = size
  }
}

/**
 * Cascader 选项类
 */
export class CascaderOption {
  /**
   * @param {Object} params
   * @param {string} params.value 该 Checkbox 对应的值
   * @param {string} params.label 用于显示的文字
   * @param {Array<CascaderOption>} [params.children] 子选项数组
   * @param {string} [params.disabled] 是否禁用单个选项及其子选项
   */
  constructor({ value, label, children = null, disabled = false }) {
    this.value = value
    this.label = label || value // 如果没有传入 label 则使用 value
    this.children = children
    this.disabled = disabled
  }
}

/**
 * DatePicker 日期选择器控件配置类
 * @extend ControlData
 * @use VRNDatePicker
 */
export class DatePickerData extends ControlData {
  static type = 'date-picker'
  /**
   * @param {Object} params
   * @param {'date'|'year'|'month'|'dates'|'week'|'datetime'|'datetimerange'|'daterange'|'monthrange'} [params.pickerType] 显示类型
   * @param {Date | Array<Date>} [params.value] 被选中的值组成的数组
   * @param {boolean} [params.disabled] 是否禁用
   * @param {boolean} [params.readonly] 是否只读
   * @param {boolean} [params.editable] 文本框可输入
   * @param {boolean} [params.clearable] 是否显示清除按钮
   * @param {string} [params.placeholder] 非范围选择时的占位符
   * @param {string} [params.placeholderStart] 范围选择时开始日期的占位内容
   * @param {string} [params.placeholderEnd] 范围选择时结束日期的占位内容
   * @param {string} [params.separator] 范围选择时的分隔符，默认为 '至'
   * @param {'left'|'center'|'right'} [params.align] 对齐方式
   * @param {'medium' | 'small' | 'mini'} [params.size] 样式大小
   * @param {boolean} [params.required] 是否必填
   */
  constructor({
    pickerType = 'date',
    value,
    disabled = false,
    readonly = false,
    editable = false,
    clearable = false,
    placeholder = '',
    placeholderStart = '',
    placeholderEnd = '',
    separator = '至',
    align = 'left',
    size = 'medium',
    required = false
  }) {
    super({ type: DatePickerData.type, disabled, required })
    this.pickerType = pickerType
    this.value = value
    this.disabled = disabled
    this.placeholder = placeholder
    this.placeholderStart = placeholderStart
    this.placeholderEnd = placeholderEnd
    this.separator = separator
    this.align = align
    this.size = size
    // 这是 element-ui 的时间格式，moment 是 'YYYY-MM-DD'
    this.format = 'yyyy-MM-dd'
  }
}
