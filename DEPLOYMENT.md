# OpenArm Website 宝塔部署流程记录

更新日期：2026-05-29
项目路径：`C:\openarm-website`
线上域名：`https://nvatom.com/`
部署方式：GitHub Actions 手动触发，SSH 上传 Next.js standalone 包到宝塔服务器，再用 PM2 重载。

本文档记录当前项目真实可复现的部署流程。不得在本文档或仓库中写入宝塔账号、服务器密码、SSH 私钥、面板入口 token 等敏感信息。

## 1. 当前部署结论

当前有效部署链路：

1. 本地修改代码。
2. 提交并推送到 GitHub 仓库 `qianen6/openarm-website` 的 `main` 分支。
3. 在 GitHub Actions 手动运行 `Deploy to BaoTa` workflow。
4. GitHub runner 构建 Next.js standalone 产物。
5. GitHub runner 通过 SSH 上传压缩包到服务器 `/www/wwwroot/openarm-website`。
6. 服务器自动备份现有 `current` 目录。
7. 解压新版本为 `current`。
8. PM2 reload 或 start `openarm-website`。
9. 对 `http://127.0.0.1:3000` 做健康检查。
10. 通过 `https://nvatom.com/` 验证线上效果。

本地 Codex 环境此前无法稳定访问宝塔面板和服务器 SSH，浏览器表现为连接关闭；GitHub Actions runner 可以完成 SSH 部署，因此当前以 GitHub Actions 作为正式部署入口。

## 2. 关键文件

| 文件 | 作用 |
| --- | --- |
| `.github/workflows/deploy-baota.yml` | 正式宝塔部署 workflow。 |
| `next.config.ts` | 启用 `output: "standalone"`。 |
| `package.json` | 构建命令为 `npm run build`。 |
| `DESIGN.md` | 网站设计和文案准则。 |
| `DEPLOYMENT.md` | 本部署流程记录。 |

## 3. GitHub Secrets

GitHub 仓库需要配置以下 Secrets。只记录名称，不记录值。

| Secret | 用途 |
| --- | --- |
| `SSH_HOST` | 服务器地址。 |
| `SSH_PORT` | SSH 端口。 |
| `SSH_USER` | SSH 用户名。 |
| `SSH_PRIVATE_KEY` | 部署专用私钥。 |

配置位置：

```text
GitHub 仓库 -> Settings -> Secrets and variables -> Actions -> Repository secrets
```

安全规则：

- 私钥只保存在 GitHub Secrets。
- 不在仓库、聊天记录、部署包、日志中打印 secret 值。
- 面板账号密码不写入任何 Markdown。
- 如果凭证泄露，必须立即更换服务器密码和部署密钥。

## 4. Workflow 触发方式

当前 workflow 只支持手动触发，避免普通 push 自动覆盖线上版本。

操作路径：

```text
GitHub 仓库 -> Actions -> Deploy to BaoTa -> Run workflow -> Branch: main -> Run workflow
```

对应配置：

```yaml
on:
  workflow_dispatch:
```

## 5. 构建流程

GitHub runner 使用 Ubuntu 和 Node.js 20。

主要步骤：

```bash
npm ci
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

构建完成后必须存在：

```text
.next/standalone/server.js
```

Next.js standalone 不会自动携带所有静态资源，所以 workflow 会复制：

```bash
rm -rf .next/standalone/.next/static .next/standalone/public
mkdir -p .next/standalone/.next
cp -R .next/static .next/standalone/.next/static
cp -R public .next/standalone/public
```

随后在 `.next/standalone` 内生成 `ecosystem.config.js`，并压缩为：

```text
$RUNNER_TEMP/openarm-website-build.zip
```

## 6. PM2 配置

workflow 会把以下 PM2 配置写入部署包：

```js
module.exports = {
  apps: [
    {
      name: "openarm-website",
      script: "server.js",
      cwd: __dirname,
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "800M",
      min_uptime: "10s",
      max_restarts: 10,
      restart_delay: 4000,
      kill_timeout: 5000,
      listen_timeout: 10000,
      wait_ready: false,
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "0.0.0.0",
        NODE_OPTIONS: "--max-old-space-size=768"
      },
      error_file: "./logs/error.log",
      out_file: "./logs/out.log",
      merge_logs: true,
      time: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss Z"
    }
  ]
};
```

PM2 应用名固定为：

```text
openarm-website
```

应用端口固定为：

```text
3000
```

## 7. 上传流程

workflow 会先确保远程目录存在：

```bash
mkdir -p /www/wwwroot/openarm-website
```

然后通过 `scp` 上传：

```text
/www/wwwroot/openarm-website/build.zip
```

SSH 和 SCP 均使用 GitHub Secrets 中的连接信息，并关闭交互式 known hosts 写入：

```bash
-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null
```

## 8. 服务器发布流程

服务器上的目标目录：

```text
/www/wwwroot/openarm-website
```

workflow 在服务器执行以下逻辑：

1. 进入目标目录。
2. 若服务器没有 `unzip`，自动安装。
3. 生成时间戳 `YYYYMMDD_HHMMSS`。
4. 创建 `manual-backups/`。
5. 如果存在 `current`，先打包为手动备份。
6. 解压新包到 `release_TIMESTAMP`。
7. 删除上传的 `build.zip`。
8. 如果存在旧 `current`，移动为 `backup_TIMESTAMP`。
9. 将 `release_TIMESTAMP` 移动为 `current`。
10. 创建 `current/logs`。
11. 如果 PM2 已存在 `openarm-website`，执行 reload。
12. 如果 PM2 不存在，执行 start 并 save。
13. 清理 3 天前的自动 `backup_*`。
14. 对本机 `3000` 端口做健康检查。
15. 输出 PM2 状态。

核心命令逻辑：

```bash
cd /www/wwwroot/openarm-website

