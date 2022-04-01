<template>
  <Layout title="B" back-arrow>
    <var-input placeholder="请输入文本" v-model="value" />
  </Layout>
</template>

<script setup lang="ts">
const value = ref('')
</script>

<style scoped></style>
