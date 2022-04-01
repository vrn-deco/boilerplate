import store from 'store2'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: store.get('token') as string | null,
  }),
  getters: {
    isLogin(): boolean {
      return !!this.token
    },
  },
  actions: {
    setToken(token: string) {
      store.set('token', token)
      this.token = token
    },
    clearToken() {
      store.remove('token')
      this.token = null
    },
  },
})
