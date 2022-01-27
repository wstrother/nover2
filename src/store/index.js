import { createStore } from 'vuex'
import { animation } from '../animation';

export default createStore({
  state: {
    numberSelected: 0,
    selectionConfirmed: false,
    loading: false,
    loadTimer: 150,
    p2selected: false,
    p2number: 0
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
    setNumberP2(state, value) {
      state.p2number = value;
    },
    setSelectionP2(state, value) {
      state.p2selected = value;
    },
    setLoading(state, value) {
      state.loading = value;
    }
  },
  actions: {
    startLoading({state, commit}) {
      commit('setLoading', true);
      animation.animateElementStyle(
        'loading', 
        'opacity', 
        (r) => {return r * 0.5},
        state.loadTimer
      );
    },

    endLoading({state, commit}) {
      animation.animateElementStyle(
        'loading',
        'opacity',
        (r) => {
          return 0.5 - (r * 0.5)
        },
        state.loadTimer,
        () => {commit('setLoading', false)}
      );
    },

    getP2({commit}) {
      fetch(
        "http://localhost:3000/posts",
        {
          mode: 'cors',
          headers: {
            'Access-Control-Allow-Origin':'*'
          }
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          // commit('setNumberP2', data);
        });
        commit('setNumberP2', 1);
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
