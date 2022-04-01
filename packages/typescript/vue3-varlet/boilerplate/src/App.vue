<template>
  <router-view v-slot="{ Component }">
    <RouterTransition>
      <component :is="Component" :key="$route.fullPath" />
    </RouterTransition>
  </router-view>
</template>

<script setup lang="ts"></script>

<style scoped></style>
