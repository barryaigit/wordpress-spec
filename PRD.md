# PRD：基于 Spec Kit 的 Next.js + shadcn + Faust.js + WPGraphQL 前端实现

## 1. 背景与目标

* **背景**

  * 当前已有 WordPress 部署作为内容管理系统（CMS）。
  * 希望采用 **Headless 架构**：前端使用 **Next.js + shadcn/ui** 实现现代 UI/UX，后端 WordPress 仅作为内容源（通过 WPGraphQL 提供数据）。
  * 引入 **Faust.js**，解决预览、草稿、ISR/SSG 触发等痛点。
  * 使用 **Spec Kit** 对需求进行拆解和约束，减少 AI 的随意编码与幻觉风险。

* **目标**

  * 构建一个规范化的工作流：

    1. 人工搭建底座（Next.js + shadcn + Faust.js + WordPress + WPGraphQL）。
    2. Spec Kit 负责需求拆解和契约定义（页面、路由、GraphQL 片段、shadcn 组件、ISR 策略等）。
    3. AI 仅在 Spec Kit 指定的“任务清单”中执行受限的代码生成。
    4. Spec Kit 还能根据用户业务需求，生成 **WordPress 配置任务**（例如：开启/安装插件、创建分类、设置站点属性），确保前后端一致。

---

## 2. 范围与约束

* **In Scope**

  * WordPress 作为 CMS，安装 WPGraphQL 插件（必要时 WooGraphQL）。
  * 前端：Next.js（App Router）+ shadcn/ui + TailwindCSS。
  * Faust.js：用于预览、草稿渲染、ISR/ODISR。
  * GraphQL 数据层：仅允许使用定义好的 fragments 与 queries。
  * CI/CD：集成 Type Check、ESLint、单元测试、e2e 测试、Lighthouse 性能检测。
  * **WordPress 配置支持**：Spec Kit 输出站点配置需求，包括：

    * 插件启用（如 WooCommerce、SEO 插件）。
    * 商品类型或分类配置（如“电子产品”）。
    * 基础站点信息（站点标题、副标题、Logo、导航菜单）。
    * 文章/产品分类与标签。

* **Out of Scope**

  * 不使用传统 WordPress PHP 主题。
  * 不使用除 shadcn/ui 之外的 UI 库。
  * 不做复杂交易/库存逻辑（如需电商扩展，另起 BFF 层）。

* **约束**

  * **组件白名单**：UI 仅可用 `@/components/ui/*` 下的 shadcn 组件。
  * **设计约束**：仅使用 `components.json` 中的 tokens，不得新增自定义设计体系。
  * **数据约束**：GraphQL 查询只能 import 已定义的 fragments，禁止随意新增字段。
  * **配置约束**：WordPress 配置需求必须体现在 Spec Kit 的 `tasks.md` 文件里，并能被人工验证。

---

## 3. 用户需求（通过 Spec Kit 表达）

* **页面需求**

  * 首页 `/`：展示站点信息、推荐文章。
  * 文章列表页 `/posts`：分页展示文章（卡片列表）。
  * 文章详情页 `/posts/[slug]`：展示文章内容、SEO 信息。
  * 预览模式：支持草稿与未发布文章预览。

* **前端体验**

  * 使用 shadcn/ui 提供一致的交互组件：Button、Dialog、Table、NavigationMenu、Badge。
  * 响应式布局，移动端友好。
  * Skeleton 占位符，加载态一致。

* **数据需求**

  * GraphQL fragments：`PostCardFields`、`PostSeoFields`。
  * Queries：`getPosts`、`getPostBySlug`。

* **配置需求（新增）**

  * 当用户提出具体业务场景时（例如“需要一个电子产品公司官网”），Spec Kit 要能拆解出：

    * **WordPress 配置任务**：

      * 启用 WooCommerce 插件（作为商品系统）。
      * 创建 “电子产品” 商品分类。
      * 配置基础站点信息（站点标题、副标题、Logo）。
      * 配置首页导航菜单。
    * **前端对应任务**：

      * 拉取商品分类数据（GraphQL → WPGraphQL for WooCommerce）。
      * 在前端渲染分类页面/商品展示。

* **SEO/性能**

  * ISR/ODISR 策略：列表页定时再生，详情页发布触发 ODISR。
  * SEO：使用 WPGraphQL 提供的 SEO 字段，生成 meta、OG、JSON-LD。
  * 性能目标：LCP < 2.5s、CLS < 0.1、INP < 200ms。

---

## 4. 验收标准

* **功能验收**

  * `/posts` 页面正常分页，空数据时展示 Skeleton。
  * `/posts/[slug]` 正常渲染文章详情与 SEO 信息。
  * 预览模式能正确显示草稿，未携带 token 时返回 401。
  * 内容更新后触发 ISR/ODISR，再生成生效 < 60s。
  * **WordPress 配置验收**：

    * 所需插件启用成功并能在后台管理。
    * 商品分类/站点信息设置可在前端正确渲染。

* **质量验收**

  * 单元测试覆盖率 ≥ 70%，关键组件有测试。
  * 基本 e2e 测试（文章列表 → 详情 → 返回列表）。
  * CI 全绿（Lint、Type Check、单测、e2e、Lighthouse ≥ 90 分）。

---

## 5. 里程碑

* **M0**：人类搭建底座（Next + shadcn + Tailwind + WPGraphQL + Faust.js + WordPress）。
* **M1**：Spec Kit 输出 Plan/Spec/Tasks，冻结约束。
* **M2**：AI 执行 T001～T003（fragments + queries + 页面骨架 + 预览模式）。
* **M3**：配置层支持：根据用户业务需求，生成 WordPress 插件/分类/设置任务，并完成验证。
* **M4**：接入 ISR/ODISR，完成 SEO 与性能优化。
* **M5**：测试、验收与上线。
