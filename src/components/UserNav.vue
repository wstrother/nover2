<template>
    <div class="user-nav">
        <p v-if="!player">You're not logged in </p>
        <p v-if="player">Youre logged in as {{player.name}}</p>
    </div>
</template>

<script>
export default {
    name: 'UserNav',
    props: {
        player: Object
    }
}
</script>

<style lang="sss" scoped>

</style>