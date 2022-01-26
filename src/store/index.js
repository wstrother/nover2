import { createStore } from 'vuex'

export default createStore({
  state: {
    numberSelected: 0,
    selectionConfirmed: false
  },
  mutations: {
    setNumber(state, value) {
      if (!state.selectionConfirmed) {
        state.numberSelected = value;
      }
    },
    setSelectionConfirmed(state, value) {
      state.selectionConfirmed = value;
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
