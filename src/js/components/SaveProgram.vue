<template>
  <!-- <div class="save-element" v-on:click="save('1'); toggle"  v-bind:class="active: isActive"></div> -->


</template>

<script>

module.exports = {
   name: 'saveProgram',
   
      data: function () {
         return {
            show: true,
            isActive: false
      }      

   },
   methods: {
      save: function (save) {
         // alert(save)
         localStorage.setItem('programId:', save)
         // if (localStorage.getItem('event:', 'text')) {
         //    // alert('saved');
         //    localStorage.removeItem('event:', 'text')
         // }
      },
      toggle: function() {
            this.isActive = !this.isActive;
        }
   }
}

</script>

<style lang="css" scoped>
</style>