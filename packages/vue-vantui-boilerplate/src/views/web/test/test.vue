<template>
  <div>
    <button @click="test">test</button>
  </div>
</template>

<script>
import md5 from 'js-md5'
export default {
  name: 'test',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  methods: {
    async test() {
      const loginName = '金晨'
      const password = md5('123123')
      await this.$store.dispatch(`auth/login`, { loginName, password })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
