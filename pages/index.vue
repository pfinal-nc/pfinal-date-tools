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
          <UButton
            label="导出Excel"
            icon="i-heroicons-arrow-down-tray"
            color="orange"
            variant="outline"
            size="sm"
            @click="exportToExcel"
          />
          <UButton
            label="导出PDF"
            icon="i-heroicons-document-arrow-down"
            color="orange"
            variant="outline"
            size="sm"
            @click="exportToPDF"
          />
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
          📅 妙策 - 2025节日营销日历
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
        <div class="flex flex-wrap gap-2 sm:gap-3">
          <UButton
            v-for="industry in industries"
            :key="industry.id"
            :label="industry.name"
            :color="selectedIndustry === industry.id ? 'blue' : 'gray'"
            :variant="selectedIndustry === industry.id ? 'solid' : 'outline'"
            size="sm"
            @click="selectedIndustry = industry.id"
            class="transition-all duration-200 hover:scale-105"
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
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full" style="display: grid !important;"> 
          <FestivalCard
            v-for="festival in filteredFestivals"
            :key="festival.id"
            :festival="festival"
            :selected-industry="selectedIndustry"
            @show-plan="showMarketingPlan"
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
          该行业暂无节日数据，请选择其他行业查看
        </p>
      </div>

    </UContainer>

    <!-- 页脚 -->
    <footer class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-8 mt-16">
      <UContainer>
        <div class="text-center">
          <div class="flex justify-center items-center space-x-3 mb-4">
            <img src="~/assets/images/logo.png" alt="妙策" class="w-8 h-8 object-contain" />
            <span class="text-lg font-semibold text-gray-900 dark:text-white">妙策</span>
          </div>
          <div class="text-gray-500 dark:text-gray-400">
            <p>© 2025 妙策 | 数据每年更新</p>
            <p class="text-sm mt-1">
              专业的节日营销工具，助力商家提升营销效果
            </p>
          </div>
        </div>
      </UContainer>
    </footer>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { safeLocalStorage } from '~/utils/client'

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
  title: '妙策 - 2025节日营销日历 | 电商/餐饮/美妆/教育专用（带倒计时+促销方案）',
  meta: [
    {
      name: 'description',
      content: '妙策 - 专业的节日营销日历工具，提供电商、餐饮、美妆、教育行业的节日营销节点查询，实时倒计时提醒，可落地的营销方案。支持双11、618、春节等30+节日营销策划。'
    },
    {
      name: 'keywords',
      content: '节日营销日历,电商节日节点表,双11筹备时间表,母亲节餐饮促销方案,美妆节日营销,教育机构招生,营销策划工具,节日倒计时,营销方案'
    },
    {
      property: 'og:title',
      content: '妙策 - 2025节日营销日历 | 专业营销工具'
    },
    {
      property: 'og:description',
      content: '专业的节日营销日历工具，提供行业定制化营销方案和实时倒计时提醒。支持30+节日营销策划，助力商家提升营销效果。'
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
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: '妙策 - 2025节日营销日历'
    },
    {
      name: 'twitter:description',
      content: '专业的节日营销日历工具，提供行业定制化营销方案和实时倒计时提醒。'
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

// 调试信息
console.log('节日数据:', festivalData)
console.log('节日数量:', festivalData?.festivals?.length || 0)
console.log('行业数量:', festivalData?.industries?.length || 0)

// 计算属性
const festivals = computed(() => festivalData?.festivals || [])
const industries = computed(() => festivalData?.industries || [])

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
    const favorites = JSON.parse(safeLocalStorage.getItem('festivalFavorites') || '[]')
    filtered = filtered.filter(festival => favorites.includes(festival.id))
  }

  // 按日期排序，已过的节日放到最后
  const sorted = filtered.sort((a, b) => {
    const today = dayjs()
    const dateA = dayjs(a.date)
    const dateB = dayjs(b.date)
    
    // 检查是否已过
    const isExpiredA = dateA.isBefore(today, 'day')
    const isExpiredB = dateB.isBefore(today, 'day')
    
    // 如果一个是已过的，一个是未过的，未过的排在前面
    if (isExpiredA && !isExpiredB) return 1
    if (!isExpiredA && isExpiredB) return -1
    
    // 如果都是已过的或都是未过的，按日期排序
    return dateA.diff(dateB)
  })
  
  // 调试信息
  console.log('筛选后的节日数量:', sorted.length)
  console.log('当前行业:', selectedIndustry.value)
  console.log('显示收藏:', showFavorites.value)
  
  return sorted
})

const upcomingFestivals = computed(() => {
  return filteredFestivals.value.filter(festival => {
    const days = dayjs(festival.date).diff(dayjs(), 'day')
    return days >= 0 && days <= 30
  })
})

