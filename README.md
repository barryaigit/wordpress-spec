# Headless WordPress + Next.js

现代化的 Headless CMS 解决方案，基于 WordPress GraphQL 和 Next.js。

## 项目结构

```
apps/web/           # Next.js 前端应用
cms/wordpress/      # WordPress Docker 容器
spec-kit/           # 项目规划和任务管理
```

## 技术栈

- **前端**: Next.js (App Router) + TypeScript + TailwindCSS + shadcn/ui
- **GraphQL**: graphql-request + GraphQL Code Generator
- **预览**: Faust.js (预览与 ISR/ODISR)
- **后端**: WordPress + WPGraphQL + WooGraphQL
- **容器**: Docker + docker-compose

## 快速开始

### 1. 设置检查

运行自动检查脚本确认环境配置：

```bash
node check-setup.js
```

### 2. 启动 WordPress 后端

```bash
cd cms/wordpress
docker compose up -d
```

### 3. 配置 WordPress

1. 访问 http://localhost:8080 完成 WordPress 初始设置
2. 登录后台安装 WPGraphQL 插件（参考 `cms/wordpress/plugins-setup.md`）
3. 确认 GraphQL API 在 http://localhost:8080/graphql 可访问

### 4. 启动 Next.js 前端

```bash
cd apps/web
npm install
npm run dev
```

### 5. 验证安装

- WordPress 管理后台: http://localhost:8080/wp-admin
- GraphQL API: http://localhost:8080/graphql
- GraphiQL IDE: http://localhost:8080/wp-admin/admin.php?page=graphiql-ide
- Next.js 前端: http://localhost:3000
- 文章列表: http://localhost:3000/posts

## 验收 Checklist

- [ ] WordPress Docker 容器正常启动
- [ ] WPGraphQL 插件已安装并激活
- [ ] GraphQL API 端点可访问
- [ ] Next.js 前端正常启动
- [ ] 文章列表页面可访问
- [ ] 文章详情页面可访问
- [ ] 预览模式 API 端点存在：`/api/preview`
- [ ] ISR 重新验证 API 端点存在：`/api/revalidate`

## 测试预览功能

```bash
# 预览功能测试（需要先创建草稿文章）
curl "http://localhost:3000/api/preview?secret=your-secret-key&id=123&slug=test-post"
```

## 测试 ISR 重新验证

```bash
# 重新验证首页
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"secret":"your-secret-key","path":"/"}'

# 重新验证文章页面
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"secret":"your-secret-key","path":"/posts/example-post","type":"post"}'
```