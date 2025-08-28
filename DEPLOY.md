# 妙策 - 部署说明

## 域名配置

网站已配置为使用域名：**https://miao.friday-go.icu**

## 部署步骤

### 1. 安装依赖

```bash
npm install
# 或
pnpm install
```

### 2. 开发测试

```bash
npm run dev
# 或
pnpm dev
```

访问 http://localhost:3000 查看效果

### 3. 构建生产版本

```bash
npm run generate
# 或
pnpm generate
```

### 4. 部署到服务器

将 `.output/public` 目录的内容上传到您的服务器或 CDN。

### 5. 域名配置

确保您的域名 `miao.friday-go.icu` 指向正确的服务器地址。

## 配置说明

### 已更新的配置项

1. **网站名称**：已更新为"妙策"
2. **域名**：已配置为 https://miao.friday-go.icu
3. **SEO 信息**：已更新所有页面的标题和描述
4. **联系信息**：已更新邮箱地址
5. **版权信息**：已更新页脚版权信息

### 需要手动配置的项目

1. **favicon.ico**：替换 `public/favicon.ico` 为实际的图标文件
2. **og-image.png**：添加社交媒体分享图片到 `public/og-image.png`
3. **SSL 证书**：确保域名配置了 HTTPS 证书
4. **DNS 解析**：确保域名正确解析到服务器

## 技术栈

- **框架**：Nuxt 4
- **UI 组件**：Nuxt UI 3
- **样式**：Tailwind CSS 3
- **部署**：静态站点生成 (SSG)

## 注意事项

1. 确保服务器支持静态文件托管
2. 配置正确的 MIME 类型
3. 启用 Gzip 压缩
4. 配置缓存策略
5. 监控网站性能

## 联系支持

如有部署问题，请联系技术支持团队。
