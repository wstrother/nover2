<template>
    <div class="login">
        <span class="hdr-1">{{ prompt }}</span>

        <input 
            type="text" 
            v-model="text" 
            name="text"
            :placeholder="placeholder"
        />

        <input 
            type="button" 
            name="submit" 
            value="submit" 
            class="btn hdr-1" 
            @click="submit"
        />
    </div>
</template>

<script>
export default {
    name: 'UserForm',
    data() {
        return {
            text: ''
        }
    },
    props: {
        prompt: String,
        placeholder: String
    },
    methods: {
        submit() {
            this.$emit('submit', {text: this.text});
        }
    }
}
</script>

<style lang="scss" scoped>
.login {
    @include form;
}
</style>