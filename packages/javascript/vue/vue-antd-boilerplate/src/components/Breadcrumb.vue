<!--
 * @Author: Cphayim
 * @Date: 2021-03-31 10:27:14
 * @Description: 面包屑
-->
<template>
  <div class="breadcrumb">
    <a-breadcrumb>
      <a-breadcrumb-item v-for="item in $route.matched" :key="item.path">
        <router-link :to="item.path">{{ item.meta.title }}</router-link>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  name: 'Breadcrumb',
  components: {},
})
export default class Breadcrumb extends Vue {
  get paths() {}
}
</script>

<style lang="less" scoped>
.breadcrumb {
  margin-bottom: 12px;
}
</style>
