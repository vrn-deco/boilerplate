import React from 'react'
import Types from 'MyTypes'
import { connect } from 'react-redux'
import { push, Push } from 'connected-react-router'

import { CounterStore } from './counter.store'
import { Count, CounterWrap, Row, CircularButton, TextFiled } from './index.styled'

interface StateProps {
  (state: Types.RootState): {
    count: number
  }
}
interface DispatchProps {
  readonly onIncrement: () => void
  readonly onDecrement: () => void
  readonly onSet: (num: number) => void
  readonly push: Push
}

const mapStateToProps: StateProps = (state) => ({
  count: state.counter.count,
})
const mapDispatchToProps: DispatchProps = {
  onIncrement: CounterStore.action.increment,
  onDecrement: CounterStore.action.decrement,
  onSet: CounterStore.action.set,
  push: push,
}

interface OwnProps {}
type Props = ReturnType<StateProps> & DispatchProps & OwnProps

class CounterRecordPage extends React.Component<Props> {
  state = {
    a: 'abc',
    value: 0,
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)
    if (isNaN(value)) return
    this.setState((state) => ({
      value,
    }))
  }

  render() {
    const { count, onIncrement, onDecrement, onSet } = this.props
    return (
      <CounterWrap>
        <Count>Record</Count>
      </CounterWrap>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CounterRecordPage)
