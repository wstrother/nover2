<template>
    <div id="modal" v-if="!hidden">

      <div>
        <span class="hdr-1">{{ prompt }}</span>

        <div id="modal-options">
            <div 
                class="btn hdr-2"
                v-for="option, index in options" 
                :key="index"
                @click="clickOption(option)"
            >
                {{option}}
            </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name: 'Modal',
    data() {
        return {

        }
    },
    props: {
        prompt: String,
        options: Array,
        hidden: Boolean
    },
    methods: {
        clickOption(name) {
            this.$emit(name.toLowerCase());
        }
    },
    watch: {
        hidden(newValue) {
            this.$store.dispatch(newValue ? 'endLoading' : 'startLoading');
        }
    }
}
</script>

<style lang="scss" scoped>
#modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;


  &>div {
    @include ui-panel;
    @include flex-center(column);
    padding: 10px;
    width: 400px;
    height: 200px;

    span {
      height: 40%;
    }

    &>div {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: space-between;
      width: 100%;
    }

    .btn {
      margin: 0px auto;
      width: 150px;
      height: 40px;
    }
  }
}
</style>