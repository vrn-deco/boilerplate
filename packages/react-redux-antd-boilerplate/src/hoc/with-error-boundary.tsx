/*
 * @Author: Cphayim
 * @Date: 2019-09-16 14:08:43
 * @LastEditTime: 2019-09-16 14:54:13
 * @Description: 错误边界（高阶组件）
 */

import React from 'react'
import { Subtract } from 'utility-types'

const MISSING_ERROR = 'Error was swallowed during propagation.'

interface InjectedProps {
  onReset: () => void
}

export const withErrorBoundary = <BaseProps extends InjectedProps>(
  _BaseComponent: React.ComponentType<BaseProps>,
) => {
  const BaseComponent = _BaseComponent as React.ComponentType<InjectedProps>
  type HOCProps = Subtract<BaseProps, InjectedProps>
  type HOCState = {
    readonly error: Error | null | undefined
  }

  return class HOC extends React.Component<HOCProps, HOCState> {
    static displayName = `withErrorBoundary(${BaseComponent.name})`
    static wrappedComponent = BaseComponent

    readonly state: HOCState = {
      error: undefined,
    }

    componentDidCatch(err: Error | null, info: object) {
      const error = err || new Error(MISSING_ERROR)
      this.setState({ error })
      this.logErrorToCloud(error, info)
    }

    logErrorToCloud(error: Error, info: object) {
      // TODO: 这里将错误上报到服务端
    }

    handleReset = () => {
      this.setState({ error: undefined })
    }

    render() {
      const { children, ...restProps } = this.props
      const { error } = this.state
      if (error) {
        // 渲染出错时展示的组件
        return <BaseComponent onReset={this.handleReset} {...restProps} />
      }
      // 渲染正确时的组件
      return children
    }
  }
}
