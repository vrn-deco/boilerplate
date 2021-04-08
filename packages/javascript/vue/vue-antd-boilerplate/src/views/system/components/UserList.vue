<!--
 * @Author: Cphayim
 * @Date: 2021-03-28 00:42:05
 * @Description: resource 列表
-->
<template>
  <div class="user-list">
    <a-table
      :columns="columns"
      :data-source="list"
      row-key="userId"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <!-- 序号 -->
      <div slot="index" slot-scope="_, __, index">{{ index + 1 }}</div>
      <!-- /序号 -->

      <!-- 状态 -->
      <div slot="enabled" slot-scope="enabled">
        <a-tag :color="enabled === SwitchEnum.启用 ? 'green' : ''">
          {{ SwitchEnum[enabled] }}
        </a-tag>
      </div>
      <!-- /状态 -->

      <!-- 操作 -->
      <!-- <div slot="member" slot-scope="record">
      </div> -->
      <!-- /操作 -->

      <!-- 操作 -->
      <div slot="action" slot-scope="record">
        <a-button type="link" @click="handleEdit(record)">关联角色</a-button>
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
  name: 'UserList',
  components: {},
  computed: {
    ...mapState('user', ['list', 'loading', 'pagination']),
  },
  methods: {},
})
export default class UserList extends Vue {
  SwitchEnum = SwitchEnum
  ResourceTypeEnum = ResourceTypeEnum

  columns = [
    {
      title: '序号',
      key: 'index',
      scopedSlots: { customRender: 'index' },
    },
    {
      title: '账号',
      dataIndex: 'username',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
    },
    {
      title: '角色',
      dataIndex: 'roleName',
    },
    {
      title: '状态',
      dataIndex: 'status',
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
    this.$store.dispatch('user/fetchList')
  }

  @lifeCycle
  beforeDestroy() {
    this.$store.dispatch('user/reset')
  }

  async handleTableChange(pagination, filters, sorter) {
    // 更新分页到下一页
    this.$store.commit('user/setPagination', pagination)
    // 拉数据
    this.$store.dispatch('user/fetchList')
  }

  async handleEdit(item) {
    // 进入编辑模式
    this.$store.commit('user/setModal', { state: FormState.Edit, cur: item })
  }

  async handleRemove(item) {
    this.$confirm({
      title: '提示',
      content: '确定要删除吗？',
      onOk: () => {
        this.$store.dispatch('user/remove', item)
      },
    })
  }
}
</script>

<style lang="less" scoped></style>
