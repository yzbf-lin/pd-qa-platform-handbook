# PD QA · 平台产品手册

介绍 PD QA 游戏测试平台的独立静态文档项目。默认使用深色主题，搭配真实深色界面截图与操作录屏，包含平台简介、功能地图、场景测试、环境与协议、玩家托管、AI 托管、性能观测和分布式 Worker 八个章节。

## 查看

公网地址：[PD QA 平台产品手册](https://yzbf-lin.github.io/pd-qa-platform-handbook/)，无需登录。

发布仓库：[yzbf-lin/pd-qa-platform-handbook](https://github.com/yzbf-lin/pd-qa-platform-handbook)，由 GitHub Pages 托管。

直接用浏览器打开 `index.html`，无须安装依赖、启动服务或联网。完整目录一起复制即可离线分享。

- 左侧目录跳转章节；手机视口通过顶部「目录」按钮展开。
- 「搜索功能与场景」或 `⌘ K` / `Ctrl K` 搜索全文，结果可直达章节。
- 点击截图放大，`Esc` 关闭。录屏默认显示静态封面，手动点击「播放演示」播放 GIF；「停止演示」切回静态截图。
- 页面隐藏、打印或启用减弱动画时，停止正在播放的 GIF。
- 「打印 / 保存为 PDF」使用浏览器打印功能，切换为浅底深字并隐藏导航和交互控件；图片保留原始颜色。

## 编辑

```text
index.html               页面框架与弹窗
content.js               章节文字、功能说明、截图和 GIF 清单
assets/site.css          排版、响应式与打印样式
assets/site.js           渲染、搜索、导航、图片放大及录屏控制
assets/screenshots/      真实 PNG 截图
assets/recordings/       真实操作 GIF
evidence/media-manifest.json  素材来源、采集状态、尺寸与 SHA-256
scripts/check.mjs        零依赖结构与媒体检查
scripts/build.mjs        校验后输出 dist/ 离线目录
```

修改文案或图注只需编辑 `content.js`。每个媒体项包含：

```js
{
  image: "scenarios",          // assets/screenshots/scenarios.png
  gif: "scenario-flow",        // 可选：assets/recordings/scenario-flow.gif
  title: "场景工作台",
  caption: "对应真实截图的说明。",
  featured: true               // 可选：跨列大图
}
```

`image` / `gif` 也可以填写包含 `/` 的项目内相对路径。请始终保留真实截图作为 GIF 的静态封面。无法采集的录屏应移除 `gif` 配置；不要用模拟界面代替实录。

## 本地检查与构建

需要 Node.js 18 或更新版本。没有第三方依赖，不需要执行安装命令。

```sh
npm run check          # 检查结构，报告尚未加入的媒体
npm run check:release  # 严格检查，缺少媒体会失败
npm run build          # 严格检查通过后复制到 dist/
```

脚本检查只覆盖语法、目录、链接和媒体存在性。交付前还应通过真实浏览器检查桌面与手机布局、搜索、章节跳转、图片放大、GIF 控制以及打印预览。

## 内容与素材原则

- 所有界面素材从当前平台采集；录屏只记录真实操作，不制作产品界面替身。
- 场景示例展示 Script、Role、Request、Loop、If、Action、Wait 七类已适配步骤，可选用 Scenario 引用或复制已有场景。If 仅在条件成立时执行子步骤。RPA 指点击添加步骤后，在树形流程中调整顺序与嵌套关系；本次示例为未保存、未执行的编辑草稿。
- 编辑器虽有 Notify「消息」入口，但当前 PD 执行适配尚未支持，不将它计入本例可执行组合。OnlyOnce 也未作为已适配能力展示。
- PD 当前使用 TCP / Sproto，环境关联服务器、变量与配置分支，不承诺未实现的通用协议切换。
- 聊天信息按环境与 KID 聚合刷新；地图展示已接入的主城与行军、采集、战斗信息。
- AI 保留会话与记忆，使用工具调用和受条件约束的任务委派；不将未实现的执行检查点写成故障恢复能力。
- Worker 通过 Jenkins 构建发布，在平台中选版本批次更新，按需手动增减实例；不宣称负载自动弹性。
- 性能截图使用真实压测观测与场景报告页面，不使用尚在开发中的模拟性能工作台数据。
- 对外分享前检查截图中是否含内部地址、服务器标识、账号、聊天内容或访问凭据；使用已脱敏的实录素材。

## 本版媒体展示范围

本版于 2026-10-03 采集，21 张截图和 3 份录屏均使用真实深色界面，不使用图片反色滤镜。图注与实际内容对应：

- 接口截图展示 `Bag_UseItems` 协议结构抽屉，没有展示请求发送结果。
- 环境素材分别展示环境切换下拉和服务器、变量、`config_version` 分支配置。
- 场景素材展示七类步骤的地图巡检草稿，以及条件配置和真实拖拽操作。Action 使用 `random_aoi_roam`，表示 AOI 视角巡游，不表示派遣部队；截图与录屏不作为场景执行完成的证据。
- 玩家素材覆盖机器人列表、基础信息、单项雷达任务下发配置、每日固定时刻 / 固定间隔定时策略，以及历史聊天。雷达面板展示普通任务、精英领主、队伍策略和等待选项，不表示六类任务同时执行。
- 地图录屏展示三名测试玩家同时在线、并发执行单次打野，三支部队的行军状态与玩家详情同步更新。三项任务均成功，部队已返回。采集后已核验三名演示玩家全部恢复离线，在线数为 0、无活动运行、无外派部队；玩家详情截图展示恢复后的基础信息。
- 雷达尝试中，两个运行没有可执行情报，另一个完成派遣但在 `Radar_GetIntelRewardOneClick` 领奖时返回参数异常 `code=2`，对应任务项失败。不能把该批次的表面 `SUCCESS` 当作雷达完成闭环；因此动态演示采用已验证成功的单次打野，没有将其标为雷达或 AI 托管实录。
- AI 素材展示人格卡片与目标预设配置，没有实际运行对话或工具调用实录。正文能力说明与配置界面展示分开表述。
- Worker 素材覆盖节点列表、已发布版本选择器和新增实例配置。录屏仅演示版本列表与更新记录切换，没有执行构建、更新或扩缩容操作。构建发布由 Jenkins 完成，平台负责选择发布版本批次更新及手动增减实例。
- 历史报告列表展示真实运行记录；压测观测截图当前没有可展示的历史指标，只说明已实现的观测界面与操作布局，不作为有效负载或性能结果的证据。后续加入实测报告时，应同步更新图注和本节说明。

本次没有保存场景草稿、覆盖玩家原任务组、修改定时策略、启用 AI 托管、发起性能压测，或执行 Worker 构建、更新、扩缩容。玩家上线与临时任务下发是为了真实录制而执行的限定操作；离线恢复完成不表示已经回滚期间产生的游戏资源变化。

## 素材清单

配置的素材以 `content.js` 为准。默认截图名：`overview`、`interfaces`、`factory`、`scenarios`、`scenario-rpa`、`scenario-steps`、`environments`、`environment-config`、`players`、`player-detail`、`player-tasks`、`player-schedule`、`player-chat`、`world-map`、`ai-agent`、`ai-goals`、`performance-reports`、`pressure`、`worker`、`worker-build`、`worker-scale`；默认录屏名：`scenario-flow`、`player-console`、`worker-flow`。

截图缺失时页面会显示明确提示，严格检查会失败；因此未采集齐素材不应作为完成版分享。
