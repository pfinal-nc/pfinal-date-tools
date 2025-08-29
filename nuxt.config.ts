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
      title: '妙策 - 2025节日营销日历 | 电商/餐饮/美妆/教育专用（带倒计时+促销方案）',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: '专业的节日营销日历工具，提供电商、餐饮、美妆、教育行业的节日营销节点查询，实时倒计时提醒，可落地的营销方案。'
        },
        { name: 'keywords', content: '节日营销日历,电商节日节点表,双11筹备时间表,母亲节餐饮促销方案,美妆节日营销,教育机构招生' },
        { property: 'og:title', content: '妙策 - 2025节日营销日历 | 专业营销工具' },
        { property: 'og:description', content: '专业的节日营销日历工具，提供行业定制化营销方案和实时倒计时提醒。' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://miao.friday-go.icu' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
      preference: 'light'
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
    }
  }
})
