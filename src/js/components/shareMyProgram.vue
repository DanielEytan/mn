<template>
 <div class="share-program">
   
  <h1>Teile deine Auswahl</h1>
  <div  >
   <div class="link">
    <p>Du kannst deine Auswahl mit deinem Namen personalisieren und als Link verschinken.</p>
    <p class="mb">Trage dafür deinen <input @change="getItems" v-model="name" placeholder="Namen"> ein.</p>
    <div class="flex-container">
    <div class="button" v-on:click="getItems"><button  v-clipboard:copy="url" v-clipboard:success="onCopy" v-clipboard:error="onError">{{ buttonText }}</button></div>
    <p><a :href="url" class="directlink">Link öffnen</a></p>
    </div>
    <p v-show="saved">Der Link zu deiner gespeicherten Auswahl kannst du jetzt über [Strg] + [v] respektive [Command] + [v] am gewünschten Ort einfügen.</p><br>
 </div>
 <div class="mail">Du kannst deine Auswahl auch <a :href="mail">per Mail</a> verschicken.</div>

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
     message: 'Copy These Text',
     buttonText: 'Link zur Auswahl in der Zischenablage speichern',
     saved: false,
  }
},
ready:function(){
    foo();
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
         this.mail = 'mailto:'+'?subject=Mein Programm für die Museumsnacht Basel&body=Das ist mein Programm für die Museumsnacht Basel am 21. Juni 2018: %0D%0A' + titles + '%0D%0A Link zur Auswahl: ' + url;
      }
   },
   onCopy: function (e) {
      this.buttonText = "✔︎ Dein Link ist gespeichert.";
      this.saved = !this.saved;
   },
   onError: function (e) {
      this.buttonText = "Deine Auswahl konnte leider nicht in der Zischenablage gespeichert werden";
   }

}
}

</script>

<style lang="css" scoped>
</style>