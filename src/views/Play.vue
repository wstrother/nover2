<template>
    <div class="play">
        You played: {{ numberSelected }}

        <p>
            They played {{ numberp2 }}
        </p>

    </div>
</template>

<script>
export default {
    name: 'Play',
    computed: {
        numberSelected() {
            return this.$store.state.numberSelected;
        },
        numberp2() {
            return this.$store.state.p2number;
        }
    },
    created() {
        if (this.numberSelected === 0) {
            this.$router.push({path: '/'});
        }

        this.$store.dispatch('getP2');
    }
}
</script>

<style lang="scss" scoped>

</style>