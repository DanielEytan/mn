<template>
  <div class="program--entry">
    <article>
      <ul class="program-list" >
         <div v-for="item in items">
            <li v-for="entry in programevents" v-if="entry.id == item">
               <h2>{{ entry.title }}</h2>
               <div>
               Im {{ entry.parent.title }}<br>
               </div><br>
               <saveprogram :programevent="entry"></saveprogram>
            </li>
         </div>
      </ul>
    </article>
  </div>
</template>

<script>
import ProgramEvent from './ProgramEvent.vue'
import SaveProgram from './SaveProgram.vue'


module.exports = {
  name: 'myprogram',
  props: [],
  components: {
    programevent: ProgramEvent,
    saveprogram: SaveProgram
  },
  data: function () {
    return {
      programevents: [],
      items: [],
    }
  },
  mounted () {
    this.getEntries();
    this.getItems();
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
    }
  }
}

</script>

<style lang="css" scoped>
span {
  color:red;
}
</style>