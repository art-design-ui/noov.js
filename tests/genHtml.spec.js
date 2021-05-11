import genHtml from '../src/server/middlewares/genHtml'
import getStore from '../src/client/store/reducers'

describe('test genHtml Function', () => {
  it('should return the correct result when call genHtml', async () => {
    const store = getStore()
    const insertCss = () => {}
    const { html } = await genHtml('/404', insertCss, store)
    expect(html).toMatch(`<div class="layout-box"><h1>koa+react+ssr</h1><div><p>404页面page22</p><p>12</p></div></div>`)
    expect(html).toMatchSnapshot() // 保存快照
  })
})
