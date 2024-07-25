# GlobalChatPro 语境回应助手

该项目正在开发中

体验地址：[http://global.jiabao.online/](http://global.jiabao.online/)
![首屏](doc/image.png)
![使用界面](doc/image2.png)

## 简介

使用场景：做外贸，以更合适的句子与客人交流；与外国友人交流，以更流畅的句子表达自己的想法；

## 技术栈

- Next.js
- Tailwind CSS
- NextUI
- Moonshot AI（后期可加入工作流）

## 前提准备

- 打开根目录下`.env.example`，进入[moonshot 官网](https://platform.moonshot.cn/console/api-keys)，创建 API Key，替换`MOONSHOT_API_KEY`字段.
- Node 版本不低于 18

## 运行

```bash
npm run install
```

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 部署

```bash
npm run build
```
