<template>
  <div v-if="props.modelValue" class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- 遮罩层 -->
    <div 
      class="absolute inset-0 bg-black/50 backdrop-blur-sm" 
      @click="closeModal"
    ></div>
    
    <!-- 弹窗内容 -->
    <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
      <!-- 头部 -->
      <div class="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
          💝 支持我们
        </h2>
        <button
          @click="closeModal"
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- 内容 -->
      <div class="p-6 space-y-6">
        <!-- 感谢说明 -->
        <div class="text-center">
          <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
            感谢您的使用！
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            如果这个工具对您有帮助，欢迎赞助支持我们继续开发
          </p>
        </div>

        <!-- 收款码 -->
        <div class="text-center">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <img 
              src="/pay.jpg" 
              alt="微信收款码" 
              class="w-48 h-48 mx-auto rounded-lg shadow-sm"
              @error="handleImageError"
            />
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
              微信扫码赞助
            </p>
          </div>
        </div>

        <!-- 赞助说明 -->
        <div class="space-y-3">
          <div class="flex items-center space-x-3">
            <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span class="text-sm text-gray-700 dark:text-gray-300">支持我们持续更新节日数据</span>
          </div>
          <div class="flex items-center space-x-3">
            <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span class="text-sm text-gray-700 dark:text-gray-300">开发更多实用功能</span>
          </div>
          <div class="flex items-center space-x-3">
            <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span class="text-sm text-gray-700 dark:text-gray-300">保持服务器稳定运行</span>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="space-y-3">
          <button
            @click="closeModal"
            class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
          >
            已赞助，关闭
          </button>
          <button
            @click="closeModal"
            class="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium py-3 px-4 rounded-lg transition-colors duration-200"
          >
            稍后再说
          </button>
        </div>

        <!-- 温馨提示 -->
        <div class="text-center text-xs text-gray-500 dark:text-gray-400">
          <p>赞助完全自愿，不影响任何功能使用</p>
          <p>感谢您的支持与理解 ❤️</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'payment-success': []
}>()

// 方法
const closeModal = () => {
  emit('update:modelValue', false)
}

// 处理图片加载错误
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
  // 可以显示一个占位符或错误提示
  const container = img.parentElement
  if (container) {
    const errorDiv = document.createElement('div')
    errorDiv.className = 'w-48 h-48 mx-auto rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center'
    errorDiv.innerHTML = `
      <div class="text-center text-gray-500 dark:text-gray-400">
        <svg class="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <p class="text-sm">收款码加载失败</p>
      </div>
    `
    container.appendChild(errorDiv)
  }
}

// 监听键盘事件，ESC 键关闭弹窗
onMounted(() => {
  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && props.modelValue) {
      closeModal()
    }
  }
  
  document.addEventListener('keydown', handleKeydown)
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })
})
</script>

<style scoped>
/* 确保弹窗在最顶层 */
.fixed {
  position: fixed;
}
</style>
