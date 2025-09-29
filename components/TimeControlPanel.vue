<template>
  <div 
    v-if="showTimePanel" 
    class="time-control-panel fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 w-80 max-w-[90vw]"
  >
    <div class="flex justify-between items-center mb-3">
      <h3 class="font-semibold text-gray-900 dark:text-white">时间控制面板</h3>
      <UButton
        icon="i-heroicons-x-mark"
        color="gray"
        variant="ghost"
        size="sm"
        @click="closePanel"
      />
    </div>
    
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          设置模拟日期
        </label>
        <UInput
          v-model="inputDate"
          type="date"
          @change="setTime"
          class="w-full"
        />
      </div>
      
      <div class="grid grid-cols-2 gap-2">
        <UButton
          label="当前日期"
          color="blue"
          variant="outline"
          size="sm"
          @click="showCurrentDate"
        />
        <UButton
          label="重置时间"
          color="gray"
          variant="outline"
          size="sm"
          @click="resetTime"
        />
      </div>
      
      <div class="pt-2 border-t border-gray-200 dark:border-gray-700">
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600 dark:text-gray-400">当前模拟时间:</span>
          <span class="text-sm font-medium text-gray-900 dark:text-white">{{ currentTime }}</span>
        </div>
        <div class="flex items-center mt-1">
          <UBadge 
            :label="isTimeOverridden ? '已覆盖' : '正常模式'" 
            :color="isTimeOverridden ? 'orange' : 'green'"
            variant="solid"
            size="xs"
          />
        </div>
      </div>
    </div>
  </div>
  
  <UButton
    v-if="!showTimePanel"
    icon="i-heroicons-calendar-days"
    color="orange"
    variant="solid"
    @click="showPanel"
    class="fixed bottom-4 right-4 z-50 shadow-lg"
    :trailing-icon="isTimeOverridden ? 'i-heroicons-bolt' : ''"
  >
    <span v-if="isTimeOverridden" class="text-[0.6rem]">时间已覆盖</span>
    <span v-else class="text-[0.6rem]">时间控制</span>
  </UButton>
</template>

<script setup lang="ts">
import { now, setTime as setTimeOverride, resetTime as resetTimeOverride, isTimeOverridden, getOverrideDate } from '~/utils/time'

const showTimePanel = ref(false)
const inputDate = ref('')
const currentTime = ref('')

// 更新当前时间显示
const updateCurrentTime = () => {
  currentTime.value = now().format('YYYY-MM-DD HH:mm:ss')
}

// 每秒更新时间显示
let timeUpdateInterval: NodeJS.Timeout | null = null

onMounted(() => {
  // 初始化日期输入框为当前覆盖日期或当前日期
  const overrideDate = getOverrideDate()
  if (overrideDate) {
    inputDate.value = now().format('YYYY-MM-DD')
  } else {
    inputDate.value = now().format('YYYY-MM-DD')
  }
  
  // 开始时间更新定时器
  timeUpdateInterval = setInterval(updateCurrentTime, 1000)
  updateCurrentTime() // 立即更新一次
})

onUnmounted(() => {
  if (timeUpdateInterval) {
    clearInterval(timeUpdateInterval)
  }
})

const showPanel = () => {
  showTimePanel.value = true
}

const closePanel = () => {
  showTimePanel.value = false
}

const setTime = () => {
  if (inputDate.value) {
    setTimeOverride(inputDate.value)
    updateCurrentTime()
  }
}

const resetTime = () => {
  resetTimeOverride()
  inputDate.value = now().format('YYYY-MM-DD')
  updateCurrentTime()
}

const showCurrentDate = () => {
  const today = new Date()
  inputDate.value = today.toISOString().split('T')[0]
  setTimeOverride(today)
  updateCurrentTime()
}
</script>

<style scoped>
.time-control-panel {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>