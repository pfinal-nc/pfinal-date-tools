<template>
  <section class="py-12 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
    <UContainer>
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          🎯 专业营销工具特色功能
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          为电商、餐饮、美妆、教育行业提供专业的节日营销解决方案
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- 实时倒计时 -->
        <UCard class="text-center hover:shadow-lg transition-shadow duration-300">
          <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <UIcon name="i-heroicons-clock" class="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            实时倒计时提醒
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            精确到天的节日倒计时，及时提醒营销筹备时间，不错过任何营销节点
          </p>
        </UCard>

        <!-- 行业定制方案 -->
        <UCard class="text-center hover:shadow-lg transition-shadow duration-300">
          <div class="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <UIcon name="i-heroicons-briefcase" class="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            行业定制营销方案
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            针对电商、餐饮、美妆、教育四大行业，提供专业可落地的营销策划方案
          </p>
        </UCard>

        <!-- 营销策略库 -->
        <UCard class="text-center hover:shadow-lg transition-shadow duration-300">
          <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <UIcon name="i-heroicons-light-bulb" class="w-8 h-8 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            丰富营销策略库
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            涵盖双11、618、春节等30+节日营销策略，包含促销活动策划、推广方案
          </p>
        </UCard>

        <!-- 数据导出 -->
        <UCard class="text-center hover:shadow-lg transition-shadow duration-300">
          <div class="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <UIcon name="i-heroicons-arrow-down-tray" class="w-8 h-8 text-orange-600 dark:text-orange-400" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            便捷数据导出
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            支持Excel、PDF格式导出，方便团队协作和营销方案存档
          </p>
        </UCard>

        <!-- 收藏管理 -->
        <UCard class="text-center hover:shadow-lg transition-shadow duration-300">
          <div class="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <UIcon name="i-heroicons-heart" class="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            智能收藏管理
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            一键收藏重要节日，个性化管理营销节点，提高工作效率
          </p>
        </UCard>

        <!-- 移动端优化 -->
        <UCard class="text-center hover:shadow-lg transition-shadow duration-300">
          <div class="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <UIcon name="i-heroicons-device-phone-mobile" class="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            移动端完美适配
          </h3>
          <p class="text-gray-600 dark:text-gray-300">
            响应式设计，手机、平板、电脑多端适配，随时随地查看营销日历
          </p>
        </UCard>
      </div>

      <!-- 营销关键词展示 -->
      <div class="mt-12 text-center">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          🎯 热门营销关键词
        </h3>
        <div class="flex flex-wrap justify-center gap-3">
          <UBadge
            v-for="keyword in marketingKeywords"
            :key="keyword"
            :label="keyword"
            color="blue"
            variant="soft"
            class="text-sm"
          />
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
// 营销关键词列表
const marketingKeywords = [
  '节日营销日历',
  '电商节日节点表',
  '双11筹备时间表',
  '母亲节餐饮促销方案',
  '美妆节日营销',
  '教育机构招生',
  '营销策划工具',
  '节日倒计时',
  '营销方案',
  '节日促销活动',
  '营销推广方案',
  '节日营销策略',
  '电商促销策划',
  '餐饮营销策划',
  '美妆营销策划',
  '教育营销策划',
  '双11营销方案',
  '618促销活动',
  '春节营销策划',
  '情人节营销方案',
  '母亲节促销活动',
  '父亲节营销策划',
  '教师节营销方案',
  '国庆节促销活动',
  '中秋节营销策划',
  '圣诞节营销方案',
  '元旦营销策划',
  '春节营销推广',
  '节日营销工具',
  '营销日历2025',
  '电商营销日历',
  '餐饮营销日历',
  '美妆营销日历',
  '教育营销日历',
  '节日营销节点',
  '营销时间节点',
  '促销时间表',
  '营销策划模板',
  '节日营销案例',
  '营销推广技巧',
  '电商促销技巧',
  '餐饮营销技巧',
  '美妆营销技巧',
  '教育营销技巧'
]
</script>