stamp="$(date +%Y%m%d_%H%M%S)"
mkdir -p manual-backups

if [ -d current ]; then
  tar -czf "manual-backups/current_before_${stamp}.tar.gz" current
fi

release_dir="release_${stamp}"
rm -rf "$release_dir"
mkdir -p "$release_dir"
unzip -oq build.zip -d "$release_dir"
rm -f build.zip

if [ -d current ]; then
  mv current "backup_${stamp}"
fi

mv "$release_dir" current
mkdir -p current/logs

cd current
pm2 reload openarm-website --update-env || pm2 start ecosystem.config.js
```

## 9. 备份策略

手动备份目录：

```text
/www/wwwroot/openarm-website/manual-backups
```

手动备份命名：

```text
current_before_YYYYMMDD_HHMMSS.tar.gz
```

手动备份不会被 workflow 自动删除。

自动发布中间备份命名：

```text
backup_YYYYMMDD_HHMMSS
```

自动 `backup_*` 目录会清理 3 天以前的版本。

最近一次成功部署时创建的手动备份：

```text
/www/wwwroot/openarm-website/manual-backups/current_before_20260529_164956.tar.gz
```

## 10. 健康检查

workflow 会最多尝试 5 次，每次间隔 2 秒：

```bash
curl -fsS --max-time 5 http://127.0.0.1:3000
```

通过时日志会出现：

```text
Health check passed.
```

随后输出：

```bash
pm2 status openarm-website
```

PM2 期望状态：

```text
online
```

## 11. 线上验收

部署成功后打开：

```text
https://nvatom.com/
```

必须验证：

- 首页能正常加载。
- 首屏视频或 poster 能显示。
- 中文 Hero 标题为：

```text
个人机器人 PR X1
让每一个家庭拥抱智慧新成员
```

- 中文 Hero 副标题为：

```text
加速具身智能机器人融入家庭，
把琐碎留给科技，把时间留给爱。
```

- 切换英文后 Hero 标题为：

```text
Personal Robot PR X1
A Smart Family Member
```

- 英文 Hero 副标题为：

```text
Accelerating embodied AI robots into the home, leaving chores to technology and time to love.
```

- 导航中文为：技术、产品、价格、购买通道、关于。
- 导航英文为：Solutions, Products, Pricing, Follow Us, About Us。
- 点击预售按钮能打开 QQ 群弹窗。

## 12. 回滚流程

如果新版本线上异常，可用最近手动备份回滚。

SSH 到服务器后执行：

```bash
cd /www/wwwroot/openarm-website
mv current "failed_current_$(date +%Y%m%d_%H%M%S)"
tar -xzf manual-backups/current_before_YYYYMMDD_HHMMSS.tar.gz
cd current
pm2 reload openarm-website --update-env || pm2 start ecosystem.config.js
```

注意：

- `tar` 包内包含 `current/` 目录，所以不要提前新建空 `current`。
- 回滚后再次访问 `https://nvatom.com/` 验证。
- 如果 PM2 reload 失败，再查看日志：

```bash
pm2 logs openarm-website --lines 100
```

## 13. 常用排查命令

查看 PM2 状态：

```bash
pm2 status openarm-website
```

查看日志：

```bash
cd /www/wwwroot/openarm-website/current
tail -n 100 logs/error.log
tail -n 100 logs/out.log
pm2 logs openarm-website --lines 100
```

检查本机端口：

```bash
curl -I http://127.0.0.1:3000
```

查看当前目录：

```bash
ls -lah /www/wwwroot/openarm-website
ls -lah /www/wwwroot/openarm-website/current
ls -lah /www/wwwroot/openarm-website/manual-backups
```

查看 Nginx 是否能代理到 Node：

```bash
curl -I https://nvatom.com/
```

## 14. 最近一次成功部署记录

最近一次已知成功部署：

| 项目 | 值 |
| --- | --- |
| Git commit | `0d56022 Add BaoTa deployment workflow` |
| GitHub Actions run | `https://github.com/qianen6/openarm-website/actions/runs/26627741947` |
| PM2 应用 | `openarm-website` |
| 状态 | `online` |
| 手动备份 | `/www/wwwroot/openarm-website/manual-backups/current_before_20260529_164956.tar.gz` |

本记录用于追踪流程，不代表以后只能部署该 commit。新版本应以 GitHub Actions 最新成功 run 为准。

## 15. 下次部署前检查

部署前：

1. 确认 `git status` 中只包含想发布的文件。
2. 运行 `npm run lint`。
3. 重大 UI 或构建相关改动运行 `npm run build`。
4. 确认 `DESIGN.md` 与当前网站文案和视觉一致。
5. 提交并推送到 `main`。
6. 手动运行 `Deploy to BaoTa` workflow。

部署后：

1. 检查 GitHub Actions 结果为绿色。
2. 检查日志包含 `Manual backup saved`、`Health check passed`。
3. 打开 `https://nvatom.com/`。
4. 验证中英文首屏文案、导航、预售弹窗。
5. 如异常，按第 12 节回滚。
