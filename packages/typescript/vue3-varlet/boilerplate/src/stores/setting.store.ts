enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export const useSettingStore = defineStore('setting', {
  state: () => ({
    theme: Theme.Light,
  }),
  actions: {
    toggleTheme() {
      this.theme = this.theme === Theme.Light ? Theme.Dark : Theme.Light
    },
  },
})
