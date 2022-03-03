<!--
 * @Author: Cphayim
 * @Date: 2019-10-08 09:00:41
 * @Description: 卡片（通用组件）
 *
 * props
 * - icon: string 图片 base64 数据或 url
 *
 * emits
 * - click(): 卡片被点击时触发
 -->

<template>
  <div class="card" @click="onClick">
    <div v-if="icon" class="flex-left">
      <img :src="icon" class="icon" />
    </div>
    <div class="flex-right">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    icon: {
      type: String,
    },
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    onClick() {
      this.$emit('click')
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  margin: val(30);
  padding: val(30) val(20);
  border-radius: val(10);
  box-shadow: val(2) val(2) val(10) #dcdcdc;
  background-color: #fff;
}
.flex-left {
  flex: 0 0 auto;
  padding-right: val(20);
  .icon {
    width: val(56);
    height: val(56);
    opacity: 0.85;
  }
}
.flex-right {
  flex: 1;
}
</style>
