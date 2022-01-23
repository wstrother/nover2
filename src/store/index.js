import { createStore } from 'vuex'

export default createStore({
  state: {
    numberSelected: 0
  },
  mutations: {
    setNumber(state, value) {
      state.numberSelected = value;
    }
  },
  actions: {
  },
  getters: {
    noSelection(state) {
      return state.numberSelected === 0;
    }
  },
  modules: {
  }
})
