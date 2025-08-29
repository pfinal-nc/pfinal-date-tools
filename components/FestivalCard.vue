<template>
  <UCard 
    :class="[
      'festival-card hover:shadow-lg transition-all duration-300 h-full w-full',
      isExpired ? 'opacity-60' : ''
    ]" 
    style="min-width: 0; max-width: 100%;"
  >
    <template #header>
      <div class="flex justify-between items-start">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {{ festival.name }}
            </h3>
            <UBadge
              v-if="isExpired"
              label="已过"
              color="gray"
              variant="soft"
              size="xs"
            />
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
            {{ festival.description }}
          </p>
        </div>
        <UButton
          :icon="isFavorite ? 'i-heroicons-heart-solid' : 'i-heroicons-heart'"
          color="red"
          variant="ghost"
          size="sm"
          @click="toggleFavorite"
          class="favorite-btn touch-target"
        />
      </div>
    </template>

    <div class="space-y-4">
      <!-- 节日日期 -->
      <div class="text-center">
        <div class="text-xl font-bold text-red-600 dark:text-red-400">
          {{ formatDate(festival.date) }}
        </div>
        <div class="text-xs text-gray-500 dark:text-gray-400">
          {{ getDayOfWeek(festival.date) }}
        </div>
      </div>

      <!-- 倒计时信息 -->
      <div class="space-y-2">
        <!-- 距节日倒计时 -->
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600 dark:text-gray-300">距节日：</span>
          <span 
            :class="[
              'text-sm font-medium',
              daysToFestival > 0 
                ? 'text-blue-600 dark:text-blue-400' 
                : 'text-gray-400 dark:text-gray-500'
            ]"
          >
            {{ getCountdownText(daysToFestival, '节日') }}
          </span>
        </div>

        <!-- 筹备期提醒 -->
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-600 dark:text-gray-300">建议筹备：</span>
          <span 
            :class="[
              'text-sm font-medium',
              daysToPreparation > 0 
                ? 'text-orange-600 dark:text-orange-400' 
                : 'text-gray-400 dark:text-gray-500'
            ]"
          >
            {{ getCountdownText(daysToPreparation, '筹备期') }}
          </span>
        </div>
      </div>

      <!-- 行业标签 -->
      <div class="flex flex-wrap gap-1">
        <UBadge
          v-for="industry in festival.industries.filter((i: string) => i !== 'all').slice(0, 2)"
          :key="industry"
          :label="getIndustryName(industry)"
          color="gray"
          variant="soft"
          size="xs"
        />
        <UBadge
          v-if="festival.industries.filter((i: string) => i !== 'all').length > 2"
          :label="`+${festival.industries.filter((i: string) => i !== 'all').length - 2}`"
          color="gray"
          variant="soft"
          size="xs"
        />
      </div>
    </div>

    <template #footer>
      <div class="flex justify-between items-center">
        <UButton
          label="查看营销方案"
          color="green"
          variant="solid"
          size="sm"
          @click="showMarketingPlan"
          class="flex-1 touch-target view-plan-btn"
        />
        <UButton
          v-if="hasExportPermission"
          label="导出"
          color="orange"
          variant="outline"
          size="sm"
          @click="exportFestival"
          class="ml-2 touch-target"
        />
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { safeLocalStorage } from '~/utils/client'

interface Festival {
  id: number
  name: string
  date: string
  preparationDays: number
  industries: string[]
  description: string
  marketingPlan: Record<string, string[]>
}

interface Props {
  festival: Festival
  selectedIndustry: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  showPlan: [festival: Festival]
  export: [festival: Festival]
}>()

// 响应式数据
const isFavorite = ref(false)

// 计算属性
const daysToFestival = computed(() => {
  const today = dayjs()
  const festivalDate = dayjs(props.festival.date)
  return festivalDate.diff(today, 'day')
})

const daysToPreparation = computed(() => {
  const today = dayjs()
  const preparationDate = dayjs(props.festival.date).subtract(props.festival.preparationDays, 'day')
  return preparationDate.diff(today, 'day')
})

const hasExportPermission = computed(() => {
  // 检查是否有导出权限（付费用户）
  return safeLocalStorage.getItem('exportPermission') === 'true'
})

const isExpired = computed(() => {
  // 检查节日是否已过
  const today = dayjs()
  const festivalDate = dayjs(props.festival.date)
  return festivalDate.isBefore(today, 'day')
})

// 方法
const formatDate = (date: string) => {
  return dayjs(date).format('MM-DD')
}

const getDayOfWeek = (date: string) => {
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  return weekdays[dayjs(date).day()]
}

const getCountdownText = (days: number, type: string) => {
  if (days > 0) {
    return `${days}天`
  } else if (days === 0) {
    return `今天`
  } else {
    return `已过`
  }
}

const getIndustryName = (industryId: string) => {
  const industryMap: Record<string, string> = {
    retail: '电商零售',
    food: '餐饮美食',
    beauty: '美妆护肤',
    education: '教育培训'
  }
  return industryMap[industryId] || industryId
}

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  
  // 保存到 localStorage
  const favorites = JSON.parse(safeLocalStorage.getItem('festivalFavorites') || '[]')
  if (isFavorite.value) {
    if (!favorites.includes(props.festival.id)) {
      favorites.push(props.festival.id)
    }
  } else {
    const index = favorites.indexOf(props.festival.id)
    if (index > -1) {
      favorites.splice(index, 1)
    }
  }
  safeLocalStorage.setItem('festivalFavorites', JSON.stringify(favorites))
}

const showMarketingPlan = () => {
  emit('showPlan', props.festival)
}

const exportFestival = () => {
  emit('export', props.festival)
}

// 初始化收藏状态
onMounted(() => {
  const favorites = JSON.parse(safeLocalStorage.getItem('festivalFavorites') || '[]')
  isFavorite.value = favorites.includes(props.festival.id)
})
</script>

<style scoped>
.festival-card {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.festival-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(to right, #3b82f6, #22c55e);
}

.favorite-btn {
  transition: all 0.2s ease;
}

.favorite-btn:hover {
  transform: scale(1.1);
}

/* 文本截断样式 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 移动端触控优化 */
.touch-target {
  min-height: 44px; /* 符合移动端触控标准 */
  min-width: 44px;
}

/* 确保卡片在移动端不会溢出 */
.festival-card {
  max-width: 100%;
  overflow: hidden;
}

/* 查看营销方案按钮自定义颜色 */
.view-plan-btn {
  background-color: #2ecc71 !important;
  border-color: #2ecc71 !important;
  color: white !important;
}

.view-plan-btn:hover {
  background-color: #27ae60 !important;
  border-color: #27ae60 !important;
}

/* 移动端按钮优化 */
@media (max-width: 640px) {
  .touch-target {
    min-height: 44px;
    padding: 12px 16px;
  }
  
  .favorite-btn {
    min-width: 44px;
    min-height: 44px;
  }
}
</style>
