<template>
  <div id="app">
    <Header :searchChanged="searchChanged" />
    <router-view />
  </div>
</template>
<script>
import Header from '@/components/Header.vue';

export default {
  components: {
    Header
  },
  methods: {
    searchChanged: function(val){
      console.log(val);
    }
  }
}
</script>
<style lang="scss">
</style>
