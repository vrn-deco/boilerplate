import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    depth: number
    keepAlive?: boolean
  }
}