const expiredFestivals = computed(() => {
  return filteredFestivals.value.filter(festival => {
    const days = dayjs(festival.date).diff(dayjs(), 'day')
    return days < 0
  })
})

const preparationFestivals = computed(() => {
  return filteredFestivals.value.filter(festival => {
    const preparationDate = dayjs(festival.date).subtract(festival.preparationDays, 'day')
    const days = preparationDate.diff(dayjs(), 'day')
    return days >= 0 && days <= 15
  })
})

const favoriteCount = computed(() => {
  const favorites = JSON.parse(safeLocalStorage.getItem('festivalFavorites') || '[]')
  return favorites.length
})

const hasFavorites = computed(() => {
  return favoriteCount.value > 0
})

// 方法
const showMarketingPlan = (festival: any) => {
  selectedFestival.value = festival
  showModal.value = true
}

const addToFavorites = (festival: any) => {
  const favorites = JSON.parse(safeLocalStorage.getItem('festivalFavorites') || '[]')
  if (!favorites.includes(festival.id)) {
    favorites.push(festival.id)
    safeLocalStorage.setItem('festivalFavorites', JSON.stringify(favorites))
  }
}

const exportFestival = (festival: any) => {
  // 单个节日导出功能
  console.log('导出节日:', festival.name)
}

const exportToExcel = async () => {
  // 检查导出权限
  if (safeLocalStorage.getItem('exportPermission') !== 'true') {
    alert('请先购买导出权限（9.9元）')
    return
  }

  try {
    // 动态导入 XLSX
    const XLSX = await import('xlsx')
    
    // 准备导出数据
    const exportData = filteredFestivals.value.map(festival => ({
      '节日名称': festival.name,
      '日期': dayjs(festival.date).format('YYYY-MM-DD'),
      '距节日天数': dayjs(festival.date).diff(dayjs(), 'day'),
      '筹备期天数': festival.preparationDays,
      '适用行业': festival.industries.filter(i => i !== 'all').join('、'),
      '描述': festival.description
    }))

    // 创建工作簿
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(exportData)
    XLSX.utils.book_append_sheet(wb, ws, '节日营销日历')

    // 导出文件
    XLSX.writeFile(wb, `节日营销日历_${dayjs().format('YYYY-MM-DD')}.xlsx`)
  } catch (error) {
    console.error('导出Excel失败:', error)
    alert('导出失败，请稍后重试')
  }
}

const exportToPDF = async () => {
  // 检查导出权限
  if (safeLocalStorage.getItem('exportPermission') !== 'true') {
    alert('请先购买导出权限（9.9元）')
    return
  }

  try {
    // 动态导入 html2pdf
    const html2pdf = (await import('html2pdf.js')).default
    
    // 创建PDF内容
    const content = document.createElement('div')
    content.innerHTML = `
      <div style="padding: 20px; font-family: 'Noto Sans SC', sans-serif;">
        <h1 style="text-align: center; color: #1f2937; margin-bottom: 30px;">
          2025节日营销日历
        </h1>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f3f4f6;">
              <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left;">节日名称</th>
              <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left;">日期</th>
              <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left;">距节日天数</th>
              <th style="border: 1px solid #d1d5db; padding: 8px; text-align: left;">筹备期天数</th>
            </tr>
          </thead>
          <tbody>
            ${filteredFestivals.value.map(festival => `
              <tr>
                <td style="border: 1px solid #d1d5db; padding: 8px;">${festival.name}</td>
                <td style="border: 1px solid #d1d5db; padding: 8px;">${dayjs(festival.date).format('YYYY-MM-DD')}</td>
                <td style="border: 1px solid #d1d5db; padding: 8px;">${dayjs(festival.date).diff(dayjs(), 'day')}</td>
                <td style="border: 1px solid #d1d5db; padding: 8px;">${festival.preparationDays}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <p style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
          生成时间：${dayjs().format('YYYY-MM-DD HH:mm:ss')}
        </p>
      </div>
    `

    // 配置PDF选项
    const opt = {
      margin: 1,
      filename: `节日营销日历_${dayjs().format('YYYY-MM-DD')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    }

    // 生成PDF
    html2pdf().set(opt).from(content).save()
  } catch (error) {
    console.error('导出PDF失败:', error)
    alert('导出失败，请稍后重试')
  }
}

// 自动刷新倒计时（每小时）
let refreshTimer: NodeJS.Timeout

onMounted(() => {
  refreshTimer = setInterval(() => {
    // 触发响应式更新
    nextTick(() => {
      // 这里可以添加刷新逻辑
    })
  }, 3600000) // 每小时刷新一次
})

onUnmounted(() => {
  if (refreshTimer) {
    clearInterval(refreshTimer)
  }
})
</script>
