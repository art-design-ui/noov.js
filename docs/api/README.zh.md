---
nav:
  title: API
toc: menu
---

# API 说明


> noov.js的api

### asyncData

> 你可能想要在服务器端获取并渲染数据。noov.js 添加了asyncData方法使得你能够在渲染组件之前异步获取数据。

- 类型： Function

asyncData方法会在组件（限于页面组件）每次加载之前被调用。它可以在服务端或路由更新之前被调用。

```js
 Home.asyncData() {
    return { project: 'nuxt' }
  }
```

> 注意：由于asyncData方法是在组件 初始化 前被调用的，所以在方法内是没有办法通过 this 来引用组件的实例对象。

