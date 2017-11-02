<template>
   <div class="share-program" v-on:click="getItems">
      <div class="mail"><a :href="mail">Mein Programm per Mail verschicken.</a><</div>
      <div class="link">
        <p>Du kannst deine Auswahl als Link verschicken. Personalisiere deine Auswahl mit deinem Namen.</p>
        <input v-model="name" placeholder="edit me">
        <br><br>
        <a :href="url">Auswahl <span v-if="name">von {{ name }}</span></a>
      </div>
      
   </div>
</template>

<script>
module.exports = {
  name: 'shareprogram',
  props: ['programevent'],

  data: function () {
   return {
    mail: '/programm/mein-programm',
    url: '',
    savedItems: [],
    name: '',
 }
},
mounted () {
   this.getItems();
},
methods: {
   getItems: function (get) {
      var idListFromLocalStorage = JSON.parse(localStorage.getItem('programId'));
      this.savedItems = idListFromLocalStorage;
      var savedList = JSON.stringify(idListFromLocalStorage);
      var savedListAsString = idListFromLocalStorage.join('+');
      var name = this.name;
      var url = "http://mnacht.centaurus.uberspace.de/programm/vorschlag?ids=" + savedListAsString + "&name=" + name;
      this.url = url;
      var myProgram = this.programevent;
      var titles = []
      var IDs = []
      var length = myProgram.length;   
      for (var i = 0; i < length; i++) {
         var item = myProgram[i]
         var itemId = item.id;
         var hit = savedList.indexOf(itemId)
            if (hit > -1) {
               var result = item.title + " im " + item.parent.title + "%0D%0A";
               var resultIds = item.id;
               titles.push(result);
            }
      }
      if (get) {
         this.mail = 'mailto:'+'?subject=Mein Programm für die Museumsnacht Basel&body=Das ist mein Programm für die Museumsnacht Basel am 21. Juni 2018: %0D%0A' + titles;
      }
    },
 }
}

</script>

<style lang="css" scoped>
</style>