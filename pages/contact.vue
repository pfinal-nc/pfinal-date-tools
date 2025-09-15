<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
    <!-- 导航栏 -->
    <UNavbar class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <template #left>
        <NuxtLink to="/" class="flex items-center space-x-3">
          <img src="~/assets/images/logo.png" alt="妙策" class="w-8 h-8 object-contain" />
          <h1 class="text-xl font-bold text-gray-900 dark:text-white">
            妙策
          </h1>
        </NuxtLink>
      </template>
      
      <template #right>
        <div class="flex items-center space-x-3">
          <NuxtLink to="/">
            <UButton label="返回首页" color="gray" variant="outline" size="sm" />
          </NuxtLink>
          <NuxtLink to="/about">
            <UButton label="关于我们" color="blue" variant="outline" size="sm" />
          </NuxtLink>
        </div>
      </template>
    </UNavbar>

    <!-- 主内容区 -->
    <UContainer class="py-8">
      <!-- 页面标题 -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          联系我们
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          如果您有任何问题、建议或需要帮助，欢迎随时联系我们
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- 联系表单 -->
        <div>
          <UCard>
            <template #header>
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                发送反馈
              </h2>
              <p class="text-gray-600 dark:text-gray-300">
                请填写以下表单，我们会尽快回复您
              </p>
            </template>

            <form @submit.prevent="submitForm" class="space-y-6">
              <!-- 姓名 -->
              <UFormGroup label="姓名" required>
                <UInput
                  v-model="form.name"
                  placeholder="请输入您的姓名"
                  :ui="{ icon: 'i-heroicons-user' }"
                />
              </UFormGroup>

              <!-- 邮箱 -->
              <UFormGroup label="邮箱" required>
                <UInput
                  v-model="form.email"
                  type="email"
                  placeholder="请输入您的邮箱地址"
                  :ui="{ icon: 'i-heroicons-envelope' }"
                />
              </UFormGroup>

              <!-- 主题 -->
              <UFormGroup label="主题" required>
                <USelect
                  v-model="form.subject"
                  :options="subjectOptions"
                  placeholder="请选择反馈主题"
                  :ui="{ icon: 'i-heroicons-tag' }"
                />
              </UFormGroup>

              <!-- 行业 -->
              <UFormGroup label="所属行业">
                <USelect
                  v-model="form.industry"
                  :options="industryOptions"
                  placeholder="请选择您的行业（可选）"
                  :ui="{ icon: 'i-heroicons-building-storefront' }"
                />
              </UFormGroup>

              <!-- 消息内容 -->
              <UFormGroup label="消息内容" required>
                <UTextarea
                  v-model="form.message"
                  placeholder="请详细描述您的问题或建议..."
                  :rows="6"
                  :ui="{ icon: 'i-heroicons-chat-bubble-left-right' }"
                />
              </UFormGroup>

              <!-- 提交按钮 -->
              <div class="flex justify-end">
                <UButton
                  type="submit"
                  label="发送消息"
                  color="blue"
                  variant="solid"
                  size="lg"
                  :loading="isSubmitting"
                  :disabled="!isFormValid"
                />
              </div>
            </form>
          </UCard>
        </div>

        <!-- 联系信息 -->
        <div class="space-y-8">
          <!-- 联系方式 -->
          <UCard>
            <template #header>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                联系方式
              </h3>
            </template>

            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <UIcon name="i-heroicons-envelope" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">邮箱</p>
                  <p class="text-gray-600 dark:text-gray-300">support@miao.friday-go.icu</p>
                </div>
              </div>

              <div class="flex items-center space-x-3">
                <UIcon name="i-heroicons-phone" class="w-6 h-6 text-green-600 dark:text-green-400" />
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">电话</p>
                  <p class="text-gray-600 dark:text-gray-300">400-123-4567</p>
                </div>
              </div>

              <div class="flex items-center space-x-3">
                <UIcon name="i-heroicons-clock" class="w-6 h-6 text-orange-600 dark:text-orange-400" />
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">工作时间</p>
                  <p class="text-gray-600 dark:text-gray-300">周一至周五 9:00-18:00</p>
                </div>
              </div>

              <div class="flex items-center space-x-3">
                <UIcon name="i-heroicons-map-pin" class="w-6 h-6 text-red-600 dark:text-red-400" />
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">地址</p>
                  <p class="text-gray-600 dark:text-gray-300">北京市朝阳区科技园区</p>
                </div>
              </div>
            </div>
          </UCard>

          <!-- 常见问题 -->
          <UCard>
            <template #header>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                常见问题
              </h3>
            </template>

            <div class="space-y-4">
              <UCollapsible>
                <UButton
                  label="如何导出节日数据？"
                  color="gray"
                  variant="ghost"
                  trailing-icon="i-lucide-chevron-down"
                  block
                />
                <template #content>
                  <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p class="text-sm text-gray-600 dark:text-gray-300">
                      点击页面右上角的"导出Excel"或"导出PDF"按钮即可导出当前筛选的节日数据。首次使用需要购买导出权限（9.9元）。
                    </p>
                  </div>
                </template>
              </UCollapsible>

              <UCollapsible>
                <UButton
                  label="如何收藏节日？"
                  color="gray"
                  variant="ghost"
                  trailing-icon="i-lucide-chevron-down"
                  block
                />
                <template #content>
                  <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p class="text-sm text-gray-600 dark:text-gray-300">
                      点击节日卡片右上角的心形图标即可收藏该节日。收藏的节日会保存在本地，刷新页面后仍可查看。
                    </p>
                  </div>
                </template>
              </UCollapsible>

              <UCollapsible>
                <UButton
                  label="数据多久更新一次？"
                  color="gray"
                  variant="ghost"
                  trailing-icon="i-lucide-chevron-down"
                  block
                />
                <template #content>
                  <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p class="text-sm text-gray-600 dark:text-gray-300">
                      节日数据每年12月中旬更新下一年度的完整数据。营销方案每季度更新2-3个节日的方案内容。
                    </p>
                  </div>
                </template>
              </UCollapsible>

              <UCollapsible>
                <UButton
                  label="支持哪些行业？"
                  color="gray"
                  variant="ghost"
                  trailing-icon="i-lucide-chevron-down"
                  block
                />
                <template #content>
                  <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p class="text-sm text-gray-600 dark:text-gray-300">
                      目前支持电商零售、餐饮美食、美妆护肤、教育培训四个主要行业。每个行业都有专属的营销方案和策略建议。
                    </p>
                  </div>
                </template>
              </UCollapsible>
            </div>
          </UCard>

          <!-- 社交媒体 -->
          <UCard>
            <template #header>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                关注我们
              </h3>
            </template>

            <div class="flex space-x-4">
              <UButton
                icon="i-heroicons-chat-bubble-left"
                color="green"
                variant="outline"
                size="lg"
                class="flex-1"
              >
                微信公众号
              </UButton>
              <UButton
                icon="i-heroicons-chat-bubble-left-right"
                color="red"
                variant="outline"
                size="lg"
                class="flex-1"
              >
                微博
              </UButton>
            </div>
          </UCard>
        </div>
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
// SEO 配置
useHead({
  title: '联系我们 - 妙策 | 技术支持与商务合作',
  meta: [
    {
      name: 'description',
      content: '联系妙策团队，获取技术支持、产品建议或商务合作信息。专业节日营销工具服务，为商家提供营销策划支持。节日营销日历,电商节日节点表,双11筹备时间表,母亲节餐饮促销方案,美妆节日营销,教育机构招生,营销策划工具。'
    },
    {
      name: 'keywords',
      content: '妙策联系方式,技术支持,商务合作,营销工具咨询,节日营销服务,节日营销日历,电商节日节点表,双11筹备时间表,母亲节餐饮促销方案,美妆节日营销,教育机构招生,营销策划工具'
    },
    {
      property: 'og:title',
      content: '联系我们 - 妙策 | 技术支持与商务合作'
    },
    {
      property: 'og:description',
      content: '联系妙策团队，获取技术支持、产品建议或商务合作信息。'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:url',
      content: 'https://miao.friday-go.icu/contact'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://miao.friday-go.icu/contact'
    }
  ]
})

