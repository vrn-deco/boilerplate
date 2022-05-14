declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production'
    // app
    readonly VUE_APP_NAME: string
    readonly VUE_APP_SECRET_CODE: string
    // server
    readonly VUE_APP_SERVER_BASE_URL: string
  }
}
