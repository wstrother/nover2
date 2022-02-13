<template>
    <div class="user-nav">
        <p v-if="!player">You're not logged in </p>
        <p v-if="player">Youre logged in as</p> 
        <span v-if="player">{{player.name}}</span>
    </div>
</template>

<script>
export default {
    name: 'UserNav',
    computed: {
        player() {
            return this.$store.state.player;
        }
    },
    created() {
        console.log('store.state.player', this.player);
    }
}
</script>

<style lang="scss" scoped>
.user-nav {
    @extend .ui-panel-col;
    p {margin:0}
    span {
        @extend .hdr-2;
        margin: 0;
    }
    width: 200px;
}

</style>