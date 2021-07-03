import { defineStore } from 'pinia'

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    status: true
  }),
  getters: {
    getStatus() {
      return this.status;
    }

  }
  ,
  actions: {
    changeStatus() {
      setTimeout(() => {
        this.status = !this.status
      }, 500)

    }
  },
})
