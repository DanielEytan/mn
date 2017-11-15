<template>
   <div id="save-toggle" class="save-element">
      <div class="save-heart" v-bind:class="{active: toggled}">♥</div>
      <!-- <p  v-if="toggled">TOGGLED!</p> -->
   </div>


</template>

<script>
import { EventBus } from '../event-bus.js';

module.exports = {
   name: 'saveProgram',
   props: ['programevent'],
   data: function () {
      return {
         toggled: false
      }
   },
   mounted () {
      this.init();
   },
   methods: {
      init: function () {
         var id = this.programevent.id;
         var idListString = localStorage.getItem("programId");
         var idListArray = (idListString === '' || idListString === null) ? [] : JSON.parse(idListString);
         if( idListArray.indexOf(id) >= 0 ) {
            this.toggled = true;
         }
      },
      save: function (id) {
         var idListString = localStorage.getItem("programId");
         var idListArray = (idListString === '' || idListString === null) ? [] : JSON.parse(idListString);
         // var idListArray = JSON.parse(localStorage.getItem("programId"));

         if( idListArray.indexOf(id) >= 0 ) {
            // id is already in array -> remove and toggle off
            idListArray.splice(idListArray.indexOf(id),1);
            this.toggled = false;
         } else {
            // id is not in array -> add and toggle on
            idListArray.push(id);
            this.toggled = true;
         }
         localStorage.setItem("programId", JSON.stringify(idListArray));
         EventBus.$emit('program-saved');
         this.$emit('clicked');
      },
      removeFromList: function (id) {
         var idListString = localStorage.getItem("programId");
         var idListArray = (idListString === '' || idListString === null) ? [] : JSON.parse(idListString);
         idListArray.splice(idListArray.indexOf(id),1);
         this.toggled = false;
         localStorage.setItem("programId", JSON.stringify(idListArray));
         EventBus.$emit('program-saved');
         this.$emit('clicked');
      }
   }
}

</script>

<style lang="css" scoped>
</style>