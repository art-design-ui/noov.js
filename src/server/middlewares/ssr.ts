import proConfig from '../../../config/pro-config'
import getAssets, { IAssets } from '../utils/assets'
import getStore from '../../client/store/reducers'
import ejs from 'ejs'
import fs from 'fs'
import path from 'path'
import genHtml from './genHtml'
import Koa from 'koa'

const ejsPath = path.join(__dirname, '../../templates/server.ejs')
const store = getStore()
export default async (ctx: Koa.Context, next: Koa.Next): Promise<null> => {
  const { path } = ctx.request

  if (path.indexOf('.') > -1) {
    ctx.body = null
    return next()
  }
  const cssObj = new Set() // CSS for all rendered React components
  const insertCss = (...styles: any[]) =>
    styles.forEach((style: any) => cssObj.add(style._getContent()))
  const { html, fetchResult } = await genHtml(path, insertCss, store)
  const { page } = fetchResult || {}
  let tdk = {
    title: 'noov.js',
    keywords: '默认关键词',
    description: '默认描述'
  }
  if (page && page.tdk) {
    tdk = page.tdk
  }
  const styles: string[] = []
  Array.from(cssObj).forEach((item: any) => {
    const [mid, content] = item[0]
    styles.push(`<style id="s${mid}-0">${content}</style>`)
  })
  // 静态资源
  let assetsMap
  const assets = getAssets()
  if ((assets as Promise<IAssets>).then) {
    ;(assets as Promise<IAssets>).then((res: IAssets) => {
      assetsMap = res
    })
  } else {
    assetsMap = assets
  }
  const template = fs.readFileSync(ejsPath, { encoding: 'utf-8' })
  const result = ejs.render(template, {
    tdk,
    fetchResult,
    store,
    styles,
    html,
    assetsMap,
    proConfig,
    showInitData: Object.keys(fetchResult || {}).length > 0,
    showState: Object.keys(store.getState() || {}).length > 0
  })
  ctx.body = result
  await next()
  return null
}
