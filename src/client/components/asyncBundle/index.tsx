
import React from 'react';
import LoadingCompoent from '../loading'


/**
 * 动态加载组件一个组的容器
 *
 * @class Bundle
 * @extends {Component}
 */
export default class AsyncBundle extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      mod: null
    };
  }

  componentDidMount() {
    if (!this.state.mod) {
      this.load(this.props);
    }
  }

  // UNSAFE_componentWillReceiveProps(nextProps) {

  //     //路由改变才会按需
  //     if (nextProps.match && this.props.match && (nextProps.match.url !== this.props.match.url)) {
  //         this.load(nextProps);
  //     }
  // }


  load(props: any) {
    this.setState({
      mod: null
    });
    //注意这里，使用Promise对象; mod.default导出默认
    props.load().then((mod: any) => {
      this.setState({
        mod: mod.default ? mod.default : mod
      });
    });
  }

  render() {
    // @ts-ignore
    return this.state.mod ? this.props.children(this.state.mod) : <LoadingCompoent />;
  }
}
