<template>
 <div class="centered">
    <div class="mn-date" v-if="items.length == 0">21.01.2018 <span>– Noch {{ days }} Nächte bis zur Museumsnacht</span></div>
    <div class="saved-link" v-if="items.length > 0"><a :href="url">♥ {{ items.length }} <span>– MEIN PROGRAMM</span></a></div>
 </div>

 <!-- <div class="saved-link"><a :href="url">Saved Elements: <span>{{ items }}</span></a></div> -->

</template>

<script>
  import { EventBus } from '../event-bus.js';
  module.exports = {
    name: 'savedlink',
    props: ['days'],
    data: function () {
      return {
        url: '/programm/mein-programm',
        items: [],
      }
    },
  mounted () {
    this.savedLinks();
    this.initEventBus();
  },
  methods: {

    initEventBus: function () {
        // Listen for the i-got-clicked event and its payload.
        var _this = this;
        EventBus.$on('program-saved', function () {
           _this.savedLinks();
        });
     },
    savedLinks: function () {
      var idList = JSON.parse(localStorage.getItem('programId'));
      this.items = idList !== null ? idList : [];
    }
  }
  }

</script>

<style lang="css" scoped>
</style>