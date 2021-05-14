---
nav:
  title: TDK
toc: menu
---

# TDK 说明


> 你可能想要想要在每个页面都配置不同的TDK，这里可以在config目录进行配置，key值对应`路由`


```js
export default {
  '/': {
    title: 'home',
    keywords: 'noov.js',
    description: '一套react-ssr解决方案'
  }
}

```

> 另外也可以通过接口获取TDK