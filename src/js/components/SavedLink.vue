<template>
  <div class="saved-link" v-if="items"><a :href="url">Saved Elements: <span>{{ items }}</span></a></div>
  <!-- <div class="saved-link"><a :href="url">Saved Elements: <span>{{ items }}</span></a></div> -->

</template>

<script>

module.exports = {
  name: 'savedlink',
    data: function () {
      return {
        url: './programm/mein-programm',
        items: ''
    }
  },
  mounted () {
    this.savedLinks();
  },
  methods: {

    savedLinks: function () {

     var allIds = localStorage.getItem('programId');

     var allIds = JSON.parse("[" + allIds + "]");
     allIds.shift();
     console.log(allIds);

     var allIds = allIds.length;

     // this.$set(this.items, allIds)
     this.items = allIds;
     // return
   }
  },
  shout: function () {
     console.log("program is saved");
  }
}

</script>

<style lang="css" scoped>
</style>