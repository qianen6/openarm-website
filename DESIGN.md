# PR X1 / OpenArm 官网设计手册

版本：1.1
状态：本文件是 `C:\openarm-website` 当前官网的视觉、文案、组件、媒体和动效准则。
更新日期：2026-05-29
部署流程：见 [DEPLOYMENT.md](DEPLOYMENT.md)。本文档只定义网站呈现，不记录服务器凭证。

## 1. 品牌定位

PR X1 是一台从科研级具身智能平台走向家庭生活场景的个人机器人。当前可信落点是科研实验室、开源生态和真实任务演示；长期愿景是进入家庭，帮助人类处理琐碎家务。

官网必须同时传达三层信息：

1. 技术可信：移动之躯、双臂协作、具身智能、开源生态。
2. 情感可感：它是未来家庭中的智慧新成员，不只是实验室设备。
3. 表达克制：不得暗示已经成熟量产、已经大规模进入家庭，或已经能独立完成所有家务。

视觉身份固定为：**Warm Machine Intelligence / 温暖科技感**。

这个风格必须满足：

- 有家庭亲近感，但不软萌。
- 有科研可信度，但不冰冷。
- 有高级硬件质感，但不炫技。
- 有开源生态气质，但不做成纯开发者工具站。

## 2. 当前信息架构

首页顺序必须与当前实现一致：

1. `Navbar`：品牌、语言切换、锚点导航、预售入口。
2. `HeroSection`：视频首屏、PR X1 家庭愿景、双语 CTA。
3. `MetricsSection`：全球开源社区与透明度数据。
4. `FeaturesSection`：AMR x OpenArm 能力叙事与主视觉图。
5. `ProductSection`：Mobile OpenArm X1 产品图、科研平台叙事与参数。
6. `PricingSection`：三档预售方案。
7. `ChannelsSection`：官方购买与关注通道。
8. `CTASection`：智谷原子 x 开源硬件愿景与咨询入口。
9. `Footer`：产品、资源、公司链接。
10. `GroupModal`：QQ 预售群弹窗。

导航标签必须保持一致：

| 语言 | 导航项 | 品牌 Badge | 主按钮 |
| --- | --- | --- | --- |
| 中文 | 技术、产品、价格、购买通道、关于 | 智谷原子 | 加入预售 |
| English | Solutions, Products, Pricing, Follow Us, About Us | NVatom | Pre-order |

当前主要区块标题必须保持下表语义一致：

| 区块 | 中文 | English |
| --- | --- | --- |
| Metrics | 受到全球顶尖机器人开发者与开源社区信赖 | Trusted by Leading Robotics Developers and Open-Source Communities Worldwide |
| Features eyebrow | AMR x OpenArm | AMR x OpenArm |
| Features title | 为OpenArm注入空间自由意志 | Empowering OpenArm with Spatial Autonomy |
| Product eyebrow | 旗舰型号 | FLAGSHIP EDITION |
| Product title | Mobile OpenArm X1 | Mobile OpenArm X1 |
| Pricing eyebrow | 预售价格 | PRE-ORDER PRICING |
| Pricing title | 智谷原子 X OpenArm X ROS教育基金会 联手共建 | NVatom x OpenArm x ROS Education Foundation |
| Channels title | 通过官方通道购买与关注 | Purchase and Connect via Official Channels |
| CTA title | 智谷原子 x 开源硬件 | NVatom x Open Hardware |
| Footer description | 开源硬件 重新定义具身机器人 | Open Hardware for Embodied Robotics |

## 3. 色彩系统

所有新增 UI 必须使用当前 `src/app/globals.css` 中的 token。不得临时新增主色。

| Token | 色值 | 用途 |
| --- | --- | --- |
| `--color-canvas` | `#E8E3DA` | 页面主背景，低亮度浅暖金属灰。 |
| `--color-canvas-2` | `#D9D3C8` | 交替区块、浅色过渡背景、页脚分层。 |
| `--color-surface` | `#F6F1E7` | 普通卡片、价格卡、弹窗底色。 |
| `--color-surface-2` | `#D5CEC2` | 抬升层、媒体托盘、浅色区块分层。 |
| `--color-fg` | `#171A18` | 主标题、核心正文、主要信息。 |
| `--color-fg-muted` | `#4E5652` | 段落、副标题、说明文本。 |
| `--color-fg-subtle` | `#74746D` | 元信息、非激活导航、辅助文本。 |
| `--color-line` | `rgba(23, 26, 24, 0.14)` | 默认 1px 边框、分割线。 |
| `--color-line-strong` | `rgba(23, 26, 24, 0.24)` | hover 边框、激活描边。 |
| `--color-cyan-400` | `#087F79` | 主要科技强调色、链接、关键参数。 |
| `--color-cyan-300` | `#0FB7AD` | CTA 高光、图标微光、细节亮色。 |
| `--color-amber-400` | `#B88D5F` | 极少量暖金属辅助色。 |
| `--color-amber-300` | `#D9BC91` | 浅色界面中的柔和暖金属细节。 |

