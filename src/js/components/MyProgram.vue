<template>
  <div class="program--entry">

    <article>
      <ul class="program__list program__list--selection">
        
        <!-- <div v-for="item in items"> -->
          <!-- {{ item }} -->
          <li class="program__list__event" v-for="entry in programevents">
            <div>
             <section class="institution">
               <div v-for="color in entry.parent.shuttleLine" v-if="entry.parent.shuttleLine.length < 2" class="shuttle-line">
                <div class="number"><i v-bind:style="{background: color.color}">{{ entry.parent.number }}</i></div> 
                <div class="lines"><span v-bind:style="{color: color.color}">  {{ color.title }}</span></div>
              </div>
              <div v-if="entry.parent.shuttleLine.length > 1" class="shuttle-line several">
                <div class="number"><i style="background: black">{{ entry.parent.number }}</i></div>
                <div class="lines">
                  <span v-for="color in entry.parent.shuttleLine" v-bind:style="{color: color.color}"><nobr>{{ color.title }}</nobr></span>
                </div>
              </div>
              <h1><a :href="entry.parent.url">{{ entry.parent.title }}</a></h1>
            </section>
            <myprogramevent ref="myprogramevent" :programevent="entry"></myprogramevent>
          </div>
        </li>
      </ul>
      

    </article><br><br>
    <div class="control-program">
      <div class="main-controls">
        <printbutton></printbutton>
        <button class="reset-my-program" v-on:click="resetMyProgram">
          Mein Programm zurücksetzen
        </button>
      </div>

      <shareprogram :programevent="programevents"></shareprogram>   
    </div>
  </div>
</template>

<script>
import ProgramEvent from './ProgramEvent.vue'
import SaveProgram from './SaveProgram.vue'
import shareProgram from './ShareMyProgram.vue'
import MyProgramEvent from './MyProgramEvent.vue'
import printButton from './printButton.vue'



module.exports = {
  name: 'myprogram',
  props: [],
  components: {
    myprogramevent: MyProgramEvent,
    programevent: ProgramEvent,
    saveprogram: SaveProgram,
    shareprogram: shareProgram,
    printbutton: printButton
  },
  data: function () {
    return {
      programevents: [],
      items: [],
      itemSaved: false,
      url: '/programm/programm',
      hover: false
    }
  },
  mounted () {
   this.getItems();
   this.getEntries();
   // this.sendItems();
 },

 methods: {
  getEntries: function () {
   let _this = this;
   axios.get('../programevent.json')
   .then(response => {
    var programevents = _.filter(response.data.data, function (o) {
      return (_this.items.indexOf(o.id) !== -1);
    });

    programevents = _.sortBy(programevents,function (o) {
      let date = o.time[0].start.date;
      return o.time[0].start.date;
    });

    _this.programevents = programevents;
  });
 },
 getItems: function () {
  var idListFromLocalStorage = [];
  idListFromLocalStorage = JSON.parse(localStorage.getItem('programId'));
  this.items = idListFromLocalStorage;
},
getParameterByName: function (name, url) {
 if (!url) url = window.location.href;
 name = name.replace(/[\[\]]/g, "\\$&");
 var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
 results = regex.exec(url);
 if (!results) return null;
 if (!results[2]) return '';
 return decodeURIComponent(results[2].replace(/\+/g, " "));
},
toggled: function() {
  this.itemSaved = !this.itemSaved;
},
resetMyProgram: function() {
  var _this = this;
  var myprogramevent_child_components = this.$refs.myprogramevent;
  myprogramevent_child_components.forEach(function(o) {
    o.removeFromList();
  });
}
}
}

</script>

<style lang="css" scoped>
</style>