<template>
  <Layout title="A" back-arrow>
    <var-input placeholder="请输入文本" v-model="value" />
    <var-button @click="$router.push('/mall/b')">to B</var-button>
  </Layout>
</template>

<script setup lang="ts">
const value = ref('')
</script>

<style scoped></style>
