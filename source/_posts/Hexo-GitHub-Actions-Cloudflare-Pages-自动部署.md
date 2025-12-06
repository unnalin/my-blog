---
title: Hexo 博客 + GitHub Actions + Cloudflare Pages 自动部署
date: 2025-12-06 15:27:43
tags:
---
# Hexo 博客 + GitHub Actions + Cloudflare Pages 自动部署

刚刚做了一下博客的自动部署和关联我之前买的域名，差点给我折腾4，写一篇教程好了。

本文档记录了如何将本地 Hexo 博客源码托管在 GitHub，并通过 GitHub Actions 自动构建并推送到 Cloudflare Pages (Direct Upload 模式) 的完整流程。

## 1. 准备工作
- 本地已安装 Node.js 和 Hexo 和 git 和 cnpm。
可以用node -v hexo -v git --version cnpm - v查看有没有安装
（没有安就npm install -g cnpm全局安装）
- 拥有一个 GitHub 账号。
- 拥有一个 Cloudflare 账号。

## 2. 本地 Hexo 与 GitHub 仓库关联

### 2.1 初始化与主题修复
如果你使用了第三方主题（如 Butterfly）并是通过 `git clone` 下载的，必须删除主题内的 `.git` 文件夹，否则会导致子模块冲突，Cloudflare 无法拉取主题文件。

```bash
# 1. 删除主题目录下的 .git 文件夹（手动删除或命令行）
rm -rf themes/butterfly/.git

# 2. 如果之前 git add 报错，强制清除缓存
git rm --cached themes/butterfly -f

# 3. 提交代码到 GitHub
git add .
git commit -m "初始化博客并修复主题"
git branch -M main
# 替换为你的仓库地址
git remote add origin https://github.com/你的用户名/你的仓库名.git
git push -u origin main
```

## 3. 获取 Cloudflare 授权信息

为了让 GitHub Actions 有权限上传文件，需要获取 **Account ID** 和 **API Token**。

1.  登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)。
2.  **获取 Account ID**:
    *   在浏览器 URL 地址栏中，`dash.cloudflare.com/` 后面的一串字符就是 ID。
    *   或者在右下角 API 区域找到 **Account ID**。
3.  **获取 API Token**:
    *   点击右上角头像 -> **My Profile** -> **API Tokens** -> **Create Token**。
    *   选择 **Custom Token** (自定义令牌)。
    *   **Permissions (权限)**: 
        *   Account -> `Cloudflare Pages` -> `Edit`
    *   **Account Resources**: `Include` -> `All accounts`。
    *   生成并复制 Token（注意：只显示一次，请妥善保存）。

## 4. 配置 GitHub Secrets

不要将密钥直接写在代码里，必须配置到仓库的 Secrets 中。

1.  进入 GitHub 博客仓库 -> **Settings** -> **Secrets and variables** -> **Actions**。
2.  点击 **New repository secret** 添加以下两个变量：
    *   Name: `CLOUDFLARE_ACCOUNT_ID` / Value: (填入刚才获取的 ID)
    *   Name: `CLOUDFLARE_API_TOKEN` / Value: (填入刚才获取的 Token)

## 5. 在 Cloudflare 手动创建占位项目

**注意**：`cloudflare/pages-action` 插件无法自动创建新项目，必须手动在 Cloudflare 后台先建立一个同名项目（只需做一次）。

1.  登录 Cloudflare，点击左侧 **Workers & Pages** -> **Create application**。
2.  **⚠️ 务必切换到【Pages】标签页**（默认是 Workers，不要建错了）。
3.  选择 **Drag and drop your files** (或者是 Upload assets)。
4.  **Project name**: 输入项目名（例如 `unnalin-blog`）。
    *   **重要**：必须与下一步 YAML 配置文件中的 `projectName` **完全一致**。
5.  **上传占位文件**（Cloudflare 要求首次必须上传文件夹）：
    *   在电脑新建一个文件夹（如 `temp`），里面放一个空的 `index.html`。
    *   将整个 `temp` **文件夹**拖入上传区域。
    *   点击 **Deploy**。
6.  看到 **Success** 即表示项目“占位”成功。

## 6. 配置 GitHub Actions 脚本

在博客根目录创建文件：`.github/workflows/deploy.yml`

```yaml
name: Deploy Hexo to Cloudflare Pages

on:
  push:
    branches:
      - main  # 检查你的分支是 main 还是 master

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write

    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: true # 如果有子模块主题，建议开启此项

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20' # 推荐使用 LTS 版本

      - name: Install Dependencies
        run: npm install

      - name: Build Hexo
        run: npx hexo generate

      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: unnalin-blog  # 【注意】必须和 Cloudflare 上创建的项目名一致
          directory: public
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
```

## 7. 部署与验证

1.  提交并推送代码：
    ```bash
    git add .
    git commit -m "配置自动部署"
    git push
    ```
2.  去 GitHub 仓库的 **Actions** 页面查看运行状态。
3.  如果之前因为“项目不存在”报错，此时点击 **Re-run jobs**。
4.  全绿（Success）后，访问 `https://项目名.pages.dev` 即可看到博客。

## 8. 绑定自定义域名

1.  进入 Cloudflare Pages -> 你的项目 -> **Custom domains**。
2.  点击 **Set up a custom domain**。
3.  输入你在 Cloudflare 管理的域名（如 `blog.example.com` 或 `example.com`），这个步骤要**有一段时间**。
4.  Cloudflare 会自动添加 DNS 记录，点击 Activate 即可。

---

## 日常写作流程

环境搭建好后，以后写博客只需要三步：

1.  **本地写作**：`hexo new "文章标题"`，编辑 Markdown 文件。
2.  **本地预览**（可选）：`hexo s`，浏览器访问 `localhost:4000` 查看效果。
3.  **推送代码**：
    ```bash
    git add .
    git commit -m "更新文章"
    git push
    ```

**GitHub Actions 会自动接管后续的构建和发布工作。**
**Done！**