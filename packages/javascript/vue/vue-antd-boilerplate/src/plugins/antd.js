/*
 * @Author: Cphayim
 * @Date: 2019-06-28 15:56:52
 * @Description: 注册需要使用的 Antd 组件
 */

import {
  message,
  notification,
  Modal,
  Layout,
  Row,
  Col,
  Menu,
  Icon,
  Button,
  Result,
  FormModel,
  Input,
  Select,
  Checkbox,
  Tabs,
  Alert,
  Tooltip,
  Dropdown,
  Spin,
  Avatar,
  Table,
  Divider,
  Tag,
  Card,
  Drawer,
  Radio,
  Cascader,
  InputNumber,
  Switch,
  Space,
  Breadcrumb,
  Tree,
} from 'ant-design-vue'

export function registerAntdComponents(Vue) {
  Vue.use(Layout)
  Vue.use(Row)
  Vue.use(Col)
  Vue.use(Menu)
  Vue.use(Icon)
  Vue.use(Button)
  Vue.use(Result)
  Vue.use(Input)
  Vue.use(Select)
  Vue.use(FormModel)
  Vue.use(Checkbox)
  Vue.use(Tabs)
  Vue.use(Alert)
  Vue.use(Tooltip)
  Vue.use(Dropdown)
  Vue.use(Spin)
  Vue.use(Avatar)
  Vue.use(Table)
  Vue.use(Divider)
  Vue.use(Tag)
  Vue.use(Card)
  Vue.use(Modal)
  Vue.use(Drawer)
  Vue.use(Radio)
  Vue.use(Cascader)
  Vue.use(InputNumber)
  Vue.use(Switch)
  Vue.use(Space)
  Vue.use(Breadcrumb)
  Vue.use(Tree)

  Vue.prototype.$message = message
  message.config({ top: '100px' })

  Vue.prototype.$notification = notification

  Vue.prototype.$confirm = Modal.confirm.bind(Modal)
}
