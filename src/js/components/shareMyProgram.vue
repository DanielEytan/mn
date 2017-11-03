<template>
 <div class="share-program">
   
  <h1>Teile deine Auswahl</h1>
  <div  >
   <div class="link">
    <p>Du kannst deine Auswahl mit deinem Namen personalisieren und als Link verschicken.</p>
    <p class="mb">Trage dafür deinen Namen ein.</p>
    <input @change="getItems" v-model="name" placeholder="Namen"><br><br>
    <div class="flex-container">
    <div class="button" v-on:click="getItems"><button  v-clipboard:copy="url" v-clipboard:success="onCopy" v-clipboard:error="onError">{{ buttonText }}</button></div>
    <!-- <p><a :href="url" class="directlink">Link öffnen</a></p> -->
    </div>
    <p v-show="saved">Der Link zu deiner Auswahl kannst du jetzt über <nobr>[Strg] + [v]</nobr> respektive <nobr>[Command] + [v]</nobr> am gewünschten Ort einfügen.</p><br>
 </div>
 <div class="share"><p>Du kannst deine Auswahl auch als per Mail verschicken oder auf deinen Social Media Channels teilen.</p>

 <div v-on:click="getItems" class="button"><button><a :href="mail">Link per Mail versenden</a></button></div>
 <div v-on:click="getItems" class="button"><button><a :href="facebook + url">Link auf Facebook teilen</a></button></div>

 <div v-on:click="getItems" class="button"><button><a :href="twitter">Link auf Twitter teilen</a></button></div>
 <div v-on:click="getItems" class="button"><button><a :href="google + url">Link auf Google+ teilen</a></button></div>
 </div>



</div>
</div>
</template>

<script>


module.exports = {
 name: 'shareprogram',
 props: ['programevent'],

 data: function () {
   return {
     mail: '',
     url: '',
     savedItems: [],
     name: '',
     message: 'Copy These Text',
     buttonText: 'Link kopieren',
     saved: false,
     facebook: '',
     // twitter: 'https://twitter.com/home?status=Mein Programm für die Museumsnacht Basel am 21. Januar 2018: ',
     twitter: '',
     google: '',

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
      var savedListAsStringForSM = idListFromLocalStorage.join('%2B');


      var name = this.name;
      var url = "http://mnacht.centaurus.uberspace.de/programm/vorschlag?ids=" + savedListAsString + "&name=" + name;
      var urlSm = "http://mnacht.centaurus.uberspace.de/programm/vorschlag?ids=" + savedListAsStringForSM + "&name=" + name;

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
         this.twitter = 'https://twitter.com/home?status=Mein Programm für die Museumsnacht Basel am 21. Januar 2018: ' + urlSm;
         this.facebook = 'https://www.facebook.com/sharer/sharer.php?u=' + urlSm;
         this.google = 'https://plus.google.com/share?url=' + urlSm;



      }
      if (get) {

      }
   },
   onCopy: function (e) {
      this.buttonText = "✔︎ Dein Link ist gespeichert.";
      this.saved = !this.saved;
   },
   onError: function (e) {
      this.buttonText = "Deine Auswahl konnte leider nicht in der Zwischenablage gespeichert werden";
   }

}
}

</script>

<style lang="css" scoped>
</style>