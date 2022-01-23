<template>
    <div class="number-picker">
        <div 
            v-for="index in 10" 
            :key="index" 
            :class="{
                'btn-square': true,
                selected: $store.state.numberSelected === index
            }"
            @click="$store.commit('setNumber', index)"
            >
            {{ index }} 
        </div>
    </div>
</template>

<script>
export default {
    name: 'NumberPicker'
}
</script>

<style lang="scss" scoped>
.number-picker {
    display: flex;
    flex-direction: row;

    div {
        font-size: 25pt;
        margin: 15px;
        width: 75px;
        height: 75px;
    }
}
</style>