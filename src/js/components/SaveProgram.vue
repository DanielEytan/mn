<template>
  <div id="save-toggle" class="save-element" v-on:click="save(programevent.id)">{{ programevent.id }}</div>

</template>

<script>

module.exports = {
   name: 'saveProgram',
   props: ['programevent'],
   data: function () {
      return {
      }
   },
   methods: {
      save: function (save) {
         var id = save;

         var idList = localStorage.getItem("programId", '');
         // if (idList.includes(id) == false) {
         // }
         var newIdList = idList + "," + id;
         localStorage.setItem("programId", newIdList);
         var newIdList = localStorage.getItem("programId", '');
         var newIdList = newIdList.split(',');
         newIdList = newIdList.filter(function( element ) {
            return element !== null;
         });
         this.$emit('program-saved');
         console.log(newIdList);
      }



   }
}

</script>

<style lang="css" scoped>
</style>