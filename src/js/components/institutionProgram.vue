<template>
  <div>
      <ul class="program__list program__list--selection">
         <li class="program__list__event" v-for="entry in programevents" v-if="entry.parent.number == parent">
                
               <h1>{{ entry.title }}</h1>
               <div v-for="time in entry.time">
                  <time v-if="time.type === 'setTimes'"> {{ time.start.date | formatDate }} <span v-if="time.duration == true">(Dauer: {{ time.duration }})</span><br></time>
                  <time v-if="time.type === 'continuous'"> {{ time.start.date | formatDate }} – {{ time.end.date | formatDate }} (Durchgehend)<br></time>
                  <time v-if="time.type === 'iterating'">  {{ time.start.date | formatDate }} – {{ time.end.date | formatDate }} ({{ time.frequency }}, Dauer: {{ time.duration }})<br></time>
               </div>
               <div v-html="entry.description">{{ entry.description }}</div>
               <saveprogram :programevent="entry"></saveprogram>
         </li>
      </ul>
      </div>
</template>

<script>
import saveProgram from './SaveProgram.vue'

module.exports = {
   name: 'institutionprogram',
    props: ['parent'],
    components: {
      saveprogram: saveProgram
    },
    data: function () {
      return {
         programevents: [],
      }
   },
   mounted () {
      this.getEntries();
   },
   methods: {
      getEntries: function () {
         let _this = this;
         axios.get('../programevent.json')
         .then(response => {
           this.programevents = response.data.data;
        })
      },
   },
}

</script>

<style lang="css" scoped>
</style>