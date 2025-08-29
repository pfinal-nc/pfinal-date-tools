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
          content: '专业的节日营销日历工具，提供电商、餐饮、美妆、教育行业的节日营销节点查询，实时倒计时提醒，可落地的营销方案。支持双11、618、春节等30+节日营销策划。'
        },
        { 
          name: 'keywords', 
          content: '节日营销日历,电商节日节点表,双11筹备时间表,母亲节餐饮促销方案,美妆节日营销,教育机构招生,营销策划工具,节日倒计时,营销方案,电商营销,餐饮营销,美妆营销,教育营销' 
        },
        { name: 'author', content: '妙策团队' },
        { name: 'robots', content: 'index, follow' },
        { name: 'googlebot', content: 'index, follow' },
        { property: 'og:title', content: '妙策 - 2025节日营销日历 | 专业营销工具' },
        { property: 'og:description', content: '专业的节日营销日历工具，提供行业定制化营销方案和实时倒计时提醒。支持30+节日营销策划，助力商家提升营销效果。' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://miao.friday-go.icu' },
        { property: 'og:site_name', content: '妙策' },
        { property: 'og:locale', content: 'zh_CN' },
        { property: 'og:image', content: 'https://miao.friday-go.icu/logo.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: '妙策 - 2025节日营销日历' },
        { name: 'twitter:description', content: '专业的节日营销日历工具，提供行业定制化营销方案和实时倒计时提醒。' },
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
