import React from 'react'
import { render, screen } from '@testing-library/react'
import container from '../../src/client/components/container'

describe('test AsyncBundle component', () => {
  it('should return the correct result when call asyncLoader', () => {
    window.__INITIAL_DATA__ = { name: 'vnues', age: 18 }
    // 前端模拟webpack替换_SERVER__
    window.__SERVER__ = null
    function SourceComponent(props) {
      const { initialData } = props
      const { name, age } = initialData
      return (
        <div className="source-component">
          <p>{name}</p>
          <p>{age}</p>
        </div>
      )
    }
    const ContainerComponent = container(SourceComponent)
    const wrapper = render(<ContainerComponent />)
    const element = wrapper.container.querySelector('.source-component')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('DIV')
    expect(element.className).toEqual('source-component')
    const nameElement = screen.getByText('vnues')
    expect(nameElement.tagName).toBe('P')
  })
  it('should return the correct default when client render call asyncData', async () => {
    // 前端模拟webpack替换_SERVER__
    window.__SERVER__ = null
    function SourceComponent(props) {
      const { initialData } = props
      // console.log(initialData)
      const { name, age } = initialData
      return (
        <div className="source-component">
          <p>{name}</p>
          <p>{age}</p>
        </div>
      )
    }
    const user = { name: 'Tom', age: 24 }
    SourceComponent.asyncData = async function () {
      function getUser() {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(user)
          })
        })
      }
      const fetchResult = await getUser()
      const page = {
        tdk: {
          title: '首页',
          keywords: 'react ssr',
          description: 'noov.js'
        }
      }
      return {
        data: fetchResult,
        page
      }
    }
    const ContainerComponent = container(SourceComponent)
    const history = {
      action: 'PUSH'
    }
    render(<ContainerComponent history={history} />)
    const { data } = await ContainerComponent.asyncData()
    expect(data).toEqual(user)
    expect(await screen.findByText('Tom')).toBeInTheDocument()
    expect(await screen.findByText('24')).toBeInTheDocument()
    // 放在这里执行 有了await回调的效果
    expect(document.title).toBe('首页')
  })

  it('should return the correct default when server render call asyncData', async () => {
    // 前端模拟webpack替换_SERVER__
    window.__SERVER__ = {}
    function SourceComponent(props) {
      const { initialData } = props
      // console.log(initialData)
      const { name, age } = initialData
      return (
        <div className="source-component">
          <p>{name}</p>
          <p>{age}</p>
        </div>
      )
    }
    const ContainerComponent = container(SourceComponent)
    const staticContext = {
      initialData: {
        name: 'Bob',
        age: 66
      }
    }
    // 暂时置为false
    // 因为虽然执行了组件生命周期，但是没有走到逻辑
    // 等同于走hydrate渲染了
    const options = { hydrate: false }
    render(<ContainerComponent staticContext={staticContext} />, options)
    expect(await screen.findByText('Bob')).toBeInTheDocument()
    expect(await screen.findByText('66')).toBeInTheDocument()
  })
})
