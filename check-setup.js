#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkUrl(url, description) {
  return new Promise((resolve) => {
    const request = http.get(url, (res) => {
      if (res.statusCode === 200) {
        log(`✅ ${description} - OK`, 'green');
        resolve(true);
      } else {
        log(`❌ ${description} - Failed (Status: ${res.statusCode})`, 'red');
        resolve(false);
      }
    });

    request.on('error', (err) => {
      log(`❌ ${description} - Failed (${err.message})`, 'red');
      resolve(false);
    });

    request.setTimeout(5000, () => {
      log(`❌ ${description} - Timeout`, 'red');
      request.destroy();
      resolve(false);
    });
  });
}

function checkFile(filePath, description) {
  if (fs.existsSync(filePath)) {
    log(`✅ ${description} - Exists`, 'green');
    return true;
  } else {
    log(`❌ ${description} - Missing`, 'red');
    return false;
  }
}

async function runChecks() {
  log('🔍 Headless WordPress + Next.js 设置检查', 'blue');
  log('=' .repeat(50), 'blue');

  // File structure checks
  log('\n📁 文件结构检查:', 'yellow');
  const files = [
    ['cms/wordpress/docker-compose.yml', 'WordPress Docker 配置'],
    ['cms/wordpress/plugins-setup.md', 'WordPress 插件设置说明'],
    ['apps/web/package.json', 'Next.js package.json'],
    ['apps/web/next.config.js', 'Next.js 配置'],
    ['apps/web/tailwind.config.js', 'TailwindCSS 配置'],
    ['apps/web/components.json', 'shadcn/ui 配置'],
    ['apps/web/codegen.ts', 'GraphQL Code Generator 配置'],
    ['apps/web/faust.config.js', 'Faust.js 配置'],
    ['apps/web/src/app/layout.tsx', 'Next.js 根布局'],
    ['apps/web/src/app/(public)/posts/page.tsx', '文章列表页面'],
    ['apps/web/src/app/(public)/posts/[slug]/page.tsx', '文章详情页面'],
    ['apps/web/src/app/api/preview/route.ts', '预览 API'],
    ['apps/web/src/app/api/revalidate/route.ts', 'ISR 重新验证 API'],
    ['apps/web/src/lib/graphql/client.ts', 'GraphQL 客户端'],
    ['apps/web/src/lib/graphql/queries.ts', 'GraphQL 查询'],
    ['apps/web/src/components/ui/button.tsx', 'shadcn/ui Button 组件'],
    ['apps/web/src/components/blog/post-card.tsx', '文章卡片组件'],
  ];

  let fileChecks = 0;
  for (const [file, desc] of files) {
    if (checkFile(file, desc)) fileChecks++;
  }

  // Service checks
  log('\n🌐 服务检查:', 'yellow');
  const services = [
    ['http://localhost:8080', 'WordPress 前台'],
    ['http://localhost:8080/wp-admin', 'WordPress 后台'],
    ['http://localhost:8080/graphql', 'WordPress GraphQL API'],
  ];

  let serviceChecks = 0;
  for (const [url, desc] of services) {
    if (await checkUrl(url, desc)) serviceChecks++;
  }

  // Next.js check (if running)
  log('\n⚡ Next.js 前端检查:', 'yellow');
  const nextjsRunning = await checkUrl('http://localhost:3000', 'Next.js 开发服务器');

  // Summary
  log('\n📊 检查结果总结:', 'blue');
  log(`文件结构: ${fileChecks}/${files.length} 完成`, fileChecks === files.length ? 'green' : 'yellow');
  log(`后端服务: ${serviceChecks}/${services.length} 运行`, serviceChecks === services.length ? 'green' : 'yellow');
  log(`前端服务: ${nextjsRunning ? '运行中' : '未运行'}`, nextjsRunning ? 'green' : 'yellow');

  log('\n🚀 下一步操作:', 'blue');

  if (serviceChecks < services.length) {
    log('1. 启动 WordPress 容器:', 'yellow');
    log('   cd cms/wordpress && docker compose up -d', 'reset');
    log('2. 安装 WPGraphQL 插件 (参考 cms/wordpress/plugins-setup.md)', 'yellow');
  }

  if (!nextjsRunning) {
    log('3. 启动 Next.js 开发服务器:', 'yellow');
    log('   cd apps/web && npm install && npm run dev', 'reset');
  }

  if (fileChecks === files.length && serviceChecks === services.length && nextjsRunning) {
    log('🎉 所有设置完成！可以开始使用 Headless WordPress + Next.js', 'green');
    log('📖 访问 http://localhost:3000 查看前端', 'green');
    log('⚙️  访问 http://localhost:8080/wp-admin 管理 WordPress', 'green');
  }
}

runChecks().catch(console.error);