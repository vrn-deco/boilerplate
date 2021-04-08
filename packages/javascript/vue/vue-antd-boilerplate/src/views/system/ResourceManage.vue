<!--
 * @Author: Cphayim
 * @Date: 2021-03-27 02:33:55
 * @Description: 资源配置
-->

<template>
  <a-card class="resource-manage" :bordered="false">
    <a-alert message="资源配置将影响系统行为，请谨慎操作" banner />
    <a-tabs v-model="curKey" :animated="false" class="resource-tab">
      <a-tab-pane :key="ResourceTabKey.List" tab="资源列表">
        <ResourceList />
      </a-tab-pane>
      <div v-show="curKey === ResourceTabKey.List" slot="tabBarExtraContent">
        <a-input-search
          @input="handleSearch"
          placeholder="搜索"
          style="width: 300px; margin-right:10px;"
        />
        <a-button type="primary" @click="handleAdd">新增</a-button>
      </div>
    </a-tabs>

    <!-- 表单 -->
    <ResourceForm />
  </a-card>
</template>

<script>
import Vue from 'vue'
import Component from 'vue-class-component'

import { FormState } from '@/enums/common.enum'
import { Debounce, lifeCycle, Lock } from '@/utils/decorators'

import ResourceList from './components/ResourceList'

import ResourceForm from './components/ResourceForm'

const ResourceTabKey = {
  List: 1,
}

@Component({
  name: 'SystemResourceManagePage',
  components: { ResourceList, ResourceForm },
})
export default class SystemResourceManagePage extends Vue {
  ResourceTabKey = ResourceTabKey
  curKey = ResourceTabKey.List

  @lifeCycle
  created() {
    this.$store.dispatch('resource/fetchTree')
  }

  @lifeCycle
  beforeDestory() {
    this.$store.dispatch('resource/reset')
  }

  @Lock()
  handleAdd() {
    this.$store.commit('resource/setModal', { state: FormState.Add })
  }

  @Debounce(200)
  handleSearch(e) {
    const keyword = e.target.value.trim()
    this.$store.dispatch('resource/fetchList', { keyword })
  }
}
</script>

<style lang="less" scoped>
.resource-manage {
  background-color: #fff;
}
.top-layer {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}
.resource-tab {
  margin-top: 20px;
}
</style>