深色模式只用于首屏视频、暗色遮罩和必要技术展示：

```css
--color-canvas: #070808;
--color-canvas-2: #0a0d0c;
--color-surface: #111413;
--color-surface-2: #181c1a;
--color-fg: #f4f0e8;
--color-fg-muted: #beb8ad;
--color-fg-subtle: #8c8780;
--color-line: rgba(228, 224, 216, 0.13);
--color-line-strong: rgba(228, 224, 216, 0.24);
--color-cyan-400: #41d6cc;
--color-cyan-300: #8efff0;
```

页面主体背景必须保持当前浅暖金属质感：

```css
radial-gradient(ellipse at 78% -12%, rgba(8, 127, 121, 0.06), transparent 34rem),
linear-gradient(180deg, #eee8dd 0%, #e1dacd 100%)
```

色彩比例目标：

- 62% 浅暖金属灰背景。
- 22% 深石墨文字。
- 10% 视频、产品图和硬件托盘中的黑钛质感。
- 5% cyan 科技强调。
- 1% 以下低饱和暖金属细节。

禁止模式：

- 大面积纯黑背景。
- 大面积黄色滤镜或奶油米色。
- 紫色、蓝紫色、霓虹渐变。
- 琥珀色主按钮。
- 纯白文字大面积铺排。

## 4. 字体系统

字体栈必须与当前实现一致：

```css
--font-display: var(--font-geist-sans), "HarmonyOS Sans SC", "OPPO Sans", "Source Han Sans SC", "Microsoft YaHei", system-ui, sans-serif;
--font-sans: var(--font-geist-sans), "HarmonyOS Sans SC", "OPPO Sans", "Source Han Sans SC", "Microsoft YaHei", system-ui, sans-serif;
--font-mono: var(--font-geist-mono), "JetBrains Mono", "SFMono-Regular", Consolas, monospace;
```

排版规则：

- 标题和正文使用同一套 sans 字体。
- 等宽字体只用于技术标签、参数、版本号、小型英文标签。
- 中文和正文文本字距为 `0`。
- 英文大写小标签可使用 `0.14em` 到 `0.18em` 字距。
- 禁止大标题渐变文字。

当前字号规则：

| 角色 | 桌面 | 平板 | 手机 | 字重 | 行高 |
| --- | --- | --- | --- | --- | --- |
| Hero H1 | `52px` | `44px` | `30px` | `720` | `1.06` |
| Section H2 | `48px` 到 `60px` | `44px` | `30px` 到 `36px` | `700` | `1.1` 到 `1.2` |
| Card H3 | `20px` 到 `24px` | `20px` | `18px` 到 `20px` | `600` 到 `700` | `1.2` |
| 大正文 | `19px` 到 `20px` | `18px` | `17px` | `450` | `1.65` |
| 正文 | `14px` 到 `16px` | `15px` 到 `16px` | `14px` 到 `16px` | `400` 到 `500` | `1.5` 到 `1.7` |
| Eyebrow | `12px` 到 `16px` | `12px` | `12px` | `600` 到 `700` | `1.2` |
| 数据数字 | `48px` | `40px` | `36px` | `800` | `1.0` |

## 5. 布局系统

当前页面网格：

- 内容最大宽度：`1280px`。
- 桌面左右边距：`80px`。
- 平板左右边距：`40px`。
- 手机左右边距：`24px`。
- 常规区块上下间距：`96px` 到 `112px`。
- Hero 高度：`min-height: 100dvh`。
- 锚点滚动偏移：`7rem`。

构图规则：

- Hero 必须左对齐，文字块宽度控制在 `560px` 到 `680px`。
- 首页主体使用浅色全宽区块，不使用整页大黑底。
- 卡片圆角默认为 `8px`，媒体容器可用 `24px`。
- 禁止卡片套卡片。
- 禁止将整段页面做成漂浮大卡片。
- 三列卡片必须有清晰信息层级，不能做成泛 SaaS 卡片墙。

允许间距刻度：

```text
4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 112 / 128
```

## 6. Hero 首屏系统

