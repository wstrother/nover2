<template>
    <div class="game-nav">
        <div v-if="game" >
            <div v-if="opponent" class="opp-name">
                <p>Playing against:</p>
                <span>{{ opponent.name }}</span>
            </div>

            <p class="opp-message">
                {{ oppMessage }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GameNav',
    computed: {
        game() {
            return this.$store.state.game;
        },
        playerIndex() {
            return this.$store.state.playerIndex;
        },
        opponent() {
            return this.$store.state.opponent;
        },
        oppMessage() {
            let message = "";
            if (!this.oppConnected) {
                message = "Waiting for opponent..."
            }
            if (this.oppConnected & !this.oppSelected) {
                message = "Waiting for opponent to select a number..."
            }
            if (this.oppConnected & this.oppSelected) {
                message = "Opponent has selected their number"
            }

            return message;
        },
        oppIndex() {
            return this.playerIndex ? 0 : 1;
        },
        oppConnected() {
            if (this.game) {
                return this.game.playerIDs[this.oppIndex] != 0;
            } else {
                return false;
            }
        },
        oppSelected() {
            if (this.game) {
                return this.game.numbers[this.oppIndex] != 0;
            } else {
                return false;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.game-nav {
    // @extend .ui-panel-col;
    @include flex-center(column);
    p {
        margin:0
    }
    span {
        @extend .hdr-2;
        margin: 0;
    }
    .opp-message {
        margin-top: 20px;
    }
    width: 200px;
}

</style>