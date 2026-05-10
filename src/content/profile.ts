export type SkillCluster = {
  title: string;
  signal: string;
  tools: string[];
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  impact: string;
  bullets: string[];
};

export type Project = {
  name: string;
  role: string;
  period: string;
  summary: string;
  stack: string[];
  outcomes: string[];
};

export type AgentLoopStep = {
  name: string;
  owner: string;
  output: string;
};

export type HeroInsight = {
  label: string;
  title: string;
  detail: string;
};

export const profile = {
  name: '李冲',
  title: 'AI-native Full-stack Engineer',
  headline: 'AI Agent 全栈工程师',
  summary: '用 Agent Loop 加速复杂平台交付。',
  location: '中国 · 上海 / 远程协作',
  email: 'mail@lichong.work',
  socialUrl: 'https://nav-panel.lichong.work/',
  education: '太原理工大学 · 软件工程本科',
  heroInsights: [
    {
      label: '8 年经验',
      title: '企业级平台全链路交付',
      detail: '长期负责架构设计、研发规范、公共组件库、DevOps 流水线、认证中心和观测平台建设。',
    },
    {
      label: 'Agent Loop',
      title: 'AI 参与真实研发闭环',
      detail: '熟悉 Codex、Claude Code、OpenCode、OpenClaw 等工具，关注 harness 编排、自动测试、验证和修复。',
    },
    {
      label: '前沿偏好',
      title: '低代码、BAAS、3D 与可观测性',
      detail: '持续探索 GraphQL/BAAS、低代码平台、ThreeJS、AIOps、ClickHouse/Flink 等工程化组合。',
    },
  ] satisfies HeroInsight[],
  proofPoints: [
    'AI Agent 工具链与 harness 编排实践者',
    '可独立负责产品功能全栈交付',
    '组织过 3 至 9 人研发小组任务',
    'CSDN 专家圈邀请成员',
  ],
  heroMetrics: [
    { label: 'Engineering Years', value: '8+' },
    { label: 'Team Scale', value: '3-9' },
    { label: 'Delivery Mode', value: 'Loop' },
  ],
  skills: [
    {
      title: 'Agentic Engineering',
      signal: '从提示、工具、harness 到验证闭环，让 AI 参与真实交付。',
      tools: ['Codex', 'Claude Code', 'OpenCode', 'OpenClaw', 'Agent Loop', '自动测试修复'],
    },
    {
      title: 'Backend & Platform',
      signal: '企业级 Java 平台、认证中心、网关与数据服务稳定落地。',
      tools: ['Java', 'SpringCloud', 'MyBatis', 'JPA', 'Quarkus', 'OAuth2', 'GraphQL'],
    },
    {
      title: 'Frontend Systems',
      signal: '大前端工程化、SSR、微前端、3D 可视化和低代码编辑体验。',
      tools: ['Vue3', 'React', 'Nuxt', 'Next', 'Vite', 'ThreeJS', 'TresJS', 'react-three-fiber'],
    },
    {
      title: 'DevOps & Infra',
      signal: '把研发、构建、部署、回滚与通知做成可复用流水线。',
      tools: ['Docker', 'Linux', 'Jenkins', 'GitLab Runner', 'CI/CD', 'Native Build'],
    },
    {
      title: 'Observability & Data',
      signal: '面向 AIOps、日志、指标、链路、CMDB 与大屏的工程经验。',
      tools: ['ClickHouse', 'Kafka', 'Flink', 'ElasticSearch', 'SkyWalking', 'ECharts', 'AntV X6'],
    },
    {
      title: 'BAAS & Low-code',
      signal: '用四层架构、GraphQL 与元数据模型降低项目交付成本。',
      tools: ['Supabase', 'Hasura', 'Monorepo', '插件化脚手架', '元数据建模', '多租户'],
    },
  ] satisfies SkillCluster[],
  experiences: [
    {
      company: '上海擎创信息技术有限公司',
      role: '全栈工程师',
      period: '2022.11 - 2025.11',
      impact: '主导研发规范、DevOps 基建、公共组件库和 AI Agent 新范式推广。',
      bullets: [
        '领导团队从 0 到 1 研发智能观测平台，对接日志、指标与数据中台任务分析。',
        '设计公共门户与 RBAC 权限模型，集成 OAuth2 认证服务，支持门户布局 DIY。',
        '推动 Flink 算子进入 AI 编写、测试、验证与修正的 LOOP 流程。',
      ],
    },
    {
      company: '北京华宇信息技术有限公司',
      role: '全栈工程师',
      period: '2021.04 - 2022.10',
      impact: '负责业务与技术中台，升级工程化体系并帮助业务部门解决技术问题。',
      bullets: [
        '整合 CI/CD，让研发过程流程化、自动化，减少重复人力投入。',
        '重构前端工程架构，统一 webpack、ESLint、Prettier、Husky 协作规范。',
        '参与 code review、新技术调研和部门技术平台知识沉淀。',
      ],
    },
    {
      company: '山东中创软件商用中间件股份有限公司',
      role: 'Java 软件开发工程师',
      period: '2019.04 - 2021.02',
      impact: '负责产品模块全栈实现、OSGI 架构改造、国产环境实施与性能调优。',
      bullets: [
        '完成老旧 OSGI 项目重构与前后端分离，推动产品向微服务架构转变。',
        '参与 SkyWalking 二次开发，适配国产中间件探针与 GraphQL 查询。',
        '完成国产环境现场部署、产品性能调优和对外产品宣讲。',
      ],
    },
  ] satisfies Experience[],
  projects: [
    {
      name: '无/低代码一体化交付平台',
      role: '架构师',
      period: '2022.05 - 至今',
      summary: '多租户、角色分工的低代码平台，面向项目经理、UI 设计师与运维人员，以结构化文件完成项目交付。',
      stack: ['BAAS', 'GraphQL', 'Monorepo', 'Vue3', '插件化脚手架'],
      outcomes: ['提出 BAAS 四层架构', '大前端模式快速迭代', '规划 AI 自动生成项目模式'],
    },
    {
      name: '中国邮政智能运维监控平台',
      role: '全栈开发工程师',
      period: '2022.11 - 2024.05',
      summary: '建设统一运营门户、CMDB 层级、实时数据展示、资源搜索与关系图谱能力。',
      stack: ['Spring Boot 3', 'Vue3', 'Nuxt3', 'ClickHouse', 'Flink', 'Redis'],
      outcomes: ['十万级资源下钻', '亿级告警查询', 'SSO 与权限统一'],
    },
    {
      name: '新疆银行一体化运维监控管理平台',
      role: '全栈开发工程师',
      period: '2024.05 - 2024.12',
      summary: '替换旧监控平台，整合日志、CMDB、ITSM、自动化、链路监控、移动端运维和分析报表。',
      stack: ['多租户', 'OAuth2', '实时消息', '数据中台', '可视化大屏'],
      outcomes: ['数据隔离多租户', '分布式通知模块', '黄金三指标展示'],
    },
    {
      name: '统一身份管理平台',
      role: '全栈开发',
      period: '2021.04 - 2022.10',
      summary: '统一组织机构、人员权限、元数据维护和业务系统 SDK，减少重复建设。',
      stack: ['Spring Boot', 'Vue', 'Vite', 'Shiro', 'Redis', 'MinIO'],
      outcomes: ['SDK 缓存一致性', 'Lua 优化 Redis', 'Jenkins 构建由 6 分钟优化至 29 秒'],
    },
    {
      name: 'SkyWalking 国产中间件适配',
      role: '全栈开发',
      period: '2019.07 - 2020.10',
      summary: '基于 SkyWalking 二次开发，扩展国产软件指标监控与个性化页面展示。',
      stack: ['Java Agent', 'Vue', 'TypeScript', 'ECharts', 'GraphQL'],
      outcomes: ['探针适配', 'OAP 服务集成', '模块工程框架搭建'],
    },
  ] satisfies Project[],
  agentLoop: [
    { name: 'Design', owner: 'Design Agent', output: '视觉方向、文案层级、section 设计稿、token 草案' },
    { name: 'Develop', owner: 'Implementation Agent', output: 'React 组件、结构化内容、响应式布局、动效 primitive' },
    { name: 'Test', owner: 'Test Agent', output: 'typecheck、lint、unit、build、e2e、privacy scan' },
    { name: 'Verify', owner: 'Visual QA Agent', output: '桌面/移动截图、a11y、reduced motion、视觉 ledger' },
    { name: 'Repair', owner: 'Repair Agent', output: '按优先级修复并回归验证' },
  ] satisfies AgentLoopStep[],
};

export const redactedPrivacyTerms = ['phone', 'mobile', 'tel'];
