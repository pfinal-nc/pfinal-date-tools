// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 开发工具
  devtools: { enabled: true },

  // 模块
  modules: [
    '@nuxt/ui',
    '@nuxtjs/google-fonts',
    '@nuxtjs/robots'
  ],
  
  // 应用配置
  app: {
    head: {
      title: '妙策 - 2025节日营销日历 | 电商/餐饮/美妆/教育行业营销策划工具（双11/618/春节促销方案+倒计时提醒）',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: '妙策是专业的节日营销日历工具，提供电商、餐饮、美妆、教育行业的节日营销节点查询，实时倒计时提醒，可落地的营销方案。支持双11、618、春节等30+节日营销策划，包含促销活动策划、营销推广方案、节日营销策略。节日营销日历,电商节日节点表,双11筹备时间表,母亲节餐饮促销方案,美妆节日营销,教育机构招生,营销策划工具。'
        },
        { 
          name: 'keywords', 
          content: '节日营销日历,电商节日节点表,双11筹备时间表,母亲节餐饮促销方案,美妆节日营销,教育机构招生,营销策划工具,节日倒计时,营销方案,节日促销活动,营销推广方案,节日营销策略,电商促销策划,餐饮营销策划,美妆营销策划,教育营销策划,双11营销方案,618促销活动,春节营销策划,情人节营销方案,母亲节促销活动,父亲节营销策划,教师节营销方案,国庆节促销活动,中秋节营销策划,圣诞节营销方案,元旦营销策划,春节营销推广,节日营销工具,营销日历2025,电商营销日历,餐饮营销日历,美妆营销日历,教育营销日历,节日营销节点,营销时间节点,促销时间表,营销策划模板,节日营销案例,营销推广技巧,电商促销技巧,餐饮营销技巧,美妆营销技巧,教育营销技巧' 
        },
        { name: 'author', content: '妙策团队' },
        { name: 'robots', content: 'index, follow' },
        { name: 'googlebot', content: 'index, follow' },
        { property: 'og:title', content: '妙策 - 2025节日营销日历 | 电商/餐饮/美妆/教育行业营销策划工具' },
        { property: 'og:description', content: '专业的节日营销日历工具，提供电商、餐饮、美妆、教育行业的节日营销节点查询，实时倒计时提醒，可落地的营销方案。支持双11、618、春节等30+节日营销策划，包含促销活动策划、营销推广方案、节日营销策略。' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://miao.friday-go.icu' },
        { property: 'og:site_name', content: '妙策' },
        { property: 'og:locale', content: 'zh_CN' },
        { property: 'og:image', content: 'https://miao.friday-go.icu/logo.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: '妙策节日营销日历工具' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: '妙策 - 2025节日营销日历 | 专业营销策划工具' },
        { name: 'twitter:description', content: '专业的节日营销日历工具，提供电商、餐饮、美妆、教育行业的节日营销节点查询，实时倒计时提醒，可落地的营销方案。' },
        { name: 'twitter:image', content: 'https://miao.friday-go.icu/logo.png' },
        { name: 'application-name', content: '妙策' },
        { name: 'theme-color', content: '#3b82f6' },
        { name: 'msapplication-TileColor', content: '#3b82f6' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'apple-mobile-web-app-title', content: '妙策' },
        { name: 'format-detection', content: 'telephone=no' }
      ],
              link: [
          { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
          { rel: 'canonical', href: 'https://miao.friday-go.icu' },
          { rel: 'alternate', hreflang: 'zh-CN', href: 'https://miao.friday-go.icu' },
          { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
          { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
          { rel: 'manifest', href: '/manifest.json' },
          { rel: 'apple-touch-icon', href: '/icon-192.png' }
        ],
        script: [
          {
            innerHTML: "setTimeout(() => { (s=>{s.dataset.zone=9791120,s.src='https://vemtoutcheeg.com/tag.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script'))) }, 5000)",
            defer: true
          }
        ]
    }
  },

  
  // Google Fonts 配置
  googleFonts: {
    families: {
      'Noto+Sans+SC': [400, 500, 600, 700],
      'Inter': [400, 500, 600, 700]
    },
    display: 'swap',
    prefetch: true,
    preconnect: true
  },

  // 路由规则
  routeRules: {
    '/': { prerender: true },
    '/about': { prerender: true },
    '/contact': { prerender: true }
  },

  

  // 实验性功能
  experimental: {
    payloadExtraction: true
  },

  
  // 构建配置
  build: {
    transpile: ['xlsx', 'html2pdf.js']
  },

  css: [
    '~/assets/css/main.css'
  ],
  
  // 颜色模式
  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },

  // 兼容性日期
  compatibilityDate: '2025-08-28',

  runtimeConfig: {
    public: {
      siteUrl: 'https://miao.friday-go.icu'
    }
  },

  // 静态站点生成
  nitro: {
    prerender: {
      crawlLinks: true
    },
    // 确保静态文件被正确处理
    routeRules: {
      '/favicon.ico': { headers: { 'cache-control': 'public, max-age=31536000' } },
      '/manifest.json': { headers: { 'cache-control': 'public, max-age=31536000' } },
      '/logo.png': { headers: { 'cache-control': 'public, max-age=31536000' } },
      '/pay.jpg': { headers: { 'cache-control': 'public, max-age=31536000' } }
    }
  }
})
