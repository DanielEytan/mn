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
         // var existingEntries = JSON.parse(localStorage.getItem("programId"));
         // if(existingEntries == null) existingEntries = [];
         //    if (existingEntries.includes(save) == false) {
         //    localStorage.setItem("programId", JSON.stringify(save));
         //    // Save allEntries back to local storage
         //    existingEntries.push(save);
         //    localStorage.setItem("programId", JSON.stringify(existingEntries));
         //    };
         
         // var idList = localStorage.getItem("programId", '');
         // // if (idList.includes(save)) {};
         // console.log(idList)
        

         var id = save;

         var idList = localStorage.getItem("programId", '');
         // if (idList.includes(id) == false) {
         var newIdList = idList + "," + id;
         // var newIdList = newIdList.substring(4).split(',');


         localStorage.setItem("programId", newIdList);
         // }


         var newIdList = localStorage.getItem("programId", '');
         var newIdList = newIdList.split(',');
         newIdList = newIdList.filter(function( element ) {
            return element !== null;
         });

         // var newIdList = newIdList.shift();


         console.log(newIdList);




         // idList.push(id);

         // localStorage.setItem("programId", '').push(save);
         // this.idList.push(save);

      }


      // toggle: function() {
      //       this.isActive = !this.isActive;
      //   }
   }
}

</script>

<style lang="css" scoped>
</style>