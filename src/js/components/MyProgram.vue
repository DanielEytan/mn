<template>
  <div class="program--entry">
    <article>
      <ul class="program__list program__list--selection" >
        <div v-for="item in items">
          <!-- {{ item }} -->
            <li class="program__list__event" v-for="entry in programevents" v-if="entry.id == item">
               <section class="institution">
                  <div v-for="color in entry.parent.shuttleLine" v-if="entry.parent.shuttleLine.length < 2">
                      <span class="suttle-line" v-bind:style="{color: color.color}"> <strong>{{ entry.parent.number }}</strong> {{ color.title }}</span>
                  </div>
                  <div v-if="entry.parent.shuttleLine.length > 1">
                      <span class="suttle-line"><strong>{{ entry.parent.number}}</strong></span>
                      <span v-for="color in entry.shuttleLine" v-bind:style="{color: color.color}" class="suttle-line">{{ color.title }} </span> 
                  </div>
                  <h1><a :href="entry.url">{{ entry.parent.title }}</a></h1>
                </section>
                <myprogramevent :programevent="entry"></myprogramevent>
            </li>
         </div>
      </ul>

   </article><br><br>
   <shareprogram :programevent="programevents"></shareprogram>   
</div>
</template>

<script>
import ProgramEvent from './ProgramEvent.vue'
import SaveProgram from './SaveProgram.vue'
import shareProgram from './ShareMyProgram.vue'
import MyProgramEvent from './MyProgramEvent.vue'



module.exports = {
  name: 'myprogram',
  props: [],
  components: {
    myprogramevent: MyProgramEvent,
    programevent: ProgramEvent,
    saveprogram: SaveProgram,
    shareprogram: shareProgram
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
   this.getEntries();
   this.getItems();
   // this.sendItems();
  },

  methods: {
    getEntries: function () {
       let _this = this;
       axios.get('../programevent.json')
       .then(response => {
         this.programevents = response.data.data;
      })
    },
    getItems: function () {
       var idListFromLocalStorage = JSON.parse(localStorage.getItem('programId'));
       var idListFromUrl = this.getParameterByName('ids') !== null ? this.getParameterByName('ids').split(" ") : null;
       var idList = idListFromUrl !== null ? idListFromUrl : idListFromLocalStorage ? idListFromLocalStorage : [];
       window.history.pushState("add ids", "ids", "?ids="+idList.join('+'));
       this.items = idList;
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
      console.log(this);
    }
  }
}

</script>

<style lang="css" scoped>

</style>