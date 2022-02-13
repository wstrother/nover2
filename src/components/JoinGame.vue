<template>
    <div id="join-game" class="ui-panel-col">
        <span class="hdr-2">Host: {{ playerName }}</span>

        <router-link :to="{name:'start', params: {gameID}}" class="btn">Join</router-link>
    </div>
</template>

<script>
import { getPlayer } from '../api';

export default {
    name: "JoinGame",
    data() {
        return {
            playerName: "..."
        }
    },
    props: {
        gameID: Number,
        playerID: Number
    },
    mounted() {
        getPlayer(this.playerID)
            .then(player => {
                this.playerName = player.name
                console.log('Player loaded:', player);
            });
    }
}
</script>

<style lang="scss" scoped>
#join-game {
    span {
        margin-bottom: 10px;
    }
}
</style>