Hero 是官网的情绪和技术锚点。当前实现位于 `src/components/HeroSection.tsx`。

### 6.1 当前首屏文案

中文标题：

```text
个人机器人 PR X1
让每一个家庭拥抱智慧新成员
```

中文副标题：

```text
加速具身智能机器人融入家庭，
把琐碎留给科技，把时间留给爱。
```

英文标题：

```text
Personal Robot PR X1
A Smart Family Member
```

英文副标题：

```text
Accelerating embodied AI robots into the home, leaving chores to technology and time to love.
```

中文 CTA：

```text
加入预售群
查看产品详情
```

英文 CTA：

```text
Pre-order Now
Product Details
```

### 6.2 Hero 媒体

- 主视频：`public/videos/research-box-demo.mp4`。
- Poster：`public/videos/research-box-demo.jpg`。
- 视频属性：`autoPlay`、`loop`、`muted`、`playsInline`、`preload="metadata"`。
- 装饰性视频设置 `aria-hidden="true"`。
- 用户开启 `prefers-reduced-motion` 时显示 poster，不播放视频。
- 当前裁切：`object-cover object-[50%_center]`。
- 视频色调：`brightness(1.04) contrast(1.04) saturate(1.03)`。

### 6.3 Hero 遮罩

当前首屏有四类覆盖层，必须保持文字可读和视频主体可见。

阅读遮罩：

```css
linear-gradient(90deg, rgba(245, 242, 236, 0.12) 0%, rgba(245, 242, 236, 0.07) 34%, rgba(245, 242, 236, 0.02) 62%, transparent 100%),
linear-gradient(90deg, rgba(7, 8, 8, 0.56) 0%, rgba(7, 8, 8, 0.44) 30%, rgba(7, 8, 8, 0.18) 60%, rgba(7, 8, 8, 0.02) 100%),
radial-gradient(ellipse at 27% 52%, rgba(7, 8, 8, 0.24), transparent 40%),
linear-gradient(180deg, rgba(7, 8, 8, 0) 0%, rgba(7, 8, 8, 0) 44%, rgba(7, 8, 8, 0.1) 100%)
```

底部过渡：

```css
linear-gradient(180deg, rgba(7, 8, 8, 0) 0%, rgba(7, 8, 8, 0.18) 40%, rgba(232, 227, 218, 0.88) 74%, #e8e3da 88%, #e8e3da 100%)
```

氛围光：

```css
linear-gradient(100deg, rgba(244, 240, 232, 0.018) 0%, transparent 31%),
linear-gradient(78deg, transparent 0%, transparent 50%, rgba(65, 214, 204, 0.1) 74%, transparent 100%),
linear-gradient(180deg, rgba(142, 255, 240, 0.026) 0%, transparent 32%, rgba(7, 8, 8, 0.18) 100%)
```

技术网格：

```css
background-size: 48px 48px;
mask-image: radial-gradient(circle at 50% 35%, black 35%, transparent 82%);
```

### 6.4 Hero 可读性

- H1 颜色：`#f4f0e8`。
- 副标题颜色：`#d1c8bb`。
- H1 阴影：`0 2px 18px rgba(0,0,0,0.42)`。
- 文字必须在视频最亮帧和最暗帧上都可读。
- 手机端 CTA 纵向排列并占满可用宽度。

## 7. 组件系统

### 7.1 导航

当前实现位于 `src/components/Navbar.tsx`。

- 位置：`fixed`，顶部 `16px`。
- 高度：`64px`。
- 外侧横向边距：手机 `12px`，桌面 `24px`。
- 形状：pill。
- 初始背景：`bg-canvas/50 backdrop-blur-xl border-line`。
- 滚动后背景：`bg-canvas/80 backdrop-blur-2xl border-line`。
- 滚动后阴影：`0 20px 60px rgba(0,0,0,0.36)`。
- 链接默认：`text-fg-subtle`。
- 链接 hover：`text-fg`。
- 品牌：`OpenArm × 智谷原子` 或 `OpenArm × NVatom`。
- 品牌 Badge：`border-cyan-300/30 text-cyan-300`。
- 语言切换：圆角 `8px`，边框 `border-line`，文字 `text-fg`。

### 7.2 按钮

主按钮：

- 最小高度：`44px`。
- 圆角：`999px`。
- 背景：

```css
linear-gradient(135deg, #88eee4 0%, #31c8be 50%, #0f8c84 100%)
```

- 文字颜色：`#06110f` 或 `text-canvas`。
- 阴影：

