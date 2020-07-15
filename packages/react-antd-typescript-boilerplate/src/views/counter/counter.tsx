import React from 'react'
import Types from 'MyTypes'
import { connect } from 'react-redux'

import { CounterStore } from './counter.store'

interface StateProps {
  (state: Types.RootState): {
    count: number
  }
}
interface DispatchProps {
  readonly onIncrement: () => void
  readonly onDecrement: () => void
  readonly onSet: (num: number) => void
}

const mapStateToProps: StateProps = (state) => ({
  count: state.counter.count,
})
const mapDispatchToProps: DispatchProps = {
  onIncrement: CounterStore.action.increment,
  onDecrement: CounterStore.action.decrement,
  onSet: CounterStore.action.set,
}

interface OwnProps {
  label: string
}
type Props = ReturnType<StateProps> & DispatchProps & OwnProps

class Counter extends React.Component<Props> {
  render() {
    const { label, count, onIncrement } = this.props
    return (
      <div>
        <span>
          {label}: {count}
        </span>
        <button type='button' onClick={onIncrement}>
          {`Increment`}
        </button>
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Counter)
