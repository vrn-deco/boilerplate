<!--
 * @Author: Cphayim
 * @Date: 2021-03-28 00:41:56
 * @Description: 新增/编辑 resource modal
-->
<template>
  <div class="resource-modal">
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
        <!-- 警告信息 -->
        <a-alert v-if="modal.state === FormState.Add" message="提示内容" banner />
        <!-- /警告信息 -->

        <!-- 所属平台 -->
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-model-item label="所属平台" prop="type">
              <a-radio-group
                v-model="form.type"
                button-style="solid"
                size="default"
                @change="handleTypeChange"
              >
                <a-radio-button :value="ResourceTypeEnum.展示平台">展示平台</a-radio-button>
                <a-radio-button :value="ResourceTypeEnum.管理平台">管理平台</a-radio-button>
              </a-radio-group>
            </a-form-model-item>
          </a-col>
        </a-row>
        <!-- /所属平台 -->

        <!-- 资源名 -->
        <a-row :gutter="30">
          <a-col :span="24">
            <a-form-model-item label="资源名称" prop="name">
              <a-input v-model.trim="form.name" type="text" placeholder="请输入资源名称" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <!-- /资源名 -->

        <!-- 引用标记 -->
        <a-row :gutter="30">
          <a-col :span="24">
            <a-form-model-item label="引用标记" prop="url">
              <a-input v-model.trim="form.url" type="text" placeholder="引用标记">
                <a-tooltip
                  slot="suffix"
                  title="对应的前端资源标记，可能导致出现大面积 404 异常，非开发者请勿修改"
                >
                  <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
                </a-tooltip>
              </a-input>
            </a-form-model-item>
          </a-col>
        </a-row>
        <!-- /引用标记 -->

        <!-- 父级资源 -->
        <a-row :gutter="30">
          <a-col :span="24">
            <a-form-model-item label="父级资源" prop="parentList">
              <a-cascader
                v-model="form.parentList"
                :options="cascaderOptions"
                :field-names="{ label: 'name', value: 'resourceId', children: 'children' }"
                change-on-select
                style="width: 100%"
                placeholder="请选择父级节点"
              />
            </a-form-model-item>
          </a-col>
        </a-row>
        <!-- /父级资源 -->

        <!-- 反向权重和图标 -->
        <a-row :gutter="30">
          <a-col :span="12">
            <a-form-model-item label="排序" prop="sort">
              <a-input-number v-model="form.sort" :min="1" :max="1000" :style="{ width: '100%' }" />
            </a-form-model-item>
          </a-col>
          <a-col :span="12">
            <a-form-model-item label="图标" prop="icon">
              <a-input v-model.trim="form.icon" type="text" placeholder="" />
            </a-form-model-item>
          </a-col>
        </a-row>
        <!-- /反向权重和图标 -->

        <!-- 状态 -->
        <a-row :gutter="30">
          <a-col :span="12">
            <a-form-model-item label="启用状态" prop="enabled">
              <a-switch
                :checked="this.form.enabled === SwitchEnum.启用"
                @change="handleEnabledChange"
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
import { ResourceTypeEnum } from '@/enums/resource.enum'
import { lifeCycle, Lock } from '@/utils/decorators'

@Component({
  name: 'ResourceForm',
  components: { Drawer },
  data() {
    return {
      rules: {
        name: [{ required: true, message: '请输入资源名' }],
        parentList: [{ validator: this.validateParentList }],
      },
    }
  },
  computed: {
    ...mapState('resource', ['modal', 'treeMap']),
  },
})
export default class ResourceForm extends Vue {
  ResourceTypeEnum = ResourceTypeEnum
  SwitchEnum = SwitchEnum
  FormState = FormState

  form = {}

  loading = true

  get visible() {
    return this.modal.state !== FormState.Done
  }

  get title() {
    return `${this.modal.state === FormState.Edit ? '编辑' : '新增'}资源`
  }

  get cascaderOptions() {
    return this.treeMap[this.form.type] ? [this.treeMap[this.form.type]] : []
  }

  @lifeCycle
  created() {
    this.$watch('modal.state', nVal => this.init(), { immediate: true })
  }

  async init() {
    this.loading = true
    if (this.modal.state === FormState.Edit) {
      const resourceDetail = await this.$store.dispatch('resource/fetchDetail', this.modal.cur)
      this.initalForm(resourceDetail)
    } else {
      this.initalForm()
    }
    this.loading = false
  }

  initalForm(origin = {}) {
    this.form = {
      resourceId: null,
      name: '',
      type: 1,
      url: '',
      parentList: [0], // 级联选择器
      icon: '',
      enabled: SwitchEnum.启用,
      remark: '',
      sort: 1,
      // 用原数据覆盖默认字段
      ...origin,
    }
  }

  // 处理所属平台切换
  handleTypeChange() {
    // 切换所属平台时，将父节点列表重置
    this.form.parentList = [0]
  }

  handleEnabledChange(bool) {
    this.form.enabled = bool ? SwitchEnum.启用 : SwitchEnum.停用
  }

  // 处理提交
  @Lock()
  async handleSubmit() {
    this.loading = true
    try {
      await this.$refs.form.validate()

      const { resourceId, name, type, url, parentList, icon, sort, enabled, remark } = this.form
      const parentId = parentList[parentList.length - 1] // 最后一个是 parentId
      const newResource = await this.$store.dispatch('resource/addOrEdit', {
        resourceId,
        name,
        type,
        url,
        parentId,
        icon,
        sort,
        enabled,
        remark,
      })

      if (newResource) {
        this.$store.commit('resource/setModal', { state: FormState.Done })
      }
    } finally {
      this.loading = false
    }
  }

  @Lock()
  handleCancel() {
    this.$store.commit('resource/setModal', { state: FormState.Done })
  }

  validateParentList(rule, value, next) {
    // 编辑模式下
    // parentList 中不能包含自己
    // 及自己不能是自己的父节点或祖先节点
    const resourceId = this.form.resourceId
    if (resourceId && value.includes(resourceId)) {
      next('父级资源不能包含自己')
    } else {
      next()
    }
  }
}
</script>

<style lang="less" scoped>
.bot {
  display: flex;
  justify-content: center;
}
</style>
