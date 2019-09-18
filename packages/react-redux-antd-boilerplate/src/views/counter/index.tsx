/*
 * @Author: Cphayim
 * @Date: 2019-09-10 17:18:39
 * @LastEditTime: 2019-09-18 11:15:50
 * @Description: 计数器容器组件
 */

import Types from 'MyTypes'
import { connect } from 'react-redux'

import { counterActions } from '@/store/counter'
import { FCCounter } from './fc-counter'

interface StateProps {
  (state: Types.RootState): {
    count: number
  }
}

interface DispatchProps {
  readonly onIncrement: () => void
}

const mapStateToProps: StateProps = state => ({
  count: state.counter.count,
})

const mapDispatchToProps: DispatchProps = {
  onIncrement: counterActions.increment,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FCCounter)
