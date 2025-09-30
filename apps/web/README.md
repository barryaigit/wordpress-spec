# Headless WordPress + Next.js 前端

基于 WordPress GraphQL 和 Next.js 的现代化 Headless CMS 解决方案。

## 技术栈

- **前端框架**: Next.js 14 (App Router) + TypeScript
- **样式**: TailwindCSS + shadcn/ui
- **GraphQL**: graphql-request + GraphQL Code Generator
- **预览模式**: Faust.js
- **构建工具**: Next.js + PostCSS

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 环境配置

复制 `.env.local` 文件并配置环境变量：

```bash
cp .env.local.example .env.local
```

配置以下环境变量：
```bash
NEXT_PUBLIC_WORDPRESS_URL=http://localhost:8080
WORDPRESS_GRAPHQL_ENDPOINT=http://localhost:8080/graphql
FAUST_SECRET_KEY=your-secret-key-here
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000 查看前端界面。

## 开发脚本

```bash
# 开发环境
npm run dev              # 启动开发服务器

# 构建和生产
npm run build           # 构建生产版本
npm start              # 启动生产服务器

# 代码质量
npm run lint           # ESLint 检查
npm run type-check     # TypeScript 类型检查

# GraphQL
npm run codegen        # 生成 GraphQL 类型
npm run codegen:watch  # 监听模式生成类型

# 测试
npm run test           # 运行测试
npm run test:watch     # 监听模式测试
npm run lighthouse     # Lighthouse 性能测试
```

## 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── (public)/          # 公开路由组
│   │   └── posts/         # 文章相关页面
│   ├── api/               # API 路由
│   │   ├── faust/         # Faust.js API
│   │   ├── preview/       # 预览模式
│   │   └── revalidate/    # ISR 重新验证
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # React 组件
│   ├── ui/               # shadcn/ui 组件
│   └── blog/             # 博客相关组件
├── lib/                  # 工具库
│   ├── graphql/          # GraphQL 客户端和查询
│   ├── faust.ts          # Faust.js 配置
│   ├── preview.ts        # 预览模式处理
│   ├── revalidation.ts   # ISR 重新验证
│   └── utils.ts          # 通用工具函数
└── gql/                  # GraphQL 代码生成输出
```

## 功能特性

### 🚀 现代化技术栈
- Next.js 14 App Router
- TypeScript 类型安全
- TailwindCSS + shadcn/ui 组件

### 🎨 响应式设计
- 移动优先设计
- 暗黑模式支持
- 无障碍访问优化

### ⚡ 性能优化
- ISR (增量静态再生)
- 图片优化
- 代码分割

### 🔄 内容管理
- WordPress GraphQL API
- 实时预览模式
- 自动内容同步

### 🛠 开发体验
- GraphQL 代码生成
- TypeScript 类型检查
- ESLint 代码规范
- Lighthouse 性能监控

## WordPress 配置

确保 WordPress 后端已安装并激活以下插件：

1. **WPGraphQL** (必需)
2. **WPGraphQL WooCommerce** (可选，电商功能)

### GraphQL API 端点

- 开发环境: http://localhost:8080/graphql
- GraphiQL IDE: http://localhost:8080/wp-admin/admin.php?page=graphiql-ide

## 预览模式

预览功能允许在内容发布前预览草稿：

```
GET /api/preview?secret=your-secret&id=123&slug=post-slug
```

## ISR 重新验证

触发内容重新验证：

```bash
# 重新验证特定路径
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"secret":"your-secret","path":"/posts/example-post"}'

# 重新验证首页
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{"secret":"your-secret","path":"/"}'
```

## 部署

### Vercel 部署

1. 连接 GitHub 仓库
2. 配置环境变量
3. 自动部署

### 自定义部署

```bash
npm run build
npm start
```

## 验收测试

### 基础功能测试

1. ✅ WordPress GraphQL API 可访问
2. ✅ Next.js 前端正常启动
3. ✅ 文章列表页面渲染
4. ✅ 文章详情页面渲染
5. ✅ 预览模式工作正常
6. ✅ ISR 重新验证功能

### 性能测试

```bash
npm run lighthouse
```

### 类型检查

```bash
npm run type-check
```

### 代码规范检查

```bash
npm run lint
```

## 常见问题

### GraphQL API 无法访问

1. 确认 WordPress 容器正在运行
2. 检查 WPGraphQL 插件是否激活
3. 验证环境变量配置

### 样式不显示

1. 确认 TailwindCSS 配置正确
2. 检查 PostCSS 配置
3. 重启开发服务器

### 类型错误

1. 运行 `npm run codegen` 生成最新类型
2. 检查 GraphQL 查询语法
3. 确认 WordPress 数据结构

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License