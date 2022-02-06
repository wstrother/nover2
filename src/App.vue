<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <span v-if="player" to="/logout" @click="logout">Log Out</span>
  </div>

  <router-view/>

  <UserNav :player="player" />
  <GameNav :game="game" :playerIndex="0" v-if="game"/>

  <div 
    id="loading"
    v-show="$store.state.loading"
  ></div>

</template>

<script>
import UserNav from './components/UserNav';
import GameNav from './components/GameNav';

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
    let stored = localStorage.getItem('player');
    if (!stored) {
      // this.$store.dispatch('createPlayerID');
    } else {
      this.$store.dispatch('login', JSON.parse(stored));
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