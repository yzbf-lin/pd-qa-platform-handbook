/* 产品说明和媒体清单。仅使用已核实的能力；截图与录屏由本地真实界面采集。 */
window.PD_QA_CONTENT = {
  title: "PD QA",
  dimensions: {"ai-agent":[1600,1000],"ai-goals":[1600,1000],"environment-config":[1472,1000],"environments":[1600,1000],"factory":[1600,1000],"interfaces":[1600,1000],"overview":[1600,1000],"performance-reports":[1600,1000],"player-chat":[1600,1000],"player-detail":[1600,1000],"player-schedule":[1600,1000],"player-tasks":[960,725],"players":[1600,1000],"pressure":[1600,1000],"scenario-rpa":[1440,906],"scenario-steps":[1440,906],"scenarios":[1440,906],"worker-build":[1600,1000],"worker-scale":[1600,1000],"worker":[1600,1000],"world-map":[1600,1000]},
  chapters: [
    {
      id: "overview", nav: "平台简介", label: "01 / OVERVIEW", title: "把复杂的游戏测试，\n变成可协作的工作台。", layout: "hero",
      lead: "PD QA 是面向游戏服务端的测试与自动化平台，将协议调试、场景编排、玩家托管、AI Agent 和分布式执行整合到统一界面。",
      intro: "从一条接口请求，到一组持续运行的模拟玩家；从一次场景验证，到可以观察、分析和复用的测试过程。平台让测试能力从脚本走向可视化操作。",
      highlights: [
        { title: "编排测试", text: "连接协议请求、业务动作与控制流程，复用完整测试场景。" },
        { title: "驱动玩家", text: "通过任务与 AI 托管模拟玩家，持续观察行为和状态。" },
        { title: "组织执行", text: "以分布式 Worker 承载执行任务，结合指标观察运行结果。" }
      ],
      links: [{ label: "了解场景测试", href: "#scenarios" }, { label: "探索 AI 托管", href: "#ai" }],
      media: [{ image: "overview", title: "一个工作台，连接测试全流程", caption: "从平台入口进入测试、玩家管理与执行资源，按当前任务切换工作视图。", featured: true }]
    },
    {
      id: "features", nav: "功能地图", label: "02 / CAPABILITIES", title: "围绕测试工作，\n组织七类核心能力。", layout: "capabilities",
      lead: "接口是起点，场景是组织方式，玩家与 Worker 负责执行，数据和指标贯穿整个过程。",
      modules: [
        { name: "接口测试", text: "查看协议定义、填写请求参数、发送请求与检查响应。", href: "#features" },
        { name: "场景测试", text: "将多个步骤组合成可重复运行的测试流程。", href: "#scenarios" },
        { name: "数据模板工厂", text: "通过可复用模板构造测试所需的玩家与业务数据。", href: "#features" },
        { name: "玩家机器人托管", text: "配置玩家任务、定时执行并观察实时状态。", href: "#players" },
        { name: "LLM 游戏 Agent", text: "将模型与游戏工具连接，支持 AI 驱动的托管流程。", href: "#ai" },
        { name: "性能压测与监控", text: "组织专项压测，分析耗时、错误和执行指标。", href: "#performance" },
        { name: "分布式 Worker", text: "管理执行节点、构建版本与实例规模。", href: "#workers" }
      ],
      media: [
        { image: "interfaces", title: "接口测试：先理解协议结构", caption: "以 Bag_UseItems 为例，在协议抽屉中查看字段定义与数据结构，为请求配置和场景编排提供依据。" },
        { image: "factory", title: "数据模板工厂：复用测试准备过程", caption: "将重复的数据准备整理为模板和任务，为接口、场景与玩家测试提供前置数据。" }
      ]
    },
    {
      id: "scenarios", nav: "场景测试", label: "03 / SCENARIO STUDIO", title: "把测试意图，\n编排成可以执行的流程。", layout: "scenario",
      lead: "以可视化步骤组织角色、协议和控制逻辑，在一个场景里描述参与者、执行顺序和验证条件。",
      intro: "拖拽编排让流程结构直接呈现在界面中。基础步骤负责发起操作，控制步骤描述等待、循环和条件执行，场景复用则把常见流程沉淀为可组合的测试单元。",
      process: [{ title: "组织角色", text: "定义参与场景的玩家。" }, { title: "添加步骤", text: "组合请求与业务动作。" }, { title: "拖拽编排", text: "调整顺序和嵌套关系。" }, { title: "执行观察", text: "查看执行过程与结果。" }],
      media: [
        { image: "scenarios", title: "场景工作台", caption: "集中管理场景和执行入口，把测试流程与运行过程关联起来。", featured: true },
        { image: "scenario-rpa", gif: "scenario-flow", title: "拖拽 RPA：让操作顺序可视化", caption: "点击添加步骤，再在树形流程中拖拽调整顺序和嵌套关系。这里的 RPA 指场景流程编排。点击播放查看真实界面操作。", featured: true },
        { image: "scenario-steps", title: "不同步骤，表达不同测试逻辑", caption: "请求、动作、通知与控制步骤共同描述完整业务场景。" }
      ],
      tableTitle: "场景步骤说明",
      table: [
        ["Role · 角色", "声明测试参与者与角色上下文。"],
        ["Request · 请求", "发送协议请求，并使用响应结果完成后续验证。"],
        ["Action · 动作", "调用封装的游戏业务操作，复用复杂执行逻辑。"],
        ["Notify · 通知", "等待和处理服务端推送，衔接异步业务流程。"],
        ["Wait · 等待", "安排步骤间隔和时序。"],
        ["Loop · 循环", "重复执行步骤或流程片段。"],
        ["If · 条件", "按条件执行子步骤。"],
        ["Script · 脚本", "补充自定义数据处理与逻辑。"],
        ["Scenario · 子场景", "组合已有场景，复用业务流程。"]
      ]
    },
    {
      id: "environments", nav: "环境与协议", label: "04 / ENVIRONMENTS", title: "切换测试上下文，\n延续同一套工作方式。", layout: "standard",
      lead: "环境将服务器、变量与 config_version 配置分支连接起来。切换环境时，测试操作对应明确的目标服务与协议上下文。",
      highlights: [{ title: "服务器与变量", text: "集中配置目标服务器和环境变量，为执行提供统一上下文。" }, { title: "配置分支", text: "通过 config_version 分支关联对应的配置和协议定义。" }, { title: "TCP / Sproto", text: "PD 当前使用 TCP 连接与 Sproto 协议，支持对应环境下的接口与场景操作。" }],
      media: [
        { image: "environments", title: "切换测试环境", caption: "通过环境下拉选项切换测试上下文，让后续操作对应明确的目标环境。", featured: true },
        { image: "environment-config", title: "服务器、变量与配置分支", caption: "在环境配置中维护目标服务器、环境变量与 config_version 分支，连接协议定义和执行上下文。", featured: true }
      ]
    },
    {
      id: "players", nav: "玩家托管", label: "05 / PLAYER OPERATIONS", title: "看见玩家状态，\n也看见正在发生的操作。", layout: "players",
      lead: "玩家托管将账号、任务、执行状态与游戏中的实时信息放到同一工作流中，支持自动完成任务，并持续观察运行过程。",
      intro: "从任务配置与定时处理，到聊天信息同步和大地图渲染，界面不仅用于发起执行，也用于理解玩家当前在做什么。",
      media: [
        { image: "players", title: "机器人列表：集中管理玩家账号", caption: "通过列表查看玩家与托管状态，进入账号详情和任务配置。", featured: true },
        { image: "player-detail", title: "玩家详情：汇集账号与运行信息", caption: "查看单个玩家的基础信息和状态，将账号管理与托管操作连接起来。", featured: true },
        { image: "player-tasks", title: "任务配置：组织玩家自动操作", caption: "展开六类任务配置，为玩家选择需要执行的任务并填写对应参数。" },
        { image: "player-schedule", title: "定时策略：按时刻或间隔执行", caption: "选择每日固定时刻或固定间隔，将重复任务安排为持续运行的托管计划。" },
        { image: "player-chat", title: "聊天信息：按环境与 KID 聚合", caption: "聊天视图持续同步消息，便于按测试上下文检查交互；图中展示已保存的历史聊天记录。", featured: true },
        { image: "world-map", gif: "player-console", title: "控制中心：地图、玩家与聊天相互连接", caption: "录屏展示地图、玩家与聊天视图之间的切换。采集时玩家均离线，地图与详情展示保留的历史状态；在线运行时可观察主城及行军、采集、战斗相关状态。", featured: true }
      ]
    },
    {
      id: "ai", nav: "AI 托管", label: "06 / AI AGENTS", title: "让模型参与决策，\n让工具执行游戏操作。", layout: "ai",
      lead: "LLM 游戏 Agent 将模型、多轮交互与游戏工具连接起来，并接入玩家托管工作流。会话与记忆持续保存，让 AI 根据玩家当前状态推进任务。",
      intro: "通过 agent_delegate，Agent 可将任务委派给同环境、同联盟内可见且已启用 AI 的空闲玩家，实现多个玩家之间的任务协同。",
      process: [{ title: "理解任务", text: "基于目标与玩家上下文形成操作意图。" }, { title: "调用工具", text: "通过已接入的游戏能力执行操作。" }, { title: "读取反馈", text: "根据执行结果继续多轮交互。" }, { title: "持续协同", text: "保留会话与记忆，基于最新状态继续决策。" }],
      media: [
        { image: "ai-agent", title: "人格卡片：配置 Agent 的行为方式", caption: "通过人格卡片组织 Agent 配置，为 AI 托管设定相应的行为指引。", featured: true },
        { image: "ai-goals", title: "目标预设：复用托管任务意图", caption: "维护可复用的目标预设，让 AI 托管围绕选定目标开展后续决策与操作。", featured: true }
      ],
      note: "AI 的能力边界由接入的游戏工具、任务配置与运行环境共同决定。"
    },
    {
      id: "performance", nav: "性能观测", label: "07 / PERFORMANCE", title: "从制造负载，\n到理解系统表现。", layout: "standard",
      lead: "将场景设计、压测执行与结果分析串联起来，观察游戏服务在持续请求和复杂玩家行为下的运行表现。",
      highlights: [{ title: "场景负载", text: "围绕大地图随机行为、聊天消息风暴和玩家上下线组织专项测试。" }, { title: "执行观测", text: "结合执行状态、协议耗时与错误信息观察测试过程。" }, { title: "结果分析", text: "结合压测观测面板与场景执行报告，分析性能和稳定性现象。" }],
      media: [{ image: "performance-reports", title: "历史报告：回看专项测试运行", caption: "实际报告列表记录专项测试的状态、步骤数和耗时，可进入相应报告继续查看。列表中的运行步骤数不代表同时在线玩家数。", featured: true }, { image: "pressure", title: "压测观测：集中查看运行指标", caption: "压测观测页提供指标查看入口。采集时没有可展示的历史指标，图中用于说明观测界面与操作布局。", featured: true }]
    },
    {
      id: "workers", nav: "分布式 Worker", label: "08 / DISTRIBUTED WORKERS", title: "把执行资源，\n组织成可管理的节点。", layout: "workers",
      lead: "分布式 Worker 承载多节点任务执行。结合 Jenkins 构建发布与平台版本管理，支持选择版本批次更新，并按测试需要手动增减执行实例。",
      process: [{ title: "构建", text: "通过 Jenkins 构建发布执行版本。" }, { title: "更新", text: "在平台选择版本并按批次更新。" }, { title: "扩缩容", text: "按执行需求手动增减实例。" }, { title: "观察", text: "查看节点状态与任务运行情况。" }],
      media: [
        { image: "worker", title: "Worker 节点：集中查看执行资源", caption: "通过节点列表查看分布式执行资源与实例状态，为任务分配和资源调整提供依据。", featured: true },
        { image: "worker-build", gif: "worker-flow", title: "版本更新：选择已发布的构建版本", caption: "Jenkins 完成构建发布后，在平台选择版本进行批次更新。录屏演示版本选择与更新记录查看，没有发起实际更新。", featured: true },
        { image: "worker-scale", title: "手动扩缩容：按测试需要调整实例", caption: "通过新增 Worker 配置补充执行实例，并结合实例管理按需增减规模。" }
      ],
      closing: "从可视化编排到分布式运行，PD QA 将测试、玩家与执行资源连接成完整工作流。"
    }
  ]
};
