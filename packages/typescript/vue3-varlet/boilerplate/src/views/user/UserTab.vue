<template>
  <Layout :title="$route.meta.title" show-tab-bar class="user-tab">
    <div>我的</div>
  </Layout>
</template>

<script lang="ts">
export default defineComponent({ name: 'UserTab' })
</script>

<script setup lang="ts"></script>

<style scoped>
.user-tab {
  --app-bar-color: #66cc99;
}
</style>
