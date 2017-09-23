<template>
  <!-- <div class="saved-links" v-for="item in items">{{ item.message }}</div> -->
  <div class="saved-link"><a :href="url">Saved Elements</a></div>
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
        // items: '',
        url: './programm/mein-programm'
    }
  },

   computed: {
      items: function () {
         // this.items = "message:" + localStorage.getItem('programId');
         // this.items = localStorage.getItem('programId');
         // this.items = "36";

         // var ids = ids.length;

         // console.log(ids);
         // this.items = ids;
         // return
      }
  }

}

</script>

<style lang="css" scoped>
</style>