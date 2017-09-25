<template>
  <div class="saved-link"><a :href="url">Saved Elements: <span>{{ items.length }}</span></a></div>
  <!-- <div class="saved-link"><a :href="url">Saved Elements: <span>{{ items }}</span></a></div> -->

</template>

<script>
import { EventBus } from '../event-bus.js';

module.exports = {
  name: 'savedlink',
    data: function () {
      return {
        url: '/programm/mein-programm',
        items: []
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