<template>
    <div id="game-picker">
        <span class="hdr-2">Pick a game</span>

        <div 
            class="btn hdr-2"
            @click="newGame"
        >
            New Game
        </div>

        <JoinGame
            v-for="game in games" 
            :key="game.id"
            :gameID="game.id"
            :playerID="game.playerIDs[0]"
        />
    </div>
</template>

<script>
import { getGames } from '../api';
import JoinGame from './JoinGame';

export default {
    name: 'GamePicker',
    components: { JoinGame },
    data() {
        return {
            games: []
        }
    },
    computed: {
        player() {
            return this.$store.state.player;
        }
    },
    created() {
        let player = this.player;
        getGames({player}).then(games => {
            this.games = games;
            console.log(games);
        });
    },
    methods: {
        newGame() {
            this.$store.dispatch('newGame');
        }
    }
}
</script>

<style lang="scss" scoped>
#game-picker {
    @include flex-center(column);

    * {
        margin-bottom: 10px;
    }

}
</style>