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
  description: '专业的节日营销日历工具，提供电商、餐饮、美妆、教育行业的节日营销节点查询，实时倒计时提醒，可落地的营销方案。',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://miao.friday-go.icu/?search={search_term_string}',
    'query-input': 'required name=search_term_string'
  }
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
  description: '专业的节日营销日历工具，提供电商、餐饮、美妆、教育行业的节日营销节点查询，实时倒计时提醒，可落地的营销方案。',
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
    '多行业支持'
  ]
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
      children: JSON.stringify(breadcrumbSchema)
    }
  ]
})
</script>
