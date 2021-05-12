import genHtml from '../src/server/middlewares/genHtml'
import getStore from '../src/client/store/reducers'

describe('test genHtml Function', () => {
  it('should return the correct result when call genHtml', async () => {
    const store = getStore()
    const insertCss = () => {
      console.log('insertCss')
    }
    const { html } = await genHtml('/404', insertCss, store)
    // 环境中没有路由 所以拿到的是layout布局
    expect(html).toMatch(`<div class="layout-box"></div>`)
    expect(html).toMatchSnapshot() // 保存快照
  })
})
