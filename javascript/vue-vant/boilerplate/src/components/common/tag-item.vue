<!--
 * @Author: Cphayim
 * @Date: 2019-10-10 09:37:31
 * @LastEditTime: 2019-10-10 14:13:03
 * @Description: 标签元素
 *
 * props
 * - name: string 标签显示值
 * - active: boolean 是否高亮标签
 * - icon: 文字左侧显示的图标，vant-icon name
 *
 * emits
 * - click(): 标签被点击时触发事件
 *
 -->

<template>
  <span @click="onClick" class="tag-item" :class="{active:active}">
    <van-icon v-if="icon" :name="icon" />
    {{name}}
  </span>
</template>

<script>
export default {
  name: 'TagItem',
  props: {
    // 显示的标签名
    name: {
      type: String,
      required: true,
    },
    // 是否高亮
    active: {
      type: Boolean,
      default: false,
    },
    // 文字左侧显示的图标
    icon: {
      type: String,
    },
  },
  methods: {
    onClick() {
      this.$emit('click')
    },
  },
}
</script>

<style lang="scss" scoped>
.tag-item {
  display: flex;
  align-items: center;
  padding: val(14) val(32);
  border: val(2) solid #c8c9cc;
  border-radius: val(6);
  margin: val(10);
  font-size: val(26);
  color: #333;
  background-color: #fff;
  &.active {
    color: #fff;
    background-color: #1989fa;
    border-color: #1989fa;
  }
  /deep/ {
    .van-icon {
      margin-right: val(10);
    }
  }
}
</style>
