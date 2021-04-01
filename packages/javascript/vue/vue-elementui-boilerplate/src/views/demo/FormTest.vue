<template>
  <div class="form-test-page">
    <VRNForm v-model="structData" ref="my-form" />
    <div class="bot">
      <el-button type="primary" @click="handleClick">点击获取表单值Map</el-button>
    </div>
  </div>
</template>

<script>
import {
  VRNForm,
  WidgetData,
  InputData,
  RadioData,
  RadioOption,
  CheckboxData,
  CheckboxOption,
  SelectData,
  SelectOption,
  CascaderData,
  CascaderOption,
  DatePickerData
} from '@/components/system/form'

export default {
  name: 'FormTestPage',
  components: {
    VRNForm
  },
  props: {},
  data() {
    return {
      /* Type as Array<Array<WidgetData>> */
      structData: [
        [
          new WidgetData({
            key: 'name',
            title: '公司名',
            data: new InputData({
              inputType: 'text',
              value: 'XX科技',
              placeholder: '请输入公司名',
              required: true,
              regexp: /^[\u4e00-\u9fa5]{3,5}$/
            })
          })
        ],
        // 第1行
        [
          // 直接编写配置项（不推荐，容易遗漏配置）
          {
            key: 'username',
            title: '用户名',
            data: {
              type: 'input',
              inputType: 'text',
              value: 'Cphayim',
              placeholder: '请输入用户名'
            }
          },
          // 通过配置类生成配置项（推荐，编辑器智能提示字段名及类型）
          new WidgetData({
            key: 'password',
            title: '密码',
            data: new InputData({
              inputType: 'password'
            })
          })
        ],
        // 第2行
        [
          new WidgetData({
            key: 'email',
            title: '邮箱',
            data: new InputData({
              inputType: 'text',
              value: 'i@cphayim.me',
              placeholder: '请输入邮箱',
              required: true,
              regexp: /^\w+@\w+\.\w+$/
            })
          })
        ],
        // 第3行
        [
          new WidgetData({
            key: 'gender',
            title: '性别',
            data: new RadioData({
              useButton: false,
              hasBorder: true,
              value: '1',
              // disabled: true,
              options: [
                new RadioOption({ label: '男', value: '1' }),
                new RadioOption({ label: '女', value: '2' })
              ]
            })
          }),
          new WidgetData({
            key: 'position',
            title: '职位',
            data: new CheckboxData({
              useButton: false,
              hasBorder: true,
              value: ['前端', '后端', '运维'],
              // disabled: true,
              options: [
                new CheckboxOption({ label: '前端', value: '前端' }),
                new CheckboxOption({ label: '后端', value: '后端' }),
                new CheckboxOption({ value: '设计' }), // 当没有指定 label 时，label 为 value 的值
                new CheckboxOption({ value: '运维' })
              ]
            })
          })
        ],
        // 第4行
        [
          new WidgetData({
            key: 'language',
            title: '选择器',
            data: new SelectData({
              placeholder: '请选择语言',
              filterable: true,
              multiple: true,
              options: [
                new SelectOption({ label: 'JavaScript', value: '1' }),
                new SelectOption({ label: 'C', value: '2' }),
                new SelectOption({ label: 'Java', value: '3' }),
                new SelectOption({ label: 'Python', value: '4' }),
                new SelectOption({ label: 'PHP', value: '5' }),
                new SelectOption({ label: 'Go', value: '6' }),
                new SelectOption({ label: 'Swift', value: '7' }),
                new SelectOption({ label: 'Kotlin', value: '8' })
              ]
            })
          }),
          new WidgetData({
            key: 'level',
            title: '级联选择器',
            data: new CascaderData({
              placeholder: '请选择内容',
              filterable: true,
              options: [
                new CascaderOption({
                  value: 'zhinan',
                  label: '指南',
                  children: [
                    new CascaderOption({
                      value: 'shejiyuanze',
                      label: '设计原则',
                      children: [
                        new CascaderOption({
                          value: 'yizhi',
                          label: '一致'
                        }),
                        new CascaderOption({
                          value: 'fankui',
                          label: '反馈'
                        }),
                        new CascaderOption({
                          value: 'xiaolv',
                          label: '效率'
                        }),
                        new CascaderOption({
                          value: 'kekong',
                          label: '可控'
                        })
                      ]
                    }),
                    new CascaderOption({
                      value: 'daohang',
                      label: '导航',
                      children: [
                        new CascaderOption({
                          value: 'cexiangdaohang',
                          label: '侧向导航'
                        }),
                        new CascaderOption({
                          value: 'dingbudaohang',
                          label: '顶部导航'
                        })
                      ]
                    })
                  ]
                })
              ]
            })
          })
        ],
        // 第5行
        [
          new WidgetData({
            key: 'schoolDate',
            title: '开学日期',
            data: new DatePickerData({
              pickerType: 'date'
            })
          }),
          new WidgetData({
            key: 'eventDate',
            title: '活动日期',
            data: new DatePickerData({
              pickerType: 'daterange'
            })
          })
        ]
      ]
    }
  },
  // 组件计算属性
  computed: {},
  watch: {},
  methods: {
    handleClick() {
      const dataMap = this.$refs['my-form'].getMap()
      console.log(dataMap)
    }
  },
  mounted() {},
  destroyed() {}
}
</script>

<style lang="scss" scoped>
.form-test-page {
  .bot {
    margin-top: 40px;
    text-align: center;
  }
}
</style>
