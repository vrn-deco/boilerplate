import infoRoutes from '@/views/info/info.routes'
import mallRoutes from '@/views/mall/mall.routes'
import userRoutes from '@/views/user/user.routes'

type KeepAliveName = string | symbol

export type TabBarOption = {
  title: string
  icon: string
  routerPath: string
  routerName?: string
}

export const useRouterStore = defineStore('router', {
  state: () => ({
    // record the current keep-alive component name
    keepAlived: [] as KeepAliveName[],
    tabBarOptions: [
      {
        title: '商城',
        icon: 'shopping',
        routerPath: mallRoutes[0].path,
        routerName: mallRoutes[0].name,
      },
      {
        title: '资讯',
        icon: 'message-text-outline',
        routerPath: infoRoutes[0].path,
        routerName: infoRoutes[0].name,
      },
      {
        title: '我的',
        icon: 'account-circle',
        routerPath: userRoutes[0].path,
        routerName: userRoutes[0].name,
      },
    ] as TabBarOption[],
  }),
  actions: {
    addKeepAlive(name: KeepAliveName) {
      if (!this.keepAlived.includes(name)) {
        this.keepAlived.push(name)
      }
    },
    rmKeepAlive(name: KeepAliveName) {
      const index = this.keepAlived.indexOf(name)
      if (index !== -1) {
        this.keepAlived.splice(index, 1)
      }
    },
  },
})
