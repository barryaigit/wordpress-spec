# WordPress 插件安装指南

## 必需插件安装步骤

### 1. WPGraphQL (必需)

**手动安装方式：**
1. 启动 WordPress: `docker compose up -d`
2. 访问 http://localhost:8080 完成 WordPress 初始设置
3. 登录管理后台: http://localhost:8080/wp-admin
4. 导航到 `插件` > `安装插件`
5. 搜索 "WPGraphQL"
6. 点击 "现在安装" 然后 "激活"
7. 激活后访问 http://localhost:8080/graphql 确认 GraphQL API 可用

**命令行安装方式：**
```bash
# 进入 WordPress 容器
docker exec -it wordpress-app bash

# 使用 WP-CLI 安装插件
wp plugin install wp-graphql --activate --allow-root

# 验证插件已激活
wp plugin list --allow-root
```

### 2. WooGraphQL (可选 - 电商功能)

如果需要 WooCommerce 支持：

```bash
# 安装 WooCommerce
wp plugin install woocommerce --activate --allow-root

# 安装 WPGraphQL WooCommerce
wp plugin install wp-graphql-woocommerce --activate --allow-root
```

### 3. 验证 GraphQL API

安装完成后访问 GraphQL IDE：
- GraphiQL IDE: http://localhost:8080/wp-admin/admin.php?page=graphiql-ide

测试查询：
```graphql
query GetPosts {
  posts {
    nodes {
      id
      title
      content
      slug
      date
    }
  }
}
```

## 可选插件

### Advanced Custom Fields (ACF)
```bash
wp plugin install advanced-custom-fields --activate --allow-root
wp plugin install wp-graphql-acf --activate --allow-root
```

### Yoast SEO
```bash
wp plugin install wordpress-seo --activate --allow-root
wp plugin install add-wpgraphql-seo --activate --allow-root
```

## 主题配置

确保使用支持 GraphQL 的主题，或安装 Headless 主题：
```bash
wp theme install twentytwentyfour --activate --allow-root
```

## 环境变量配置

在 Next.js 项目中需要的环境变量：
```bash
# apps/web/.env.local
WORDPRESS_GRAPHQL_ENDPOINT=http://localhost:8080/graphql
FAUST_SECRET_KEY=your-secret-key-here
```