import { createStore } from 'vuex'
import { animation } from '../animation';
import { signup, login, newGame, joinGame, getGame, getPlayer } from '../api';


export default createStore({
  state: {
    loading: false,
    loadTimer: 150,

    number: 0,
    selectionConfirmed: false,
    oppSelected: false,
    oppNumber: 0,

    playerIndex: 0,
    player: null,
    game: null,
    opponent: null,

    playerID: 0,
    gameID: 0,
    opponentID: 0
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
    setOpponent(state, value) {
      let opponentID = value ? value.id : null;
      state.opponent = value;
      state.opponentID = opponentID;
      localStorage.setItem('opponentID', JSON.parse(opponentID));
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
      let playerID = value ? value.id : null;
      state.player = value;
      state.playerID = playerID;
      localStorage.setItem('playerID', JSON.parse(playerID));
    },
    setGame(state, value) {
      let gameID = value ? value.id : null;
      state.game = value;
      state.gameID = gameID;
      localStorage.setItem('gameID', JSON.parse(gameID));

      if (value & value.playerIDs[1] == state.playerID) {
        state.playerIndex = 1
      }
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

    signup({commit}, {name}) {
      signup({name, currentGame: 0})
        .then(data => commit('setPlayer', data));
    },

    login({commit, dispatch}, data) {
      login(data)
        .then(player => {
          commit('setPlayer', player);
          if (player.currentGame) {
            getGame(player.currentGame)
              .then(game => dispatch('joinGame', game));
          }
        });
    },

    logout({commit}) {
      commit('setPlayer', null);
      commit('setGame', null);
    },

    newGame({dispatch, state}) {
      newGame({player: state.player})
        .then(game => dispatch('joinGame', game));
    },

    joinGame({commit, getters, state}, game) {
      joinGame({player: state.player, game})
        .then(game => {
          commit('setGame', game);
          let oppID = game.playerIDs[getters.oppIndex];
    
          if (oppID) {
            getPlayer(oppID)
              .then(player => {
                commit('setOpponent', player);
              });
          }
        });
    }
  },
  getters: {
    noSelection(state) {
      return state.number === 0;
    },

    oppIndex(state) {
      return state.playerIndex ? 0 : 1;
    }
  },
  modules: {
  }
})