```css
inset 0 1px 0 rgba(255, 255, 255, 0.32),
inset 0 -1px 0 rgba(3, 68, 65, 0.36),
0 0 0 1px rgba(49, 200, 190, 0.18),
0 18px 42px rgba(17, 122, 115, 0.16)
```

- 箭头使用内嵌圆形容器，hover 时 `translate-x-1` 和 `-translate-y-[1px]`。
- active 时缩放到 `0.98`。

次按钮：

- 圆角：`999px`。
- 边框：浅色区使用 `border-line`，Hero 上使用 `border-white/15`。
- 背景：`rgba(228,224,216,0.04)` 或 `bg-white/8`。
- hover 边框：`cyan-400/40` 或 `cyan-300/50`。

### 7.3 卡片与面板

普通卡片：

- 圆角：`8px`。
- 背景：`bg-surface` 或 `bg-surface/70`。
- 边框：`border-line`。
- 默认无厚重阴影。
- hover：上移 `4px` 到 `8px`，边框变为 `cyan-400/20` 到 `cyan-400/30`。

媒体卡片：

- 圆角：`24px`。
- 用于首屏视频、特性主视觉、产品图。
- 可使用浅暖金属托盘或黑钛投影。
- 不得放在另一个卡片内部。

价格卡：

- 圆角：`8px`。
- 推荐款用 cyan 渐变边框，不使用紫色 glow。
- 价格使用 `text-cyan-400`。
- 机器人渲染图放在浅色托盘内，保持 `object-contain`。

弹窗：

- 遮罩：`rgba(8, 7, 6, 0.72)`。
- 弹窗底色：`bg-surface`。
- 圆角：`12px`。
- 最大宽度：`480px`。
- 支持 Escape 关闭、背景滚动锁定、初始焦点。

## 8. 媒体系统

### 8.1 视频

允许使用的视频：

- `public/videos/research-box-demo.mp4`：首屏、箱子搬运、桌面放置。
- `public/videos/research-pickup-demo.mp4`：地面拾取、投放任务。
- `public/videos/research-drawer-demo.mp4`：抽屉操作、桌边取物。
- `public/videos/research-laundry-demo.mp4`：柔软衣物处理。
- `public/videos/research-load-demo.mp4`：双臂负载稳定性。

每个视频必须有对应 `.jpg` poster。

视频含义固定为：

- 真实任务能力证据。
- 训练数据和评测场景证据。
- 长期家庭愿景的可视化证据。

视频不得被解释为：

- 已经成熟家用。
- 已经大量家庭部署。
- 已经能独立完成所有家务。

### 8.2 图片

当前关键图片：

- `public/images/openarm-spatial-autonomy-frame.jpg`：Features 主视觉。
- `public/images/showcase-02.png`：双电池 + 轮臂构型备用展示图。
- `public/images/showcase-03.png`：ZPF 机动底盘 + 轮臂模块备用展示图。
- `public/images/homepage.png`：Product 主产品图。
- `public/images/openarm-rcb-kk-20260512.png`：M-OpenArm Edu 价格卡。
- `public/images/openarm-dualbattery-kk.png`：M-OpenArm Pro 价格卡。
- `public/images/openarm-zpf-singlejoint.png`：M-OpenArm Max 价格卡。
- `public/images/qq-group-qr.jpg`：预售 QQ 群二维码。

图片规则：

- 优先使用真实产品图或真实渲染图，不用库存图假装产品证据。
- 产品图必须能看清机器人结构。
- 讲移动能力时不得裁掉底盘。
- 讲双臂协作时不得只展示单臂局部。
- 生成图只能用于概念氛围，不能用于产品能力证明。

## 9. 文案规范

### 9.1 中文语气

中文文案必须精确、温暖、克制。

允许使用：

- 个人机器人
- 智慧新成员
- 把琐碎留给科技，把时间留给爱
- 具身智能
- 移动之躯
- 双臂协作
- 开源生态
- 真实任务演示
- 科研实验室落地

禁止使用：

- 颠覆
- 革命性
- 全屋自主
- 完成所有家务
- 已进入千家万户
- 重新定义一切
- 极致性价比

### 9.2 英文语气

英文文案必须清晰、可信、有人情味。

允许使用：

- Personal Robot
- Smart Family Member
- Embodied AI
- Mobile manipulation
- Open ecosystem
- Real-world task demos
- Research-grade platform

禁止使用：

- Next-gen
- Unleash
- Seamless
- Revolutionary
- Game-changing
- Effortless everything
- Fully autonomous household labor

### 9.3 产品承诺边界

官网可以表达：

