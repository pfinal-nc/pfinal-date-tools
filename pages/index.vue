<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
    <!-- 导航栏 -->
    <UNavbar class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <template #left>
        <div class="flex items-center space-x-3">
          <img src="~/assets/images/logo.png" alt="妙策" class="w-8 h-8 object-contain" />
          <h1 class="text-xl font-bold text-gray-900 dark:text-white">
            妙策
          </h1>
        </div>
      </template>
      
      <template #right>
        <div class="flex items-center space-x-3">
          <!-- 导出按钮已移除，现在在营销方案弹窗中 -->
        </div>
      </template>
    </UNavbar>

    <!-- 主内容区 -->
    <UContainer class="py-8">
      <!-- 页面标题 -->
      <div class="text-center mb-8">
        <div class="flex justify-center mb-4">
          <img src="~/assets/images/logo.png" alt="妙策" class="w-16 h-16 object-contain" />
        </div>
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          📅 妙策 - 2026节日营销日历
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          带倒计时 + 促销方案的专业营销工具
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
          实时更新 · 行业定制 · 可落地方案
        </p>
      </div>

      <!-- 行业筛选 -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          选择行业
        </h3>
        <div class="flex gap-2 sm:gap-3 overflow-x-auto pb-2 industry-scrollbar">
          <UButton
            v-for="industry in industries"
            :key="industry.id"
            :label="industry.name"
            :color="selectedIndustry === industry.id ? 'blue' : 'gray'"
            :variant="selectedIndustry === industry.id ? 'solid' : 'outline'"
            size="sm"
            @click="selectedIndustry = industry.id"
            :class="[
              'transition-all duration-200 hover:scale-105 flex-shrink-0',
              selectedIndustry === industry.id ? 'industry-selected' : ''
            ]"
          />
          <!-- 收藏按钮 -->
          <UButton
            v-if="hasFavorites"
            label="我的收藏"
            icon="i-heroicons-heart"
            color="red"
            variant="outline"
            size="sm"
            @click="showFavorites = !showFavorites"
            :class="{ 'bg-red-50 dark:bg-red-900/20': showFavorites }"
            class="flex-shrink-0"
          />
        </div>
      </div>

      <!-- 统计信息 -->
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <UCard class="text-center">
          <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {{ filteredFestivals.length }}
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">节日总数</div>
        </UCard>
        <UCard class="text-center">
          <div class="text-2xl font-bold text-green-600 dark:text-green-400">
            {{ upcomingFestivals.length }}
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">即将到来</div>
        </UCard>
        <UCard class="text-center">
          <div class="text-2xl font-bold text-orange-600 dark:text-orange-400">
            {{ preparationFestivals.length }}
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">筹备期</div>
        </UCard>
        <UCard class="text-center">
          <div class="text-2xl font-bold text-gray-600 dark:text-gray-400">
            {{ expiredFestivals.length }}
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">已过节日</div>
        </UCard>
        <UCard class="text-center">
          <div class="text-2xl font-bold text-red-600 dark:text-red-400">
            {{ favoriteCount }}
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">已收藏</div>
        </UCard>
      </div>

      <!-- 营销方案弹窗 -->
      <MarketingPlanModal
        v-model="showModal"
        :festival="selectedFestival"
        @add-to-favorites="addToFavorites"

      />



      <!-- 节日列表 -->
      <div v-if="filteredFestivals.length > 0">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            {{ showFavorites ? '我的收藏' : '节日列表' }}
            <span class="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
              ({{ filteredFestivals.length }}个节日)
            </span>
          </h3>
        </div>
        <div class="festival-list grid grid-cols-1 gap-4 sm:gap-6 w-full"> 
          <FestivalCard
            v-for="(festival, index) in filteredFestivals"
            :key="festival.id"
            :festival="festival"
            :selected-industry="selectedIndustry"
            @show-plan="(festival: any) => showMarketingPlan(festival, index)"
            @export="exportFestival"
          />
        </div>
      </div>

      <!-- 空状态 -->
      <div v-else class="text-center py-16">
        <UIcon name="i-heroicons-calendar" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          暂无节日数据
        </h3>
        <p class="text-gray-500 dark:text-gray-400">
          该行业暂无节日数据，换个行业看看吧～
        </p>
      </div>

    </UContainer>

    <!-- 营销特色功能展示 -->
    <MarketingFeatures />

    <!-- 页脚 -->
    <footer class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-8 mt-16">
      <UContainer>
        <div class="text-center">
          <div class="flex justify-center items-center space-x-3 mb-4">
            <img src="~/assets/images/logo.png" alt="妙策" class="w-8 h-8 object-contain" />
            <span class="text-lg font-semibold text-gray-900 dark:text-white">妙策</span>
          </div>
          <div class="text-gray-500 dark:text-gray-400">
            <p>© 2026 妙策 | 数据每年更新</p>
            <p class="text-sm mt-1">
              专业的节日营销工具，助力商家提升营销效果
            </p>
            <div class="mt-4 text-xs text-gray-400">
              <p>节日营销日历 | 电商节日节点表 | 双11筹备时间表 | 母亲节餐饮促销方案 | 美妆节日营销 | 教育机构招生</p>
              <p>营销策划工具 | 节日倒计时 | 营销方案 | 节日促销活动 | 营销推广方案 | 节日营销策略</p>
            </div>
          </div>
        </div>
      </UContainer>
    </footer>
    
    <!-- 时间控制面板 -->
    <TimeControlPanel />
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { safeLocalStorage } from '~/utils/client'
import { now } from '~/utils/time'
import TimeControlPanel from '~/components/TimeControlPanel.vue'

