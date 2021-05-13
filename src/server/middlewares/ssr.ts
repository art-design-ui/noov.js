import proConfig from '../../../config/pro-config'
import getAssets, { IAssets } from '../utils/assets'
import getStore from '../../client/store/reducers'
import ejs from 'ejs'
import fs from 'fs'
import path from 'path'
import genHtml from './genHtml'
import Koa from 'koa'
import tdkConfig from '../../config/tdk'

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
  const curTDK = tdkConfig[path as keyof typeof tdkConfig]
  let tdk = {
    title: '',
    keywords: '',
    description: ''
  }
  if (curTDK) {
    tdk = curTDK
  }

  // 添加TDK
  if (Object.keys(page || {}).length) {
    tdk = page
  }
  const styles: string[] = []
  Array.from(cssObj).forEach((item: any) => {
    const [mid, content] = item[0]
    styles.push(`<style id="s${mid}-0">${content}</style>`)
  })

  const assets = getAssets()
  async function getAssetsMap() {
    // 静态资源
    let assetsMap = {
      js: [],
      css: []
    }
    if (typeof (assets as Promise<IAssets>).then === 'function') {
      const res = await (assets as Promise<IAssets>)
      assetsMap = res as typeof assetsMap
      return assetsMap
    }
    assetsMap = assets as typeof assetsMap
    return assetsMap
  }
  const assetsMap = await getAssetsMap()
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
  // await next()
  return null
}
