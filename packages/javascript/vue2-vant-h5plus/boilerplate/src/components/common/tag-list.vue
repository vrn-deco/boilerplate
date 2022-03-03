<!--
 * @Author: Cphayim
 * @Date: 2019-10-10 09:34:45
 * @Description: 标签列表
 -->

<template>
  <div class="tag-list">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'TagList',
}
</script>

<style lang="scss" scoped>
.tag-list {
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  padding: val(10) val(20);
  background-color: #fff;
}
</style>
