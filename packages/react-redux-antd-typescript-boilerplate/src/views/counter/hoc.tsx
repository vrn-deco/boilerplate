import React from 'react'
import { Subtract } from 'utility-types'

interface InjectedProps {
  count: number
  onIncrement: () => void
}

export const withState = <BaseProps extends InjectedProps>(
  _BaseComponent: React.ComponentType<BaseProps>,
) => {
  const BaseComponent = _BaseComponent as React.ComponentType<InjectedProps>

  type HOCProps = Subtract<BaseProps, InjectedProps> & {
    initialCount?: number
  }
  type HOCState = {
    readonly count: number
  }
  return class HOC extends React.Component<HOCProps, HOCState> {
    // Enhance component name for debugging and React-Dev-Tools
    static displayName = `withState(${BaseComponent.name})`
    // reference to original wrapped component
    static readonly WrappedComponent = BaseComponent

    readonly state: HOCState = {
      count: Number(this.props.initialCount) || 0,
    }

    handleIncrement = () => {
      this.setState({ count: this.state.count + 1 })
    }

    render() {
      const { ...restProps } = this.props
      const { count } = this.state
      return (
        <BaseComponent
          count={count}
          onIncrement={this.handleIncrement}
          {...restProps}
        />
      )
    }
  }
}
// export const withState
