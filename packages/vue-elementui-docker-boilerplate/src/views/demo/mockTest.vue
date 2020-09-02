<!--
 * @Author: benaozhi
 * @Date: 2020-07-30 16:17:36
 * @LastEditTime: 2020-07-30 17:10:51
 * @Description:
-->
<template>
  <div>
    <button @click="test1">请求1</button>
  </div>
</template>

<script>
import Axios, { AxiosConfig } from '@/apis/services/axios'
function userInfo() {
  return Axios(
    new AxiosConfig({
      url: '/parameter/query',
      method: 'GET',
    }),
  )
}
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  methods: {
    async test1() {
      const res = await userInfo()
      console.log(res)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
