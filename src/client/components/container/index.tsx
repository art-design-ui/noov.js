//高阶组件 用于提取重复逻辑
import React from 'react'

let _this = null

const popStateCallback = () => {
  // 使用popStateFn保存函数防止addEventListener重复注册
  if (_this && _this.getInitialProps) {
    console.log('popStateFn')
    _this.getInitialProps()
  }
}

export default SourceComponent => {
  return class HoComponent extends React.Component {
    constructor(props, context) {
      super(props)
      console.log('props', props)
      this.state = {
        initialData: {},
        canClientFetch: false //浏览器端是否需要请求数据
      }
    }

    //转接子组件的预取方法，服务端会调用这个方法来做数据预取
    static async getInitialProps(ctx) {
      return SourceComponent.getInitialProps
        ? await SourceComponent.getInitialProps(ctx)
        : {}
    }
    // ! csr/ssr切换路由时才调用组件的getInitialProps方法
    //用于封装处理数据的更新逻辑
    async getInitialProps() {
      // ssr首次进入页面以及csr/ssr切换路由时才调用组件的getInitialProps方法
      const props = this.props
      const store = window.__STORE__ //从全局得到 store

      // 兼容不使用 redux 的页面
      // 通过props.getInitialData判断
      // ! 那就说明约定getInitialData
      const res = SourceComponent.getInitialProps
        ? await SourceComponent.getInitialProps({ store })
        : {}
      //处理页面 title 显示
      let { tdk } = res.page || {}
      if (tdk) {
        document.title = tdk.title
      }
    }

    async componentDidMount() {
      _this = this // 修正_this指向，保证_this指向当前渲染的页面组件
      //注册事件，用于在页面回退的时候触发
      window.addEventListener('popstate', popStateCallback)

      const canClientFetch = this.props.history && this.props.history.action === 'PUSH' //路由跳转的时候可以异步请求数据
      if (canClientFetch) {
        //如果是 history PUSH 操作 则更新数据
        await this.getInitialProps()
      }
    }

    render() {
      const props = {
        initialData: {},
        ...this.props
      }

      if (__SERVER__) {
        //服务端渲染
        props.initialData = this.props.staticContext.initialData || {}
      } else {
        //客户端渲染
        if (this.state.canClientFetch) {
          //需要异步请求数据
          props.initialData = this.state.initialData || {}
        } else {
          props.initialData = window.__INITIAL_DATA__
          window.__INITIAL_DATA__ = null //使用过后清除数据,否则其他页面会使用
        }
      }

      return <SourceComponent {...props}></SourceComponent>
    }
  }
}
