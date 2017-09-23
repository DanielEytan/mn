<template>
  <div class="program--entry">
    <article>
      <ul class="program-list" >
        <!-- <programevent v-for="programevent in entry.events" :key="programevent.id" :programevent="programevent"></programevent> -->

        <li v-for="entry in program" >
          {{ entry.title }}
          <ul class="programevent">
            <div v-for="item in items">

              <li v-for="programevent in entry.events" :key="programevent.id" :programevent="programevent" v-if="programevent.id == item">
                <span>{{ programevent.id }}</span> {{ programevent.title }}
                
              </li>
            </div>

          </ul>
        </li>
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
      program: [],
      items: []
    }
  },
  mounted () {
    this.getEntries();
  },
  computed: {
    getItems: function () {
     var allIds = localStorage.getItem('programId');
     var allIds = JSON.parse("[" + allIds + "]");
     console.log(allIds);
     this.items = allIds;
     return
   }
 },
 methods: {
  getEntries () {
    let _this = this;
    axios.get('http://mn.dev/program.json')
    .then(response => {
      this.program = response.data.data;
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