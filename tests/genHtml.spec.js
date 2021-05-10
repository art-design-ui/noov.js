import genHtml from '../src/server/middlewares/genHtml'
import getStore from '../src/client/store/reducers'

describe('test genHtml Function', () => {
  // TODO
  // 使用babel插件删除CSS依赖
  // 因为routelist是webpack构建时候动态生成 所以得处理这种情况
  it('should return the correct result when call genHtml', async () => {
    global.require.context = function () {}
    const store = getStore()
    const cssObj = new Set() // CSS for all rendered React components
    const insertCss = () => {}
    const { html } = await genHtml('/404', insertCss, store)
    console.log(html)
    expect(html).toMatch(
      `<div className="layout-box">
        <h1>koa+react+ssr</h1>
        <div>
          <p>404页面page22</p>
          <p>12</p>
        </div>
      </div>`
    )
    // expect(html).toMatchSnapshot()
  })
})