// 类型定义
interface Festival {
  id: number
  name: string
  date: string
  preparationDays: number
  industries: string[]
  description: string
  marketingPlan: Record<string, string[]>
}

interface Industry {
  id: string
  name: string
  description: string
}

interface FestivalData {
  festivals: Festival[]
  industries: Industry[]
}

// SEO 配置
useHead({
  title: '妙策 - 2026节日营销日历 | 电商/餐饮/美妆/教育行业营销策划工具（双11/618/春节促销方案+倒计时提醒）',
  meta: [
    {
      name: 'description',
      content: '妙策是专业的节日营销日历工具，提供电商、餐饮、美妆、教育行业的节日营销节点查询，实时倒计时提醒，可落地的营销方案。支持双11、618、春节等30+节日营销策划，包含促销活动策划、营销推广方案、节日营销策略。节日营销日历,电商节日节点表,双11筹备时间表,母亲节餐饮促销方案,美妆节日营销,教育机构招生,营销策划工具。'
    },
    {
      name: 'keywords',
      content: '节日营销日历,电商节日节点表,双11筹备时间表,母亲节餐饮促销方案,美妆节日营销,教育机构招生,营销策划工具,节日倒计时,营销方案,节日促销活动,营销推广方案,节日营销策略,电商促销策划,餐饮营销策划,美妆营销策划,教育营销策划,双11营销方案,618促销活动,春节营销策划,情人节营销方案,母亲节促销活动,父亲节营销策划,教师节营销方案,国庆节促销活动,中秋节营销策划,圣诞节营销方案,元旦营销策划,春节营销推广,节日营销工具,营销日历2026,电商营销日历,餐饮营销日历,美妆营销日历,教育营销日历,节日营销节点,营销时间节点,促销时间表,营销策划模板,节日营销案例,营销推广技巧,电商促销技巧,餐饮营销技巧,美妆营销技巧,教育营销技巧'
    },
    {
      property: 'og:title',
      content: '妙策 - 2026节日营销日历 | 电商/餐饮/美妆/教育行业营销策划工具'
    },
    {
      property: 'og:description',
      content: '专业的节日营销日历工具，提供电商、餐饮、美妆、教育行业的节日营销节点查询，实时倒计时提醒，可落地的营销方案。支持双11、618、春节等30+节日营销策划，包含促销活动策划、营销推广方案、节日营销策略。'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:url',
      content: 'https://miao.friday-go.icu'
    },
    {
      property: 'og:image',
      content: 'https://miao.friday-go.icu/logo.png'
    },
    {
      property: 'og:image:width',
      content: '1200'
    },
    {
      property: 'og:image:height',
      content: '630'
    },
    {
      property: 'og:image:alt',
      content: '妙策节日营销日历工具'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: '妙策 - 2026节日营销日历 | 专业营销策划工具'
    },
    {
      name: 'twitter:description',
      content: '专业的节日营销日历工具，提供电商、餐饮、美妆、教育行业的节日营销节点查询，实时倒计时提醒，可落地的营销方案。'
    },
    {
      name: 'twitter:image',
      content: 'https://miao.friday-go.icu/logo.png'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://miao.friday-go.icu'
    }
  ]
})

// 响应式数据
const selectedIndustry = ref('all')
const showModal = ref(false)
const selectedFestival = ref(null)
const showFavorites = ref(false)




// 获取节日数据
import festivalData from '~/data/festivals.json'

// 使用 shallowRef 避免深层响应式，提升性能
const festivalDataRef = shallowRef(festivalData)

// 数据验证
if (!festivalDataRef.value?.festivals?.length) {
  console.warn('节日数据为空')
}

// 计算属性 - 使用 markRaw 避免不必要的响应式包装
const festivals = computed(() => markRaw(festivalDataRef.value?.festivals || []))
const industries = computed(() => markRaw(festivalDataRef.value?.industries || []))

