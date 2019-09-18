import { compose } from 'redux'

// redux-dev-tools
export const composeEnhancers =
  (
    process.env.NODE_ENV === 'development' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ) ||
  compose
