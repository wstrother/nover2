<template>
  <div class="home">
    <div class="selected">
      <span :class="{raised: !noSelection}" >{{ numberSelected }}</span>
    </div>
    
    <NumberPicker />

    <div class="btn hdr-1">
      I'm sure
    </div>
  
  </div>
</template>

<script>
import NumberPicker from '../components/NumberPicker.vue';

export default {
  name: 'Home',
  components: {
    NumberPicker
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

.selected {
  @include header;
  @include center-box;
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