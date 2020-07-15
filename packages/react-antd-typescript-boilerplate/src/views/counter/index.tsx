/*
 * @Author: Cphayim
 * @Date: 2020-07-15 11:06:21
 * @LastEditTime: 2020-07-16 00:16:15
 * @Description: 计数器页面
 */
import React from 'react'
import { connect } from 'react-redux'

import { CounterStore } from './counter.store'
import {
  Count,
  CounterWrap,
  Row,
  CircularButton,
  TextFiled,
} from './index.styled'
import { RootState } from '@/store/types'
import { RouteComponentProps } from 'react-router-dom'

interface StateProps {
  (state: RootState): {
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

type Props = ReturnType<StateProps> & DispatchProps & RouteComponentProps

class CounterIndexPage extends React.Component<Props> {
  state = {
    value: 0,
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)
    if (isNaN(value)) return
    this.setState((state) => ({
      value,
    }))
  }

  navigateToRecord = () => {
    this.props.history.push('/counter/record')
  }

  render() {
    const { count, onIncrement, onDecrement, onSet } = this.props
    return (
      <CounterWrap>
        <Count>{count}</Count>
        <Row>
          <CircularButton onClick={onIncrement} color='#4CAF50'>
            +1
          </CircularButton>
          <CircularButton onClick={onDecrement} color='#F44336'>
            -1
          </CircularButton>
        </Row>
        <Row>
          <TextFiled
            value={this.state.value}
            onChange={this.handleInputChange}
          ></TextFiled>
          <CircularButton onClick={() => onSet(this.state.value)}>
            SET
          </CircularButton>
        </Row>
        <Row>
          <span onClick={this.navigateToRecord}>Record</span>
        </Row>
      </CounterWrap>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CounterIndexPage)
