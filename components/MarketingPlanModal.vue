<template>
  <!-- 自定义原生弹窗，使用 div + UCard 替代 UModal -->
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- 遮罩层 -->
    <div 
      class="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
      @click="closeModal"
    ></div>
    
    <!-- 弹窗内容 -->
    <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      <UCard class="border-0 shadow-none">
        <template #header>
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              {{ festival?.name }} 营销方案
            </h2>
            <button
              @click="closeModal"
              class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
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
                :class="[
                  selectedIndustry === industry.id ? 'industry-selected' : ''
                ]"
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
                      <p class="text-sm text-gray-900 dark:text-white leading-relaxed" v-html="plan.replace(/;/g, '<br>')">
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
                  <p class="text-sm text-gray-900 dark:text-white leading-relaxed" v-html="plan.replace(/;/g, '<br>')">
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
              <p class="text-sm mt-1">换个行业看看吧～</p>
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
              class="touch-target"
            />
            <div class="flex space-x-2">
              <UButton
                label="复制方案"
                icon="i-heroicons-clipboard-document"
                color="gray"
                variant="outline"
                size="sm"
                @click="copyPlan"
                class="touch-target"
              />
              <UButton
                label="下载Excel"
                icon="i-heroicons-arrow-down-tray"
                color="blue"
                variant="outline"
                size="sm"
                @click="downloadExcel"
                class="touch-target"
              />
              <UButton
                label="下载PDF"
                icon="i-heroicons-document-arrow-down"
                color="purple"
                variant="outline"
                size="sm"
                @click="downloadPDF"
                class="touch-target"
              />
              <button
                @click="closeModal"
                class="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors touch-target"
              >
                关闭
              </button>
            </div>
          </div>
        </template>
      </UCard>
    </div>
  </div>

  <!-- 赞助弹窗 -->
  <PaymentModal
    v-model="showSponsorModal"
    @payment-success="handlePaymentSuccess"
  />
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { safeClipboard } from '~/utils/client'
import { now } from '~/utils/time'
import PaymentModal from './PaymentModal.vue'

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
  'show-sponsor': []
}>()

// 添加赞助弹窗状态
const showSponsorModal = ref(false)

// 监听赞助弹窗状态变化
watch(showSponsorModal, (newValue) => {
  // 可以在这里添加状态变化的处理逻辑
})

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
  const today = now()
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
      // 直接显示赞助弹窗
      showSponsorModal.value = true
    } else {
      console.error('复制失败')
      // 复制失败时不显示弹框，只记录错误
    }
  } else {
    console.log('暂无营销方案可复制')
    // 没有方案时不显示弹框，只记录日志
  }
}

// 下载 Excel
const downloadExcel = async () => {
  try {
    // 动态导入 XLSX
    const XLSX = await import('xlsx')
    
    // 准备导出数据
    const exportData = [{
      '节日名称': props.festival?.name,
      '日期': formatFullDate(props.festival?.date),
      '距节日天数': dayjs(props.festival?.date).diff(dayjs(), 'day'),
      '筹备期天数': props.festival?.preparationDays,
      '适用行业': getIndustryNames(props.festival?.industries),
      '描述': props.festival?.description,
      '营销方案': currentMarketingPlan.value ? currentMarketingPlan.value.join('\n') : '暂无方案'
    }]

    // 创建工作簿
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(exportData)
    XLSX.utils.book_append_sheet(wb, ws, '营销方案')

    // 导出文件
    XLSX.writeFile(wb, `${props.festival?.name}_营销方案_${dayjs().format('YYYY-MM-DD')}.xlsx`)
    
    // 直接显示赞助弹窗
    showSponsorModal.value = true
    
  } catch (error) {
    console.error('下载Excel失败:', error)
    // 下载失败时不显示弹框，只记录错误
  }
}

// 下载 PDF
const downloadPDF = async () => {
  try {
    // 动态导入 html2pdf
    const html2pdf = (await import('html2pdf.js')).default
    
    // 创建PDF内容
    const content = document.createElement('div')
    content.innerHTML = `
      <div style="padding: 20px; font-family: 'Noto Sans SC', sans-serif;">
        <h1 style="text-align: center; color: #1f2937; margin-bottom: 30px;">
          ${props.festival?.name} 营销方案
        </h1>
        <div style="margin-bottom: 20px;">
          <p><strong>节日日期：</strong>${formatFullDate(props.festival?.date)}</p>
          <p><strong>建议筹备：</strong>${props.festival?.preparationDays}天</p>
          <p><strong>适用行业：</strong>${getIndustryNames(props.festival?.industries)}</p>
          <p><strong>倒计时：</strong>${getCountdownText()}</p>
        </div>
        <div style="margin-bottom: 20px;">
          <h2 style="color: #1f2937; margin-bottom: 10px;">营销方案</h2>
          ${currentMarketingPlan.value ? currentMarketingPlan.value.map((plan, index) => `
            <div style="margin-bottom: 10px; padding: 10px; background-color: #f3f4f6; border-radius: 5px;">
              <strong>${index + 1}.</strong> ${plan}
            </div>
          `).join('') : '<p>暂无营销方案</p>'}
        </div>
        <p style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
          生成时间：${dayjs().format('YYYY-MM-DD HH:mm:ss')}
        </p>
      </div>
    `

    // 配置PDF选项
    const opt = {
      margin: 1,
      filename: `${props.festival?.name}_营销方案_${dayjs().format('YYYY-MM-DD')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    }

    // 生成PDF
    html2pdf().set(opt).from(content).save()
    
    // 直接显示赞助弹窗
    showSponsorModal.value = true
    
  } catch (error) {
    console.error('下载PDF失败:', error)
    // 下载失败时不显示弹框，只记录错误
  }
}

// 支付成功处理
const handlePaymentSuccess = () => {
  console.log('支付成功，导出权限已解锁')
  // 可以在这里添加其他支付成功后的逻辑
}

  // 监听弹窗打开，重置行业选择和赞助弹窗状态
  watch(() => props.modelValue, (newValue) => {
    if (newValue) {
      selectedIndustry.value = 'all'
      showSponsorModal.value = false // 确保赞助弹窗关闭
    }
  })

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
/* 弹窗动画 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 弹窗容器动画 */
.fixed.inset-0 {
  animation: fadeIn 0.2s ease-out;
}

/* 移动端触控优化 */
.touch-target {
  min-height: 44px; /* 符合移动端触控标准 */
  min-width: 44px;
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

/* 移动端按钮优化 */
@media (max-width: 640px) {
  .touch-target {
    min-height: 44px;
    padding: 12px 16px;
  }
  
  /* 移动端弹窗优化 */
  .fixed.inset-0 {
    padding: 1rem;
  }
  
  .max-w-2xl {
    max-width: 100%;
  }
}

/* 确保弹窗在最上层 */
.z-50 {
  z-index: 50;
}

/* 滚动条样式 */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.5);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.8);
}
</style>