// 表单数据
const form = ref({
  name: '',
  email: '',
  subject: '',
  industry: '',
  message: ''
})

const isSubmitting = ref(false)

// 选项数据
const subjectOptions = [
  { label: '功能建议', value: 'feature' },
  { label: '问题反馈', value: 'bug' },
  { label: '商务合作', value: 'business' },
  { label: '技术支持', value: 'support' },
  { label: '其他', value: 'other' }
]

const industryOptions = [
  { label: '电商零售', value: 'retail' },
  { label: '餐饮美食', value: 'food' },
  { label: '美妆护肤', value: 'beauty' },
  { label: '教育培训', value: 'education' },
  { label: '其他', value: 'other' }
]

// 表单验证
const isFormValid = computed(() => {
  return form.value.name && 
         form.value.email && 
         form.value.subject && 
         form.value.message
})

// 提交表单
const submitForm = async () => {
  if (!isFormValid.value) return

  isSubmitting.value = true

  try {
    // 模拟提交
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // 显示成功消息
    alert('消息发送成功！我们会尽快回复您。')
    
    // 重置表单
    form.value = {
      name: '',
      email: '',
      subject: '',
      industry: '',
      message: ''
    }
  } catch (error) {
    alert('发送失败，请稍后重试。')
  } finally {
    isSubmitting.value = false
  }
}
</script>
