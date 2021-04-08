<!--
 * @Author: Cphayim
 * @Date: 2021-03-27 02:33:55
 * @Description: 用户管理
-->

<template>
  <a-card class="user-manage" :bordered="false">
    <div class="top-layer">
      <a-input-search @input="handleSearch" placeholder="搜索" style="width: 300px" />
      <a-button type="primary" @click="handleAdd">新增</a-button>
    </div>
    <UserList />
    <UserForm />
  </a-card>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

import { FormState } from '@/enums/common.enum'
import { Debounce, lifeCycle, Lock } from '@/utils/decorators'

import UserList from './components/UserList'
import UserForm from './components/UserForm'

@Component({
  name: 'SystemUserManagePage',
  components: { UserList, UserForm },
})
export default class SystemUserManagePage extends Vue {
  @lifeCycle
  beforeDestory() {
    this.$store.dispatch('user/reset')
  }

  @Lock()
  handleAdd() {
    this.$store.commit('user/setModal', { state: FormState.Add })
  }

  @Debounce(200)
  handleSearch(e) {
    const keyword = e.target.value.trim()
    this.$store.dispatch('user/fetchList', { keyword })
  }
}
</script>

<style lang="less" scoped>
.user-manage {
  background-color: #fff;
}
.top-layer {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
