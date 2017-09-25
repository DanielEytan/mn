<template>
  <div class="program--entry">
    <article>
      <ul class="program-list" >
         <div v-for="item in items">
            <li v-for="entry in programevent" v-if="entry.id == item">
               <h2>{{ entry.title }}</h2>
               <div>
               Im {{ entry.parent.title }}<br>
               </div><br>
            </li>
         </div>
      </ul>
    </article>
  </div>
</template>

<script>
import ProgramEvent from './ProgramEvent.vue'


module.exports = {
  name: 'myprogram',
  props: ['entry'],
  components: {
    programevent: ProgramEvent
  },
  data: function () {
    return {
      programevent: [],
      items: []
    }
  },
  mounted () {
    this.getEntries();
    this.getItems();

  },
  computed: {
    getItems () {
     var allIds = localStorage.getItem('programId');
     var allIds = JSON.parse("[" + allIds + "]");
     console.log(allIds);
     this.items = allIds;
     // return
   }
 },
 methods: {
  getEntries () {
    let _this = this;
    axios.get('http://mn.dev/programevent.json')
    .then(response => {
      this.programevent = response.data.data;
    })
  }
}
}

</script>

<style lang="css" scoped>
span {
  color:red;
}
</style>