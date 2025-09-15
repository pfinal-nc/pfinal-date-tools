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
          <NuxtLink to="/contact">
            <UButton label="联系我们" color="blue" variant="outline" size="sm" />
          </NuxtLink>
        </div>
      </template>
    </UNavbar>

    <!-- 主内容区 -->
    <UContainer class="py-8">
      <!-- 页面标题 -->
      <div class="text-center mb-12">
        <div class="flex justify-center mb-6">
          <img src="~/assets/images/logo.png" alt="妙策" class="w-20 h-20 object-contain" />
        </div>
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          关于妙策
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          专业的节日营销工具，为商家提供精准的营销节点查询和可落地的营销方案
        </p>
      </div>

      <!-- 功能特色 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <UCard class="text-center">
          <template #header>
            <div class="flex justify-center mb-4">
              <UIcon name="i-heroicons-clock" class="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
          </template>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            实时倒计时
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            精确显示距离节日的天数，以及建议的筹备期提醒，帮助商家提前规划营销活动
          </p>
        </UCard>

        <UCard class="text-center">
          <template #header>
            <div class="flex justify-center mb-4">
              <UIcon name="i-heroicons-building-storefront" class="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
          </template>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            行业定制
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            针对电商、餐饮、美妆、教育等不同行业，提供专属的营销方案和策略建议
          </p>
        </UCard>

        <UCard class="text-center">
          <template #header>
            <div class="flex justify-center mb-4">
              <UIcon name="i-heroicons-light-bulb" class="w-12 h-12 text-orange-600 dark:text-orange-400" />
            </div>
          </template>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            可落地方案
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            提供具体可执行的营销方案，包括活动设计、推广策略和效果评估方法
          </p>
        </UCard>
      </div>

      <!-- 使用指南 -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          使用指南
        </h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="space-y-6">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  选择行业
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  根据您的业务类型，选择对应的行业分类，系统会自动筛选相关的节日营销节点
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  查看倒计时
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  每个节日卡片显示距离节日的天数，以及建议的筹备期，帮助您合理安排营销计划
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  获取营销方案
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  点击"查看营销方案"按钮，获取针对您行业的专属营销策略和活动建议
                </p>
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  收藏重要节日
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  点击节日卡片上的心形图标，收藏您关注的节日，方便快速查看和管理
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                5
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  导出数据
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  购买导出权限后，可以将节日数据导出为Excel或PDF格式，方便团队共享和存档
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                6
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  制定营销计划
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  根据倒计时和营销方案，制定详细的营销计划，确保在最佳时机推出活动
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 适用行业 -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          适用行业
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <UCard class="text-center hover:shadow-lg transition-shadow">
            <template #header>
              <UIcon name="i-heroicons-shopping-cart" class="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
            </template>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              电商零售
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              电商平台、实体零售店铺，适合各类促销活动和节日营销
            </p>
          </UCard>

          <UCard class="text-center hover:shadow-lg transition-shadow">
            <template #header>
              <UIcon name="i-heroicons-cake" class="w-12 h-12 text-green-600 dark:text-green-400 mx-auto mb-3" />
            </template>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              餐饮美食
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              餐厅、外卖、食品销售，节日聚餐和特色菜品营销
            </p>
          </UCard>

          <UCard class="text-center hover:shadow-lg transition-shadow">
            <template #header>
              <UIcon name="i-heroicons-sparkles" class="w-12 h-12 text-pink-600 dark:text-pink-400 mx-auto mb-3" />
            </template>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              美妆护肤
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              化妆品、护肤品、美容服务，节日礼盒和美容套餐
            </p>
          </UCard>

          <UCard class="text-center hover:shadow-lg transition-shadow">
            <template #header>
              <UIcon name="i-heroicons-academic-cap" class="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
            </template>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              教育培训
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              培训机构、在线教育、技能培训，课程促销和招生活动
            </p>
          </UCard>
        </div>
      </div>

      <!-- 更新日志 -->
      <div class="mb-16">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          更新日志
        </h2>
        
        <div class="space-y-6">
          <UCard>
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  v1.0.0 - 2025年1月
                </h3>
                <ul class="text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• 发布节日营销日历基础版本</li>
                  <li>• 支持4个主要行业的节日筛选</li>
                  <li>• 实现实时倒计时功能</li>
                  <li>• 提供行业定制化营销方案</li>
                  <li>• 支持节日收藏和导出功能</li>
                </ul>
              </div>
              <UBadge label="最新" color="green" variant="soft" />
            </div>
          </UCard>
        </div>
      </div>

      <!-- 联系我们 -->
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          需要帮助？
        </h2>
        <p class="text-gray-600 dark:text-gray-300 mb-6">
          如果您有任何问题或建议，欢迎联系我们
        </p>
        <NuxtLink to="/contact">
          <UButton label="联系我们" color="blue" variant="solid" size="lg" />
        </NuxtLink>
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
  title: '关于我们 - 妙策 | 专业节日营销工具介绍',
  meta: [
    {
      name: 'description',
      content: '了解妙策节日营销日历的功能特色、使用指南和适用行业。专业的节日营销工具，支持电商、餐饮、美妆、教育行业，提供实时倒计时和可落地营销方案。节日营销日历,电商节日节点表,双11筹备时间表,母亲节餐饮促销方案,美妆节日营销,教育机构招生,营销策划工具。'
    },
    {
      name: 'keywords',
      content: '妙策介绍,节日营销工具,营销策划软件,电商营销方案,餐饮营销策略,美妆营销工具,教育营销方案,节日营销日历,电商节日节点表,双11筹备时间表,母亲节餐饮促销方案,美妆节日营销,教育机构招生,营销策划工具'
    },
    {
      property: 'og:title',
      content: '关于我们 - 妙策 | 专业节日营销工具介绍'
    },
    {
      property: 'og:description',
      content: '了解妙策的功能特色、使用指南和适用行业。专业的节日营销工具，支持多行业营销策划。'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      property: 'og:url',
      content: 'https://miao.friday-go.icu/about'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://miao.friday-go.icu/about'
    }
  ]
})
</script>
