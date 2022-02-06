<template>
    <div class="play">
        You played: {{ number }}

        <p>
            They played {{ oppNumber }}
        </p>

    </div>
</template>

<script>
export default {
    name: 'Play',
    computed: {
        number() {
            return this.$store.state.number;
        },
        oppNumber() {
            return this.$store.state.oppNumber;
        }
    },
    created() {
        if (this.number === 0) {
            this.$router.push({path: '/'});
        }

        this.$store.dispatch('getOpp');
    }
}
</script>

<style lang="scss" scoped>

</style>