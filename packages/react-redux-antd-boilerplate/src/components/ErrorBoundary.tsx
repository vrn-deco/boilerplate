import React from 'react'
import { withErrorBoundary } from '@/hoc/with-error-boundary'

export const ErrorBoundary = withErrorBoundary(props => {
  const { onReset } = props
  return (
    <div>
      <p>哎呀，我出错了</p>
      <button onClick={onReset}>重新加载</button>
    </div>
  )
})
