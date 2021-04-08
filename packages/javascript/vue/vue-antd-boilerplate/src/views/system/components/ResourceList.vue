<!--
 * @Author: Cphayim
 * @Date: 2021-03-28 00:42:05
 * @Description: resource 列表
-->
<template>
  <div class="resource-list">
    <a-table
      :columns="columns"
      :data-source="list"
      row-key="resourceId"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <!-- 序号 -->
      <div slot="index" slot-scope="_, __, index">{{ index + 1 }}</div>
      <!-- /序号 -->

      <!-- 所属平台 -->
      <div slot="type" slot-scope="type">
        <a-tag :color="type === ResourceTypeEnum.展示平台 ? 'orange' : 'blue'">
          {{ ResourceTypeEnum[type] }}
        </a-tag>
      </div>
      <!-- /所属平台 -->

      <!-- 状态 -->
      <div slot="enabled" slot-scope="enabled">
        <a-tag :color="enabled === SwitchEnum.启用 ? 'green' : ''">
          {{ SwitchEnum[enabled] }}
        </a-tag>
      </div>
      <!-- /状态 -->

      <!-- 操作 -->
      <div slot="action" slot-scope="record">
        <a-button type="link" @click="handleEdit(record)">编辑</a-button>
        <a-button type="link" @click="handleRemove(record)" class="remove-btn">删除</a-button>
      </div>
      <!-- /操作 -->
    </a-table>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import Component from 'vue-class-component'

import { lifeCycle } from '@/utils/decorators'
import { FormState, SwitchEnum } from '@/enums/common.enum'
import { ResourceTypeEnum } from '@/enums/resource.enum'

@Component({
  name: 'ResourceList',
  components: {},
  computed: {
    ...mapState('resource', ['list', 'loading', 'pagination']),
  },
  methods: {},
})
export default class ResourceList extends Vue {
  SwitchEnum = SwitchEnum
  ResourceTypeEnum = ResourceTypeEnum

  columns = [
    {
      title: '序号',
      key: 'index',
      scopedSlots: { customRender: 'index' },
    },
    {
      title: '所属平台',
      dataIndex: 'type',
      scopedSlots: { customRender: 'type' },
    },
    {
      title: '资源名称',
      dataIndex: 'name',
    },
    {
      title: '引用标记',
      dataIndex: 'url',
    },
    {
      title: '父级资源',
      dataIndex: 'parentName',
    },
    {
      title: '排序',
      dataIndex: 'sort',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'enabled',
      scopedSlots: { customRender: 'enabled' },
      align: 'center',
    },
    {
      title: '操作',
      key: 'action',
      scopedSlots: { customRender: 'action' },
      align: 'center',
    },
  ]

  @lifeCycle
  created() {
    this.$store.dispatch('resource/fetchList')
  }

  async handleTableChange(pagination, filters, sorter) {
    // 更新分页到下一页
    this.$store.commit('resource/setPagination', pagination)
    // 拉数据
    this.$store.dispatch('resource/fetchList')
  }

  async handleEdit(item) {
    // 进入编辑模式
    this.$store.commit('resource/setModal', { state: FormState.Edit, cur: item })
  }

  async handleRemove(item) {
    this.$confirm({
      title: '提示',
      content: '确定要删除吗？',
      onOk: () => {
        this.$store.dispatch('resource/remove', item)
      },
    })
  }
}
</script>

<style lang="" scoped></style>
