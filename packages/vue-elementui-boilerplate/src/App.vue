<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import './App.scss'

export default {
  name: 'App',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss">
#app{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
