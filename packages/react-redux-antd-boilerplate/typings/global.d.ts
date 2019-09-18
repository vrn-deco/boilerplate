import { compose, StoreEnhancer } from 'redux'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof StoreEnhancer
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

declare interface NodeModule {
  hot?: { accept: (path: string, callback: () => void) => void }
}

declare interface System {
  import<T = any>(module: string): Promise<T>
}
declare var System: System
