import { createStore } from 'vuex'
import { animation } from '../animation';
import { signup, login } from '../api';


export default createStore({
  state: {
    loading: false,
    loadTimer: 150,

    number: 0,
    selectionConfirmed: false,
    oppSelected: false,
    oppNumber: 0,

    player: null,
    game: null
  },
  mutations: {
    setNumber(state, value) {
      if (!state.selectionConfirmed) {
        state.number = value;
      }
    },
    setSelectionConfirmed(state, value) {
      state.selectionConfirmed = value;
    },
    setOppNumber(state, value) {
      state.oppNumber = value;
    },
    setOppSelection(state, value) {
      state.oppSelected = value;
    },
    setLoading(state, value) {
      state.loading = value;
    },
    setPlayer(state, value) {
      state.player = value;
      localStorage.setItem('player', JSON.stringify(value));
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

    getOpp({commit}) {
      fetch("http://localhost:3000/games/1")
        .then(response => response.json())
        .then(data => {
          commit('setOppNumber', data.numbers[0]);
        });
    },

    signup({commit}, data) {
      signup(data)
        .then(data => commit('setPlayer', data));
    },

    login({commit}, data) {
      login(data)
        .then(data => commit('setPlayer', data));
    },

    logout({commit}) {
      commit('setPlayer', null);
    }
  },
  getters: {
    noSelection(state) {
      return state.number === 0;
    },

    playerID(state) {
      if (state.player) {
        return state.player.id;
      } else {
        return null;
      }
    }
  },
  modules: {
  }
})
