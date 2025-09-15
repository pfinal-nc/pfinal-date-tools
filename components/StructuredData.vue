<template>
  <!-- 这是一个无渲染组件，只用于生成结构化数据 -->
</template>

<script setup lang="ts">
// 网站结构化数据
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: '妙策',
  url: 'https://miao.friday-go.icu',
  description: '妙策是专业的节日营销日历工具，提供电商、餐饮、美妆、教育行业的节日营销节点查询，实时倒计时提醒，可落地的营销方案。支持双11、618、春节等30+节日营销策划，包含促销活动策划、营销推广方案、节日营销策略。节日营销日历,电商节日节点表,双11筹备时间表,母亲节餐饮促销方案,美妆节日营销,教育机构招生,营销策划工具。',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://miao.friday-go.icu/?search={search_term_string}',
    'query-input': 'required name=search_term_string'
  },
  keywords: '节日营销日历,电商节日节点表,双11筹备时间表,母亲节餐饮促销方案,美妆节日营销,教育机构招生,营销策划工具,节日倒计时,营销方案,节日促销活动,营销推广方案,节日营销策略,电商促销策划,餐饮营销策划,美妆营销策划,教育营销策划,双11营销方案,618促销活动,春节营销策划,情人节营销方案,母亲节促销活动,父亲节营销策划,教师节营销方案,国庆节促销活动,中秋节营销策划,圣诞节营销方案,元旦营销策划,春节营销推广,节日营销工具,营销日历2025,电商营销日历,餐饮营销日历,美妆营销日历,教育营销日历,节日营销节点,营销时间节点,促销时间表,营销策划模板,节日营销案例,营销推广技巧,电商促销技巧,餐饮营销技巧,美妆营销技巧,教育营销技巧'
}

// 组织结构化数据
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '妙策',
  url: 'https://miao.friday-go.icu',
  logo: 'https://miao.friday-go.icu/logo.png',
  description: '专业的节日营销工具提供商',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+86-400-123-4567',
    contactType: 'customer service',
    availableLanguage: 'Chinese'
  },
  sameAs: [
    'https://weibo.com/miaocetools',
    'https://mp.weixin.qq.com/miaocetools'
  ]
}

// 软件应用结构化数据
const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: '妙策节日营销日历',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web Browser',
  url: 'https://miao.friday-go.icu',
  description: '妙策是专业的节日营销日历工具，提供电商、餐饮、美妆、教育行业的节日营销节点查询，实时倒计时提醒，可落地的营销方案。支持双11、618、春节等30+节日营销策划，包含促销活动策划、营销推广方案、节日营销策略。节日营销日历,电商节日节点表,双11筹备时间表,母亲节餐饮促销方案,美妆节日营销,教育机构招生,营销策划工具。',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'CNY',
    description: '基础功能免费使用，导出功能需付费'
  },
  featureList: [
    '实时倒计时',
    '行业定制营销方案',
    '节日收藏功能',
    '数据导出功能',
    '多行业支持',
    '营销策划模板',
    '促销活动策划',
    '节日营销策略',
    '电商促销方案',
    '餐饮营销策划',
    '美妆营销方案',
    '教育营销策划'
  ],
  keywords: '节日营销日历,电商节日节点表,双11筹备时间表,母亲节餐饮促销方案,美妆节日营销,教育机构招生,营销策划工具,节日倒计时,营销方案,节日促销活动,营销推广方案,节日营销策略,电商促销策划,餐饮营销策划,美妆营销策划,教育营销策划,双11营销方案,618促销活动,春节营销策划,情人节营销方案,母亲节促销活动,父亲节营销策划,教师节营销方案,国庆节促销活动,中秋节营销策划,圣诞节营销方案,元旦营销策划,春节营销推广,节日营销工具,营销日历2025,电商营销日历,餐饮营销日历,美妆营销日历,教育营销日历,节日营销节点,营销时间节点,促销时间表,营销策划模板,节日营销案例,营销推广技巧,电商促销技巧,餐饮营销技巧,美妆营销技巧,教育营销技巧'
}

// 面包屑导航结构化数据
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: '首页',
      item: 'https://miao.friday-go.icu'
    }
  ]
}

// 营销工具结构化数据
const marketingToolSchema = {
  '@context': 'https://schema.org',
  '@type': 'Tool',
  name: '妙策节日营销日历工具',
  description: '妙策是专业的节日营销日历工具，提供电商、餐饮、美妆、教育行业的节日营销节点查询，实时倒计时提醒，可落地的营销方案。节日营销日历,电商节日节点表,双11筹备时间表,母亲节餐饮促销方案,美妆节日营销,教育机构招生,营销策划工具。',
  url: 'https://miao.friday-go.icu',
  applicationCategory: 'Marketing Tool',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'CNY',
    description: '基础功能免费使用，导出功能需付费'
  },
  featureList: [
    '节日营销节点查询',
    '实时倒计时提醒',
    '行业定制营销方案',
    '促销活动策划',
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
    '营销日历2025',
    '节日营销工具',
    '营销策划模板',
    '节日营销案例',
    '营销推广技巧'
  ],
  keywords: '节日营销日历,电商节日节点表,双11筹备时间表,母亲节餐饮促销方案,美妆节日营销,教育机构招生,营销策划工具,节日倒计时,营销方案,节日促销活动,营销推广方案,节日营销策略,电商促销策划,餐饮营销策划,美妆营销策划,教育营销策划,双11营销方案,618促销活动,春节营销策划,情人节营销方案,母亲节促销活动,父亲节营销策划,教师节营销方案,国庆节促销活动,中秋节营销策划,圣诞节营销方案,元旦营销策划,春节营销推广,节日营销工具,营销日历2025,电商营销日历,餐饮营销日历,美妆营销日历,教育营销日历,节日营销节点,营销时间节点,促销时间表,营销策划模板,节日营销案例,营销推广技巧,电商促销技巧,餐饮营销技巧,美妆营销技巧,教育营销技巧'
}

// 根据当前路由添加面包屑
const route = useRoute()
if (route.path === '/about') {
  breadcrumbSchema.itemListElement.push({
    '@type': 'ListItem',
    position: 2,
    name: '关于我们',
    item: 'https://miao.friday-go.icu/about'
  })
} else if (route.path === '/contact') {
  breadcrumbSchema.itemListElement.push({
    '@type': 'ListItem',
    position: 2,
    name: '联系我们',
    item: 'https://miao.friday-go.icu/contact'
  })
}

// 注入结构化数据到页面头部
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(websiteSchema)
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify(organizationSchema)
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify(softwareApplicationSchema)
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify(marketingToolSchema)
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify(breadcrumbSchema)
    }
  ]
})
</script>
