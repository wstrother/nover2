<template>
    <div class="game-nav">
        {{ game }}

        <div v-if="!oppConnected">Waiting for opponent...</div>
        <div v-if="oppConnected & !oppSelected">
            Waiting for opponent to select a number...
        </div>
    </div>
</template>

<script>
export default {
    name: 'GameNav',
    props: {
        game: Object,
        playerIndex: Number
    },
    computed: {
        oppIndex() {
            return this.playerIndex ? 0 : 1;
        },
        oppConnected() {
            return this.game.playerIDs[this.oppIndex] != 0;
        },
        oppSelected() {
            return this.game.numbers[this.oppIndex] != 0;
        }
    }
}
</script>

<style lang="scss" scoped>

</style>