- PR X1 是个人机器人方向。
- 平台展示了与家庭相关的真实任务。
- 当前可信锚点是科研落地和开源生态。
- 长期愿景是融入家庭。

官网不得表达：

- PR X1 已经是成熟家庭消费机器人。
- PR X1 可以独立完成所有家务。
- PR X1 已经大量进入家庭。
- PR X1 保证全屋自主。

## 10. 动效系统

动效必须沉稳、克制、有重量。

当前规则：

- Hero 文案入场：`600ms`，延迟 `0.3s / 0.5s / 0.7s`。
- 常规区块入场：`600ms` 到 `700ms`。
- 卡片 hover：`250ms` 到 `300ms`，上移不超过 `8px`。
- 导航状态切换：`500ms`。
- 弹窗入场：`180ms` 到 `220ms`。
- 通用可见 UI 缓动优先使用 `cubic-bezier(0.32, 0.72, 0, 1)`。

允许动画属性：

- `opacity`
- `transform`
- 小范围非滚动装饰元素的 `filter`

禁止：

- 动画 `width`、`height`、`top`、`left`、`margin`、`padding`。
- 在滚动容器上使用大面积动画 blur。
- 与首屏视频抢注意力的无限装饰动画。

Reduced Motion：

- 首屏视频切换为 poster。
- 滚动入场和计数动画必须立即完成或明显减弱。
- hover 位移关闭或明显减弱。

## 11. 响应式规则

断点：

- 手机：`< 768px`。
- 平板：`768px` 到 `1023px`。
- 桌面：`1024px` 及以上。

手机要求：

- 禁止横向滚动。
- Hero 内容保持左对齐。
- Hero 标题允许两行到三行，但不得被导航遮挡。
- 所有点击目标不小于 `44px`。
- 多列布局必须变为单列。
- 文本不得与视频主体或导航重叠。
- 移动导航展开时必须锁定背景滚动。

桌面要求：

- 内容不得超过 `1280px`。
- Hero 文字块宽度必须在 `560px` 到 `680px`。
- Hero 右侧必须保留可见机器人动作。
- 页面节奏必须形成：Hero、数据、能力、产品、价格、渠道、CTA、Footer。

## 12. 可访问性规则

- 正文对比度必须满足 WCAG AA。
- 焦点态必须可见，颜色使用 cyan。
- 按钮和链接必须有语义标签。
- 视频不得成为唯一信息来源。
- 装饰性视频必须 `aria-hidden`。
- 必须尊重 reduced motion。
- 弹窗必须支持 Escape 关闭和初始焦点。

## 13. 实施流程

任何 UI 改动前必须按顺序执行：

1. 判断组件属于本文档哪一类。
2. 使用第 3 节固定色彩 token。
3. 对照第 4 节检查字体和字号。
4. 对照第 5 节检查布局和间距。
5. 对照第 7 节检查组件状态。
6. 在 `390px`、`768px`、`1440px` 三个宽度做响应式检查。
7. 运行 `npx eslint src`。
8. 重大 UI 改动必须运行 `npm run build`。

文案改动必须同步检查中文、英文、导航、CTA 和弹窗，不得只改一种语言。

## 14. 禁用模式

以下模式禁止出现：

- 纯黑页面背景。
- 大面积紫蓝霓虹渐变。
- 大标题渐变文字。
- 米色、奶油色整页背景。
- 装饰性光球、泡泡、随机光斑。
- 泛 SaaS 卡片墙。
- 卡片套卡片。
- 多个主强调色并列。
- 到处都是圆角文字胶囊。
- 可爱化、玩具化机器人视觉。
- 库存图首屏。
- 假数据、假精度。
- UI 中出现 emoji。
- 页面里出现解释网站如何使用的说明文字。
- 未经确认就暗示成熟家庭部署。

## 15. 设计验收清单

设计改动只有全部满足以下条件才算通过：

- 5 秒内能感到温暖、高级、科技可信。
- 首屏视频支撑文案，而不是与文案抢注意力。
- 色彩读起来是浅暖金属灰 + 局部黑钛视频/硬件托盘 + cyan 仪器光。
- Hero 左侧没有过黑死角，也没有黄色雾感。
- 文字是暖白或石墨黑，不是纯白、蓝白或灰蒙蒙。
- 新 UI 不出现紫色 / violet。
- 普通卡片圆角为 `8px`。
- CTA 是 cyan，不是 amber。
- 手机没有横向溢出。
- 中英文传达同一定位。
- 页面不像泛 AI SaaS 模板。
- 页面不像米色家电官网。
- 页面没有过度承诺家庭自主能力。
