import { createStore } from 'vuex'
import { getAnimation } from '../getAnimation';

export default createStore({
  state: {
    numberSelected: 0,
    selectionConfirmed: false,
    loading: false
  },
  mutations: {
    setNumber(state, value) {
      if (!state.selectionConfirmed) {
        state.numberSelected = value;
      }
    },
    setSelectionConfirmed(state, value) {
      state.selectionConfirmed = value;
    },
    setLoading(state, value) {
      state.loading = value;
    }
  },
  actions: {
    startLoading({commit}) {
      commit('setLoading', true);
      let loading = document.getElementById("loading");

      getAnimation(
        (elapsed, total) => {
          loading.style.opacity = (elapsed / total) * 0.5;
        }, 
        150
      );
    },

    endLoading({commit}) {
      let loading = document.getElementById("loading");

      getAnimation(
        (elapsed, total) => {
          loading.style.opacity = (1 - (elapsed / total)) * 0.5;
        },
        150, 
        () => {commit('setLoading', false);}
      );
    }
  },
  getters: {
    noSelection(state) {
      return state.numberSelected === 0;
    }
  },
  modules: {
  }
})
