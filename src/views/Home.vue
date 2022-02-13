<template>
  <div class="home">
    <div id="login-panel" v-if="!player">
      <UserForm 
        @submit="signup"
        prompt="Sign Up"
        placeholder="Enter a username"
      />

      <UserForm 
        @submit="login"
        prompt="Log In"
        placeholder="Enter a username"
      />
    </div>

    <GamePicker v-if="player && !game" />

    <div v-if="player && game" id="resume-game-panel">
      <router-link :to="{name:'start', params: {gameID}}">Resume/Play game</router-link>
    </div>
  </div>
</template>

<script>
import UserForm from '../components/UserForm.vue';
import GamePicker from '../components/GamePicker.vue';

export default {
  name: 'Home',
  components: {
    UserForm,
    GamePicker
  },
  computed: {
    player() {
      return this.$store.state.player;
    },
    game() {
      return this.$store.state.game;
    },
    gameID() {
      return this.$store.state.gameID;
    }
  },
  methods: {
    signup({text}) {
      this.$store.dispatch('signup', {name: text});
    },
    login({text}) {
      this.$store.dispatch('login', {name: text});
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  @include flex-center;
}

#login-panel {
  @include ui-panel;
  @include flex-center(row);
  padding: 10px;
  width: 50%;

}

</style>