# react ssr 开发体验初步升级

服务运行

```
npm i
npm run dev
```

## 升级内容

- 前端代码的实时构建
- 服务端所需代码的实时编译
- http 服务的自动重启

## 缺陷

页面的显示内容需要刷新一次才能看到。 后续继续优化，增加热更新。

## 待做

- 修复构建的 strat.js bug
- server koa===>改造成 ts
- build server 改造成 server
- 支持 redux
- server 端引入 ejs 进行渲染返回 ===> 参考 nuxt
- css
- 按需加载
- 引用 umi 文档构建
- 单元测试
- 8080 所有路由 获取 index 文件然后返回

做成一个完整的项目
