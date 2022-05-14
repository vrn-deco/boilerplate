<script lang="ts">
export default { name: 'MallA' }
</script>

<script setup lang="ts">
const value = ref('')
</script>

<template>
  <Layout title="A" back-arrow>
    <van-field placeholder="在此输入一些文字后，使用下方按钮到 B" v-model="value" />
    <van-button @click="$router.push('/mall/b')">to B</van-button>
  </Layout>
</template>

<style scoped></style>
