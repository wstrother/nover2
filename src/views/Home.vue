<template>
  <div class="home">

    <div class="selection">
      <span :class="{raised: !noSelection}">
        {{ numberSelected }}
      </span>
    </div>
    
    <NumberPicker />

    <div 
      :class="{
        'btn': true,
        'hdr-1': true,
        'disabled': noSelection
      }" 
      @click="confirmSelection"
      >
      Let's play
    </div>
  </div>

  <Modal 
    prompt="Are you sure?" 
    :options="['Cancel', 'Confirm']"
    :hidden="modalHidden"
    @cancel="cancelSelection"
    @confirm="beginGame"
  />
</template>

<script>
import NumberPicker from '../components/NumberPicker.vue';
import Modal from '../components/Modal.vue';

export default {
  name: 'Home',
  components: {
    NumberPicker,
    Modal
  },
  data() {
    return {
      modalHidden: true
    }
  },
  methods: {
    confirmSelection() {
      if (!this.noSelection) {
        this.modalHidden = false;
        this.$store.commit('setSelectionConfirmed', true);
      }
    },
    cancelSelection() {
      this.$store.commit('setSelectionConfirmed', false);
      this.modalHidden = true;
    },
    beginGame() {
      
    }
  },
  computed: {
    noSelection() {
      return this.$store.getters.noSelection;
    },
    numberSelected() {
      let num = this.$store.state.numberSelected;
      return num ? num : '...';
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.selection {
  @include header;
  @include flex-center;
  align-items: flex-end;
  margin-bottom: 10px;
  width: 500px;
  height: 100px;
  
  span {
    @include animated-placeholder('Select a number', $time: 350ms);
    width: 100%;
    position: relative;
  }
}
</style>