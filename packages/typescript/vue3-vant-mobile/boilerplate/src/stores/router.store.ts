import infoRoutes from '@/views/info/info.routes'
import mallRoutes from '@/views/mall/mall.routes'
import userRoutes from '@/views/user/user.routes'

export type TabBarOption = {
  title: string
  icon: string
  routerPath: string
  routerName?: string
}

export const useRouterStore = defineStore('router', {
  state: () => ({
    // record the current keep-alive component name
    keepAlived: [] as string[],
    tabBarOptions: [
      {
        title: '商城',
        icon: 'shop-o',
        routerPath: mallRoutes[0].path,
        routerName: mallRoutes[0].name,
      },
      {
        title: '资讯',
        icon: 'new-o',
        routerPath: infoRoutes[0].path,
        routerName: infoRoutes[0].name,
      },
      {
        title: '我的',
        icon: 'user-o',
        routerPath: userRoutes[0].path,
        routerName: userRoutes[0].name,
      },
    ] as TabBarOption[],
  }),
  actions: {
    addKeepAlive(componentName: string) {
      if (!this.keepAlived.includes(componentName)) {
        this.keepAlived.push(componentName)
      }
    },
    rmKeepAlive(componentName: string) {
      const index = this.keepAlived.indexOf(componentName)
      if (index !== -1) {
        this.keepAlived.splice(index, 1)
      }
    },
  },
})
