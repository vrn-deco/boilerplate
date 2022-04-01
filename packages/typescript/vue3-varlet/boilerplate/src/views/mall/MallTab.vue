<template>
  <Layout :title="$route.meta.title" show-tab-bar>
    <var-input placeholder="请输入文本" v-model="value" />
    <var-button @click="$router.push('/mall/a')">to A</var-button>
    <div v-for="i in 100" :key="i">aaa</div>
  </Layout>
</template>

<script lang="ts">
export default defineComponent({ name: 'MallTab' })
</script>

<script setup lang="ts">
const value = ref('')
</script>

<style scoped></style>
