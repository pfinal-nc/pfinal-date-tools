<template>
  <UModal v-model="isOpen" :ui="{ width: 'sm:max-w-2xl' }">
    <UCard>
      <template #header>
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ festival?.name }} 营销方案
          </h2>
          <UButton
            icon="i-heroicons-x-mark-20-solid"
            color="gray"
            variant="ghost"
            size="sm"
            @click="closeModal"
          />
        </div>
      </template>

      <div class="space-y-6">
        <!-- 节日基本信息 -->
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span class="text-gray-500 dark:text-gray-400">节日日期：</span>
              <span class="font-medium text-gray-900 dark:text-white">
                {{ formatFullDate(festival?.date) }}
              </span>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400">建议筹备：</span>
              <span class="font-medium text-gray-900 dark:text-white">
                {{ festival?.preparationDays }}天
              </span>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400">适用行业：</span>
              <span class="font-medium text-gray-900 dark:text-white">
                {{ getIndustryNames(festival?.industries) }}
              </span>
            </div>
            <div>
              <span class="text-gray-500 dark:text-gray-400">倒计时：</span>
              <span class="font-medium text-blue-600 dark:text-blue-400">
                {{ getCountdownText() }}
              </span>
            </div>
          </div>
        </div>

        <!-- 行业筛选 -->
        <div v-if="festival">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">
            选择行业查看专属方案
          </h3>
          <div class="flex flex-wrap gap-2">
            <UButton
              v-for="industry in availableIndustries"
              :key="industry.id"
              :label="industry.name"
              :color="selectedIndustry === industry.id ? 'blue' : 'gray'"
              :variant="selectedIndustry === industry.id ? 'solid' : 'outline'"
              size="sm"
              @click="selectedIndustry = industry.id"
            />
          </div>
        </div>

        <!-- 营销方案内容 -->
        <div v-if="selectedIndustry === 'all' && festival">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">
            全部行业营销方案
          </h3>
          <div class="space-y-6">
            <div
              v-for="(plans, industryId) in festival.marketingPlan"
              :key="industryId"
              v-if="plans && plans.length > 0"
              class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            >
              <div class="bg-gray-100 dark:bg-gray-800 px-4 py-2">
                <h4 class="font-medium text-gray-900 dark:text-white">
                  {{ getIndustryName(industryId) }}
                </h4>
              </div>
              <div class="p-4 space-y-3">
                <div
                  v-for="(plan, index) in plans"
                  :key="index"
                  class="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                >
                  <div class="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {{ index + 1 }}
                  </div>
                  <div class="flex-1">
                    <p class="text-sm text-gray-900 dark:text-white leading-relaxed">
                      {{ plan }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="currentMarketingPlan && currentMarketingPlan.length > 0">
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">
            {{ getIndustryName(selectedIndustry) }} 营销方案
          </h3>
          <div class="space-y-3">
            <div
              v-for="(plan, index) in currentMarketingPlan"
              :key="index"
              class="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
            >
              <div class="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                {{ index + 1 }}
              </div>
              <div class="flex-1">
                <p class="text-sm text-gray-900 dark:text-white leading-relaxed">
                  {{ plan }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- 无方案提示 -->
        <div v-else class="text-center py-8">
          <div class="text-gray-400 dark:text-gray-500">
            <UIcon name="i-heroicons-information-circle" class="w-12 h-12 mx-auto mb-3" />
            <p>该行业暂无专属营销方案</p>
            <p class="text-sm mt-1">请选择其他行业或查看通用方案</p>
          </div>
        </div>

        <!-- 营销建议 -->
        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <h4 class="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
            💡 营销建议
          </h4>
          <ul class="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• 提前 {{ festival?.preparationDays }} 天开始筹备活动</li>
            <li>• 结合节日特点设计专属营销主题</li>
            <li>• 利用社交媒体进行预热宣传</li>
            <li>• 准备多种营销方案以应对不同情况</li>
          </ul>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-between items-center">
          <UButton
            label="收藏方案"
            icon="i-heroicons-heart"
            color="red"
            variant="outline"
            size="sm"
            @click="addToFavorites"
          />
          <div class="flex space-x-2">
            <UButton
              label="复制方案"
              icon="i-heroicons-clipboard-document"
              color="gray"
              variant="outline"
              size="sm"
              @click="copyPlan"
            />
            <UButton
              label="关闭"
              color="gray"
              variant="solid"
              size="sm"
              @click="closeModal"
            />
          </div>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { safeClipboard } from '~/utils/client'

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

interface Props {
  modelValue: boolean
  festival: Festival | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  addToFavorites: [festival: Festival]
}>()

// 响应式数据
const selectedIndustry = ref('all')

// 计算属性
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const availableIndustries = computed(() => {
  if (!props.festival) return []
  
  const industryMap: Record<string, Industry> = {
    all: { id: 'all', name: '全部行业', description: '通用营销方案' },
    retail: { id: 'retail', name: '电商零售', description: '电商平台、实体零售店铺' },
    food: { id: 'food', name: '餐饮美食', description: '餐厅、外卖、食品销售' },
    beauty: { id: 'beauty', name: '美妆护肤', description: '化妆品、护肤品、美容服务' },
    education: { id: 'education', name: '教育培训', description: '培训机构、在线教育、技能培训' }
  }
  
  return props.festival.industries.map(id => industryMap[id]).filter(Boolean)
})

const currentMarketingPlan = computed(() => {
  if (!props.festival || selectedIndustry.value === 'all') return []
  return props.festival.marketingPlan[selectedIndustry.value] || []
})

// 方法
const formatFullDate = (date: string | undefined) => {
  if (!date) return ''
  return dayjs(date).format('YYYY年MM月DD日')
}

const getIndustryNames = (industries: string[] | undefined) => {
  if (!industries) return ''
  const industryMap: Record<string, string> = {
    retail: '电商零售',
    food: '餐饮美食',
    beauty: '美妆护肤',
    education: '教育培训'
  }
  return industries
    .filter(i => i !== 'all')
    .map(i => industryMap[i])
    .join('、')
}

const getCountdownText = () => {
  if (!props.festival) return ''
  const today = dayjs()
  const festivalDate = dayjs(props.festival.date)
  const days = festivalDate.diff(today, 'day')
  
  if (days > 0) {
    return `还有 ${days} 天`
  } else if (days === 0) {
    return '就是今天'
  } else {
    return `已过去 ${Math.abs(days)} 天`
  }
}

const getIndustryName = (industryId: string) => {
  const industryMap: Record<string, string> = {
    all: '全部行业',
    retail: '电商零售',
    food: '餐饮美食',
    beauty: '美妆护肤',
    education: '教育培训'
  }
  return industryMap[industryId] || industryId
}

const closeModal = () => {
  isOpen.value = false
}

const addToFavorites = () => {
  if (props.festival) {
    emit('addToFavorites', props.festival)
  }
}

const copyPlan = async () => {
  let planText = ''
  
  if (selectedIndustry.value === 'all') {
    // 复制所有行业的方案
    const allPlans: string[] = []
    if (props.festival) {
      // 添加节日信息
      allPlans.push(`【${props.festival.name}】营销方案`)
      allPlans.push(`节日日期：${formatFullDate(props.festival.date)}`)
      allPlans.push(`建议筹备：${props.festival.preparationDays}天`)
      allPlans.push('')
      
      Object.entries(props.festival.marketingPlan).forEach(([industryId, plans]) => {
        if (plans && plans.length > 0) {
          const industryName = getIndustryName(industryId)
          allPlans.push(`【${industryName}】`)
          plans.forEach((plan, index) => {
            allPlans.push(`${index + 1}. ${plan}`)
          })
          allPlans.push('') // 空行分隔
        }
      })
    }
    planText = allPlans.join('\n')
  } else {
    // 复制特定行业的方案
    if (!currentMarketingPlan.value.length) {
      console.log('该行业暂无营销方案')
      return
    }
    const industryName = getIndustryName(selectedIndustry.value)
    planText = `【${props.festival?.name}】${industryName}营销方案\n`
    planText += `节日日期：${formatFullDate(props.festival?.date)}\n`
    planText += `建议筹备：${props.festival?.preparationDays}天\n\n`
    planText += currentMarketingPlan.value.map((plan, index) => `${index + 1}. ${plan}`).join('\n')
  }
  
  if (planText.trim()) {
    const success = await safeClipboard.writeText(planText)
    if (success) {
      console.log('方案已复制到剪贴板')
      // 使用更友好的提示
      const notification = document.createElement('div')
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 9999;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease;
      `
      notification.textContent = '✅ 营销方案已复制到剪贴板！'
      document.body.appendChild(notification)
      
      // 3秒后自动移除
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification)
        }
      }, 3000)
    } else {
      console.error('复制失败')
      alert('复制失败，请手动复制')
    }
  } else {
    alert('暂无营销方案可复制')
  }
}

  // 监听弹窗打开，重置行业选择
  watch(() => props.modelValue, (newValue) => {
    if (newValue) {
      selectedIndustry.value = 'all'
    }
  })
</script>

<style scoped>
@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
