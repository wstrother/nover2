<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <span v-if="player" to="/logout" @click="logout">Log Out</span>
  </div>

  <router-view/>

  <div id="left-nav">
    <UserNav />
    <GameNav />
  </div>

  <div 
    id="loading"
    v-show="$store.state.loading"
  ></div>

</template>

<script>
import UserNav from './components/UserNav';
import GameNav from './components/GameNav';
import {getPlayer, getGame} from './api';

export default {
  name: 'App',
  computed: {
    player() {
      return this.$store.state.player;
    },
    game() {
      return this.$store.state.game;
    }
  },
  components: {
    UserNav,
    GameNav
  },
  beforeCreate() {
    let playerID = JSON.parse(localStorage.getItem('playerID'));
    let gameID = JSON.parse(localStorage.getItem('gameID'));
    let opponentID = JSON.parse(localStorage.getItem('opponentID'));

    if (playerID) {
      getPlayer(playerID)
        .then(player => {
          this.$store.dispatch('login', player);
        });
    }

    if (gameID) {
      getGame(gameID)
        .then(game => {
          this.$store.dispatch('joinGame', game);
          
        });
    }

    if (opponentID) {
      getPlayer(opponentID)
        .then(player => {
          this.$store.commit('setOpponent', player);
        });
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav {
  * { 
    @extend %nav-link;
  }

  *:not(:nth-last-child(1)) {
    margin-right: 15px;
  }
}

#left-nav {
  position: fixed;
  top:0;
  left:0;
}

a {
  color: inherit;
  text-decoration: none;
}

#loading {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  background-color: black;
  width: 100%;
  height: 100%;
}
</style>