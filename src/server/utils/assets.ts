// import map from '@dist/server/asset-mainfest.json'
// 生产环境中 静态资源的处理

interface IAssets {
  js: string[]
  css: string[]
}
export default function getAssets(): any {
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
    assets.js.push(`<script type="text/javascript"  src="${devHost}/main.js"></script>`) // 写死的
    // 这样就说明有缓存 可能没出来效果
    // assets.js.push(`<script type="text/javascript"  src="${devHost}/styles.js"></script>`);
    // assets.css.push(`<link rel="stylesheet" type="text/css" href="${devHost}/styles.css" />`);
  } else {
    // 生产环境 从 asset-manifest.json 读取资源
    // jsFiles.forEach(item => {
    //   // if (map[item]) {
    //   //   assets.js.push(`<script type="text/javascript"  src="${map[item]}"></script>`)
    //   // }
    // })
    // cssFiles.forEach(item => {
    //   // if (map[item]) {
    //   //   assets.css.push(`<link rel="stylesheet" type="text/css" href="${map[item]}" />`)
    //   // }
    // })
  }

  return assets
}
