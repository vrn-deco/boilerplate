<!--
 * @Author: Cphayim
 * @Date: 2019-09-29 16:21:22
 * @LastEditTime: 2019-10-13 23:29:07
 * @Description: 通用列表组件
 *
 * props
 * - name: string [''] 显示在列表上方的分组名称，可不传
 * - list: Array<{
 *      id?: number // 唯一标识，用于 v-key
 *      title?: string  // 列表项左侧显示标题，可不传
 *      label?: string  // 标题下方的的描述信息
 *      value: string| number // 列表项右侧的值
 *      isLink?: boolean // 列表项是否是链接
 *      to?: string | Object // 跳转的路由地址（可以是对象）
 *      icon: string // 左侧显示的图标，参阅 https://youzan.github.io/vant/#/zh-CN/icon
 *   }>
 * - checkable: boolean 是否将列表变成一个 checkboxList
 *              右侧将会显示 checkbox, item.value 将不再显示, item.isLink、item.to 属性被忽略
 * - defaultIds: Array<number> 默认选中的项的 id 数组
 *
 * emits
 * - change(payload): 当 checkable 启用时，列表 checkbox 发生改变时触发
 *          payload: {
 *             index: number    // 发生改变的索引
 *             value: boolean   // 改变后的 checked 状态
 *             checkedlist: Array<boolean>   // 整个 checkedList
 *          }
 *
 * methods
 * - setCheckByIndex(index, check = true): 外部设置 check 状态（不会触发 emit，通常用来设置默认值）
 -->

<template>
  <!-- 普通列表 -->
  <van-cell-group v-if="!checkable" :title="name">
    <van-cell
      v-for="item in list"
      :key="item.id || item.title"
      :title="item.title"
      :label="item.label"
      :value="item.value"
      :isLink="item.isLink"
      :to="item.to"
      center
    >
    </van-cell>
  </van-cell-group>
  <!-- /普通列表 -->

  <!-- checkbox 列表 -->
  <van-cell-group v-else :title="name">
    <van-cell
      class="checkable-cell"
      v-for="(item, index) in list"
      :key="item.id"
      :title="item.title"
      :label="item.label"
      :value="item.value"
      center
      clickable
      @click="handleCheck(index)"
    >
      <van-icon
        name="checked"
        size="1.2rem"
        :color="checkedList[index]? '#1989fa': '#ccc'"
      />
    </van-cell>
  </van-cell-group>
  <!-- /checkbox 列表 -->
</template>

<script>
export class CellItem {
  constructor({ id, title, label, value, isLink = false, to, icon }) {
    this.id = id // 当使用 checkbox 模式时一定要有 id!!!
    this.title = title
    this.label = label
    this.value = value
    this.isLink = isLink
    this.to = to
    this.icon = icon
  }
}

export default {
  name: 'CellGroup',
  props: {
    name: {
      type: String,
      default: '',
    },
    // 列表数据，结构看顶部注释
    list: {
      type: Array,
      default: () => [],
    },
    // 是否在左侧显示 checkbox
    checkable: {
      type: Boolean,
      default: false,
    },
    defaultIds: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      checkedList: [],
    }
  },
  watch: {
    list: {
      immediate: true,
      handler(newList) {
        if (!this.checkable) return

        const checkedList = Array.isArray(newList) ? new Array(newList.length).fill(false) : []
        // 如果存在默认值 ids
        if (this.defaultIds.length) {
          newList.forEach((item, index) => {
            if (this.defaultIds.find(id => id === item.id)) {
              checkedList[index] = true
            }
          })
        }
        this.checkedList = checkedList
      },
    },
  },
  methods: {
    handleCheck(index) {
      const value = !this.checkedList[index]
      // 数组不能直接修改值（不会触发视图更新）
      this.$set(this.checkedList, index, value)
      this.$emit('change', {
        index,
        value,
        checkedList: this.checkedList,
      })
    },
    // 外部设置 check 状态（不会触发 emit，通常用来设置默认值）
    setCheckByIndex(index, check = true) {
      this.$set(this.checkedList, index, check)
    },
  },
}
</script>

<style lang="scss" scoped>
.checkable-cell {
  /deep/ {
    .van-cell__value {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
}
</style>
