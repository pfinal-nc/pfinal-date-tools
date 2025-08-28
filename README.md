# 妙策 - 节日营销日历（倒计时）单页网站

一个专业的节日营销工具，为商家提供精准的营销节点查询和可落地的营销方案。

## 🎯 项目特色

- **实时倒计时**：精确显示距离节日的天数，以及建议的筹备期提醒
- **行业定制**：针对电商、餐饮、美妆、教育等不同行业，提供专属营销方案
- **可落地方案**：提供具体可执行的营销策略和活动建议
- **响应式设计**：完美适配移动端、平板和桌面端
- **静态部署**：零后端依赖，支持 GitHub Pages 快速部署

## 🚀 技术栈

- **框架**：Nuxt 4
- **UI 组件**：Nuxt UI 3
- **样式**：Tailwind CSS
- **日期处理**：Day.js
- **导出功能**：SheetJS (xlsx)、html2pdf.js
- **部署**：GitHub Pages

## 📁 项目结构

```
/
├── components/          # 可复用组件
│   ├── FestivalCard.vue    # 节日卡片组件
│   └── MarketingPlanModal.vue  # 营销方案弹窗
├── pages/              # 页面文件
│   ├── index.vue          # 主页
│   ├── about.vue          # 关于页面
│   └── contact.vue        # 联系页面
├── data/               # 静态数据
│   └── festivals.json     # 节日数据
├── public/             # 公共资源
│   └── robots.txt         # 搜索引擎配置
├── app.vue             # 应用入口
├── nuxt.config.ts      # Nuxt 配置
└── package.json        # 项目依赖
```

## 🛠️ 安装和运行

### 环境要求

- Node.js 18+ 
- npm 或 yarn 或 pnpm

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 开发模式

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看效果。

### 构建生产版本

```bash
npm run build
# 或
yarn build
# 或
pnpm build
```

### 生成静态文件

```bash
npm run generate
# 或
yarn generate
# 或
pnpm generate
```

生成的静态文件位于 `.output/public` 目录。

### 预览生产版本

```bash
npm run preview
# 或
yarn preview
# 或
pnpm preview
```

## 📊 功能模块

### 1. 行业筛选
- 支持全部行业、电商零售、餐饮美食、美妆护肤、教育培训
- 实时筛选相关节日数据
- 收藏功能，快速查看关注节日

### 2. 节日展示
- 网格布局，响应式设计
- 节日日期、名称、描述
- 实时倒计时显示
- 筹备期提醒

### 3. 营销方案
- 行业定制化营销策略
- 弹窗展示详细方案
- 支持复制和收藏
- 营销建议和最佳实践

### 4. 数据导出
- Excel 格式导出
- PDF 格式导出
- 付费权限控制
- 自定义导出内容

## 🎨 设计规范

### 色彩方案
- **主色调**：#3498db (蓝色)
- **辅助色**：#e74c3c (红色)、#2ecc71 (绿色)、#7f8c8d (灰色)
- **背景**：渐变背景，浅色主题

### 响应式断点
- **移动端**：320px - 480px (1列布局)
- **平板**：768px - 1024px (2列布局)
- **桌面端**：≥1024px (3列布局)

## 📱 浏览器支持

- Chrome 80+
- Safari 14+
- Firefox 75+
- Edge 80+

## 🚀 部署方案

### GitHub Pages 部署

1. 构建静态文件：
```bash
npm run generate
```

2. 将 `.output/public` 目录内容推送到 GitHub Pages 分支

3. 配置 GitHub Pages 设置

### 其他静态托管

支持部署到任何静态文件托管服务：
- Netlify
- Vercel
- 阿里云 OSS
- 腾讯云 COS

## 📈 SEO 优化

- 完整的 Meta 标签配置
- Open Graph 社交媒体优化
- 结构化数据标记
- 站点地图生成
- robots.txt 配置

## 🔧 自定义配置

### 修改节日数据

编辑 `data/festivals.json` 文件，添加或修改节日信息：

```json
{
  "id": 17,
  "name": "新节日",
  "date": "2025-12-31",
  "preparationDays": 20,
  "industries": ["all", "retail"],
  "description": "节日描述",
  "marketingPlan": {
    "retail": ["营销方案1", "营销方案2"]
  }
}
```

### 修改行业配置

在 `data/festivals.json` 的 `industries` 数组中修改行业信息。

### 自定义样式

修改 `app.vue` 中的全局样式，或使用 Tailwind CSS 类名进行样式调整。

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系我们

- 邮箱：support@festival-calendar.com
- 电话：400-123-4567
- 工作时间：周一至周五 9:00-18:00

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者和用户！

---

**妙策** - 让营销更简单，让效果更显著！
