/*
 * @Author: Cphayim
 * @Date: 2019-09-16 10:15:49
 * @LastEditTime: 2020-07-13 10:54:22
 * @Description: 计数器视图组件
 */

import React from 'react'

interface Props {
  readonly label: string
  readonly count: number
  readonly onIncrement: () => void
}

export const FCCounter: React.FC<Props> = (props) => {
  const { label, count, onIncrement } = props
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
