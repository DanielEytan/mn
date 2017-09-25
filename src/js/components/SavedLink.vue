<template>
  <div class="saved-link" v-if="items"><a :href="url">Saved Elements: <span>{{ items }}</span></a></div>
  <!-- <div class="saved-link"><a :href="url">Saved Elements: <span>{{ items }}</span></a></div> -->

</template>

<script>

module.exports = {
   name: 'savedLink',
  //  data: function() {
  //     return {
  //        items: [
  //           { message: 'Foo' },
  //           { message: 'Bar' }
  //        ]
  //     } 
  // }
   data: function () {
      return {
        url: './programm/mein-programm',
        items: ''
    }
  },
  mounted () {
    this.savedLink();
  },
   computed: {

    savedLink: function () {

     var allIds = localStorage.getItem('programId');

     var allIds = JSON.parse("[" + allIds + "]");
     // var allIds = allIds.splice(deleteIndex, 1);
     allIds.shift();
     console.log(allIds);

     var allIds = allIds.length;
     this.items = allIds;
     // return
   }
 }
  //  created () {
  //   var items = localStorage.getItem('programId');
  //   var number = items.string.split(',');
  //   console.log(number);
  //   this.item = number;
  // }

}

</script>

<style lang="css" scoped>
</style>