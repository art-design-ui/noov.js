export interface IAssets {
  js: string[]
  css: string[]
}
export default function getAssets(): IAssets | Promise<IAssets> {
  // let devHost = '//localhost:9001';
  const devHost = `//localhost:${8080}`

  const jsFiles = ['libs.js', 'main.js', 'styles.js']
  const cssFiles = ['styles.css']

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
    return import('@dist/server/asset-mainfest.json').then((res: any) => {
      // 生产环境 从 asset-manifest.json 读取资源
      const map = res.default
      jsFiles.forEach(item => {
        if (map[item]) {
          assets.js.push(`<script type="text/javascript"  src="${map[item]}"></script>`)
        }
      })
      cssFiles.forEach(item => {
        if (map[item]) {
          assets.css.push(`<link rel="stylesheet" type="text/css" href="${map[item]}" />`)
        }
      })
      return assets
    })
  }
  return assets
}
