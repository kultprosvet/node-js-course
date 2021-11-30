import { createStore } from 'vuex'

export const store = createStore({
  state() {
    return {
      token: '',
    }
  },
  mutations: {
    setToken(state: any, payload) {
      state.token = payload
    },
  },
})
