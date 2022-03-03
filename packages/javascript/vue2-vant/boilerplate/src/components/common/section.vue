<!--
 * @Author: Cphayim
 * @Date: 2019-09-27 13:41:27
 * @Description: 区块容器
 *
 * props
 * - fill: boolean [false] 是否填充白色背景
 -->

<template>
  <section :class="{ fill: fill }">
    <slot />
  </section>
</template>

<script>
export default {
  name: 'Section',
  props: {
    fill: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
section {
  margin: val(20) auto;
}
.fill {
  background: #fff;
}
</style>
