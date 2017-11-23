<template>
  <div>
                   <li class="program__list__event" v-for="entry in programevents" v-if="entry.id == id">
              <div >

                   <section class="institution">
                     <div v-for="color in entry.parent.shuttleLine" v-if="entry.parent.shuttleLine.length < 2">
                          <span class="suttle-line" v-bind:style="{color: color.color}">{{ color.title }}</span>
                      </div>
                      <div v-if="entry.parent.shuttleLine.length > 1">
                          <span v-for="color in entry.parent.shuttleLine" v-bind:style="{color: color.color}" class="suttle-line">{{ color.title }} </span> 
                      </div>
                      <h1><a :href="entry.parent.url">{{ entry.parent.title }}</a></h1>

                     
                    </section>
                    <myprogramevent ref="myprogramevent" :programevent="entry"></myprogramevent>
                </div>
            </li>
      </div>
</template>

<script>
import saveProgram from './SaveProgram.vue'
import MyProgramEvent from './MyProgramEvent.vue'

module.exports = {
   name: 'jorunalprogram',
    props: ['id'],
    components: {
      myprogramevent: MyProgramEvent,
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