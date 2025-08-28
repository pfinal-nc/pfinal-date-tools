<template>
  <div id="app" class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <UApp>
      <NuxtPage />
    </UApp>
  </div>
</template>

<script setup lang="ts">
// 全局 SEO 配置
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - 妙策` : '妙策 - 节日营销日历'
  }
})

// 全局样式
useSeoMeta({
  robots: 'index, follow',
  description: '妙策 - 专业的节日营销日历工具，提供电商、餐饮、美妆、教育行业的节日营销节点查询，实时倒计时提醒，可落地的营销方案。',
  ogImage: '/og-image.png',
  twitterCard: 'summary_large_image'
})
</script>

<style>
/* 全局样式 */
html {
  font-family: 'Noto Sans SC', 'Inter', system-ui, sans-serif;
}

body {
  @apply antialiased;
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background-color: rgb(243 244 246);
}

.dark ::-webkit-scrollbar-track {
  background-color: rgb(31 41 55);
}

::-webkit-scrollbar-thumb {
  background-color: rgb(209 213 219);
  border-radius: 9999px;
}

.dark ::-webkit-scrollbar-thumb {
  background-color: rgb(75 85 99);
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgb(156 163 175);
}

.dark ::-webkit-scrollbar-thumb:hover {
  background-color: rgb(107 114 128);
}

/* 动画效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  transform: translateY(20px);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
