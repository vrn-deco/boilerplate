<!--
 * @Author: Cphayim
 * @Date: 2021-03-28 00:41:56
 * @Description: 新增/编辑 resource modal
-->
<template>
  <div class="user-modal">
    <Drawer
      :visible="visible"
      :title="title"
      :loading="loading"
      @confirm="handleSubmit"
      @cancel="handleCancel"
      width="600px"
      confirmText="提交"
    >
      <!-- 表单 -->
      <a-form-model ref="form" :model="form" :rules="rules" hide-required-mark>
        <!-- 账号 -->
        <a-row :gutter="30">
          <a-col :span="24">
            <a-form-model-item
              label="账号"
              prop="username"
              :help="!!form.userId ? '账号不能够修改' : '新用户初始密码为：000000'"
            >
              <a-input
                v-model.trim="form.username"
                type="text"
                placeholder="请输入账号"
                :disabled="!!form.userId"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
        <!-- /账号 -->

        <!-- 昵称 -->
        <a-row :gutter="30">
          <a-col :span="24">
            <a-form-model-item label="昵称" prop="nickname">
              <a-input v-model.trim="form.nickname" type="text" placeholder="请输入昵称" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <!-- /昵称 -->

        <!-- 状态 -->
        <a-row :gutter="30">
          <a-col :span="12">
            <a-form-model-item label="启用状态" prop="status">
              <a-switch
                :checked="this.form.status === SwitchEnum.启用"
                @change="handleStatusChange"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
        <!-- /状态 -->

        <!-- 备注 -->
        <a-row :gutter="30">
          <a-col :span="24">
            <a-form-model-item label="备注" prop="remark">
              <a-textarea v-model="form.remark" placeholder="" :rows="2" style="resize: none" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <!-- /备注 -->
      </a-form-model>
      <!-- /表单 -->
    </Drawer>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import Component from 'vue-class-component'

import Drawer from '@/components/Drawer'
import { FormState, SwitchEnum } from '@/enums/common.enum'
import { lifeCycle, Lock } from '@/utils/decorators'

@Component({
  name: 'UserForm',
  components: { Drawer },
  data() {
    return {
      rules: {
        username: [{ required: true, message: '请输入账号' }],
        nickname: [{ required: true, message: '请输入昵称' }],
      },
    }
  },
  computed: {
    ...mapState('user', ['modal']),
  },
})
export default class UserForm extends Vue {
  SwitchEnum = SwitchEnum

  form = {}

  loading = true

  get visible() {
    return this.modal.state !== FormState.Done
  }

  get title() {
    return `${this.modal.state === FormState.Edit ? '编辑' : '新增'}用户`
  }

  @lifeCycle
  created() {
    this.$watch('modal.state', nVal => this.init(), { immediate: true })
  }

  async init() {
    this.loading = true
    if (this.modal.state === FormState.Edit) {
      const userDetail = await this.$store.dispatch('user/fetchDetail', this.modal.cur)
      this.initalForm(userDetail)
    } else {
      this.initalForm()
    }
    this.loading = false
  }

  initalForm(origin = {}) {
    this.form = {
      userId: null,
      username: '',
      nickname: '',
      status: SwitchEnum.启用,
      phone: '',
      email: '',
      remark: '',
      // 用原数据覆盖默认字段
      ...origin,
    }
  }

  handleStatusChange(bool) {
    this.form.status = bool ? SwitchEnum.启用 : SwitchEnum.停用
  }

  // 处理提交
  @Lock()
  async handleSubmit() {
    this.loading = true
    try {
      await this.$refs.form.validate()

      const { userId, username, nickname, status, phone, email, remark } = this.form
      const newUser = await this.$store.dispatch('user/addOrEdit', {
        userId,
        username,
        nickname,
        status,
        phone,
        email,
        remark,
      })

      if (newUser) {
        this.$store.commit('user/setModal', { state: FormState.Done })
      }
    } finally {
      this.loading = false
    }
  }

  handleCancel() {
    this.$store.commit('user/setModal', { state: FormState.Done })
  }
}
</script>

<style lang="less" scoped>
.bot {
  display: flex;
  justify-content: center;
}
</style>
