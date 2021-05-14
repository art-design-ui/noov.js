export interface IAssets {
  js: string[]
  css: string[]
}
export default function getAssets(): IAssets | Promise<IAssets> {
  const devHost = `//localhost:${8080}`

  const assets: IAssets = {
    js: [],
    css: []
  }
  if (!__IS_PROD__) {
    // 开发环境
    assets.js.push(`<script type="text/javascript"  src="${devHost}/libs.js"></script>`)
    assets.js.push(`<script type="text/javascript"  src="${devHost}/main.js"></script>`)
  } else {
    // 生产环境中 静态资源的处理
    // webpack过程中就会处理打包
    return import('../../../dist/server/asset-manifest.json').then((res: any) => {
      // 生产环境 从 asset-manifest.json 读取资源
      const map = res.default
      Object.keys(map).forEach(item => {
        // 不做全量引入 做到路由按需加载
        if (/.+\.js$/.test(item) && (item.includes('main') || item.includes('lib'))) {
          assets.js.push(
            `<script  defer="defer" type="text/javascript"  src="${map[item]}"></script>`
          )
        }
      })
      return assets
    })
  }
  return assets
}
