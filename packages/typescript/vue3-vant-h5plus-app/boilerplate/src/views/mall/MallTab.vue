<script lang="ts">
export default { name: 'MallTab' }
</script>

<script setup lang="ts">
const router = useRouter()
const handlerToA = () => {
  router.push('/mall/a')
}
</script>

<template>
  <Layout :title="$route.meta.title" show-tab-bar>
    <div class="mx-[20px] text-gray-600">
      <p class="mt-[20px]">当前架子集成如下：</p>
      <ul class="mx-[20px] list-disc">
        <li>Vue, vue-router, pinia</li>
        <li>VantUI (已自动按需导入, 可直接使用)</li>
        <li>vueuse/core (已自动按需导入, 可直接使用)</li>
        <li>axios</li>
        <li>
          Webpack5 (由于打包产物在 App 中使用 Webview 以文件协议 file:// 访问，Vite 打包产物为 ESM
          不支持文件协议，故无法使用 Vite)
        </li>
        <li>unplugin 系列（自动导入函数库和组件库）</li>
        <li>基于 viewport 的移动端适配 (px -> vw)</li>
        <li>Tailwindcss (支持嵌套, 无需使用 scss)</li>
      </ul>
      <p class="mt-[20px]">附带如下开箱即用的功能和组件：</p>
      <ul class="mx-[20px] list-disc">
        <li>Layout 组件（带安全区域适配）</li>
        <li>RouterTransform 组件（路由过渡效果）</li>
        <li>keepAlive (动态添加/移除) Layout 中适配滚动高度恢复</li>
        <li>基本的路由守卫</li>
        <li>axios 请求函数封装（带 TS 类型声明）</li>
      </ul>
      <p class="mt-[40px]">
        现在你可以将页面向下滚动到一定位置后，点击方块进入内页，返回时将恢复到原先的滚动位置
      </p>
    </div>
    <div
      v-for="i in 100"
      :key="i"
      @click="handlerToA"
      class="w-[300px] py-[10px] mx-auto my-[10px] text-center text-white odd:bg-blue-400 even:bg-red-400"
    >
      To A
    </div>
  </Layout>
</template>

<style scoped></style>
