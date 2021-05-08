import { defineConfig } from 'dumi'

export default defineConfig({
  title: 'noov',
  outputPath: 'docs/dist',
  mode: 'site',
  publicPath: 'https://art-design-ui.github.io/noov.js/',
  base: '/',
  locales: [
    ['zh', '中文'],
    ['en', 'English']
  ],
  theme: {
    '@c-primary': '#007bff'
  },
  resolve: {
    includes: ['docs'],
    previewLangs: []
  },
  // 如果开启 注意修复外部client的mock文件名
  mock: false,
  navs: {
    en: [
      null,
      {
        title: 'GitHub',
        path: 'https://github.com/art-design-ui/noov.js'
      }
    ],
    zh: [
      null,
      {
        title: 'GitHub',
        path: 'https://github.com/art-design-ui/noov.js'
      }
    ]
  },
  logo: true,
  exportStatic: {}
})
