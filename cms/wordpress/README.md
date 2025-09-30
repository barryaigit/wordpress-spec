# WordPress Docker 设置

## 启动 WordPress

```bash
# 启动容器
docker compose up -d

# 查看日志
docker compose logs -f

# 停止容器
docker compose down

# 停止并删除数据
docker compose down -v
```

## 访问地址

- WordPress 前台: http://localhost:8080
- WordPress 管理后台: http://localhost:8080/wp-admin
- GraphQL API (安装插件后): http://localhost:8080/graphql

## 初始设置

1. 访问 http://localhost:8080 完成 WordPress 初始设置
2. 创建管理员账户
3. 登录后台安装 WPGraphQL 插件

## 必需插件

### WPGraphQL
从 WordPress 插件库搜索并安装 "WPGraphQL"，或者手动下载：
- 插件地址: https://wordpress.org/plugins/wp-graphql/
- 安装后激活插件
- GraphQL API 将在 `/graphql` 端点可用

### WooGraphQL (可选)
如果需要电商功能：
1. 先安装 WooCommerce
2. 再安装 WPGraphQL WooCommerce (WooGraphQL)
3. 激活两个插件

## 数据库信息

- 主机: localhost:3306
- 数据库: wordpress
- 用户名: wordpress
- 密码: wordpress
- Root密码: rootpassword