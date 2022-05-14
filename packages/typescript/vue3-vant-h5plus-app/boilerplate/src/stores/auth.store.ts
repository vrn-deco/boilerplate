export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: useLocalStorage<string | null>('token', null),
  }),
  getters: {
    isLogin(): boolean {
      return !!this.token
    },
  },
  actions: {
    setToken(token: string) {
      this.token = token
    },
    clearToken() {
      this.token = null
    },
  },
})