// 缓存收藏数据，避免重复解析
const favoritesCache = ref<number[]>([])

// 更新收藏缓存
const updateFavoritesCache = () => {
  favoritesCache.value = JSON.parse(safeLocalStorage.getItem('festivalFavorites') || '[]')
}

// 初始化时更新缓存
onMounted(() => {
  updateFavoritesCache()
})

const filteredFestivals = computed(() => {
  let filtered = festivals.value

  // 按行业筛选
  if (selectedIndustry.value !== 'all') {
    filtered = filtered.filter(festival => 
      festival.industries.includes(selectedIndustry.value)
    )
  }

  // 收藏筛选
  if (showFavorites.value) {
    filtered = filtered.filter(festival => favoritesCache.value.includes(festival.id))
  }

  // 按日期排序，已过的节日放到最后
  const sorted = filtered.sort((a, b) => {
    const today = now()
    const dateA = dayjs(a.date)
    const dateB = dayjs(b.date)
    
    // 检查是否已过
    const isExpiredA = dateA.isBefore(today, 'day')
    const isExpiredB = dateB.isBefore(today, 'day')
    
    // 如果一个是已过的，一个是未过的，未过的排在前面
    if (isExpiredA && !isExpiredB) return 1
    if (!isExpiredA && isExpiredB) return -1
    
    // 如果都是已过的，按日期升序排列（较近的已过节日在前）
    if (isExpiredA && isExpiredB) {
      return dateA.diff(dateB)
    }
    
    // 如果都是未过的，按日期升序排列（较近的未过节日在前）
    return dateA.diff(dateB)
  })
  
  return sorted
})

const upcomingFestivals = computed(() => {
  return filteredFestivals.value.filter(festival => {
    const days = dayjs(festival.date).diff(now(), 'day')
    return days >= 0 && days <= 30
  })
})

const expiredFestivals = computed(() => {
  return filteredFestivals.value.filter(festival => {
    const days = dayjs(festival.date).diff(now(), 'day')
    return days < 0
  })
})

const preparationFestivals = computed(() => {
  return filteredFestivals.value.filter(festival => {
    const preparationDate = dayjs(festival.date).subtract(festival.preparationDays, 'day')
    const days = preparationDate.diff(now(), 'day')
    return days >= 0 && days <= 15
  })
})

const favoriteCount = computed(() => {
  return favoritesCache.value.length
})

const hasFavorites = computed(() => {
  return favoriteCount.value > 0
})

// 方法
const showMarketingPlan = (festival: any, index?: number) => {
  selectedFestival.value = festival
  showModal.value = true
}

const addToFavorites = (festival: any) => {
  const favorites = JSON.parse(safeLocalStorage.getItem('festivalFavorites') || '[]')
  if (!favorites.includes(festival.id)) {
    favorites.push(festival.id)
    safeLocalStorage.setItem('festivalFavorites', JSON.stringify(favorites))
    // 同步更新缓存
    updateFavoritesCache()
  }
}

const exportFestival = (festival: any) => {
  // 单个节日导出功能
  console.log('导出节日:', festival.name)
}





// 自动刷新倒计时（每小时）
let refreshTimer: NodeJS.Timeout

onMounted(() => {
  updateFavoritesCache()
  
  // 每小时刷新倒计时
  refreshTimer = setInterval(() => {
    // 触发响应式更新，强制重新计算倒计时
    nextTick(() => {
      // 通过更新一个响应式变量来触发重新渲染
      const now = Date.now()
      // 这里可以添加任何响应式更新逻辑
    })
  }, 3600000) // 每小时刷新一次 (3600000ms = 1小时)
})

onUnmounted(() => {
  if (refreshTimer) {
    clearInterval(refreshTimer)
  }
})
</script>

<style scoped>
/* 行业筛选栏移动端滚动优化 */
.industry-scrollbar {
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.industry-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari and Opera */
}

/* 节日列表响应式布局 */
.festival-list {
  grid-template-columns: repeat(1, 1fr); /* 移动端 1 列 */
}

/* 平板端 2 列 */
@media (min-width: 768px) {
  .festival-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 桌面端 3 列 */
@media (min-width: 1024px) {
  .festival-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* 大屏端 4 列 */
@media (min-width: 1280px) {
  .festival-list {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* 行业按钮选中态自定义颜色 */
.industry-selected {
  background-color: #3498db !important;
  border-color: #3498db !important;
  color: white !important;
}

.industry-selected:hover {
  background-color: #2980b9 !important;
  border-color: #2980b9 !important;
}



/* 确保按钮在移动端有足够的点击区域 */
@media (max-width: 640px) {
  .industry-scrollbar button {
    min-width: 80px;
    padding: 8px 12px;
    min-height: 44px; /* 符合移动端触控标准 */
  }
}
</style>
