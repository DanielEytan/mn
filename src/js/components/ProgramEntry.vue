<template>
    <div class="program--entry">
      <article v-show="programEntryIsVisible">
        <h1><a :href="entry.url">{{ entry.number }} – {{ entry.title }}</a></h1>

        <p>{{ entry.address }}<br><span v-for="color in entry.shuttleLine"> {{ color.title }} </span> – {{ entry.journey }}</p><br>

        <p>Essen: {{ entry.food }}</p><br>

        <h2>{{ entry.programmTitle }}</h2>
        <div v-html="entry.programmText"></div>
        <br>

        <h3>Programm</h3><br>
        <ul class="program-list" >
          <!-- <programevent @increment="incrementTotal"  @show="show" v-for="programevent in entry.events" :key="programevent.id" :programevent="programevent" :institution="entry.title" :checked-institutions="checkedInstitutions" :checked-themes="checkedThemes" :checked-events="checkedEvents" :checked-languages="checkedLanguages"></programevent> -->
          <programevent v-for="programevent in entry.events" :key="programevent.id" :programevent="programevent" :institution="entry.title" :checked-institutions="checkedInstitutions" :checked-themes="checkedThemes" :checked-events="checkedEvents" :checked-languages="checkedLanguages"></programevent>
        </ul>


      </article>
    </div>
</template>

<script>
import ProgramEvent from './ProgramEvent.vue'


module.exports = {
  name: 'programentry',
  props: ['entry','checkedInstitutions','checkedThemes','checkedEvents','checkedLanguages'],
  components: {
    programevent: ProgramEvent
  },
  data: function () {
    return {
      programEntryIsVisible: true
      // programEntryIsVisible: this.entry.events.length,
      // counter: 0,
      // children: this.entry.events.length,
      // shouted:0
    }
  },
  methods: {
    // incrementTotal: function () {
    //   this.counter++
    //   this.hasChildrenCheck();
    // },
    // show: function () {
    //   this.programEntryIsVisible = true;
    //   this.counter = 0;
    // },
    // hasChildrenCheck: function () {
    //   if( (this.counter % this.entry.events.length) === 0) {
    //     this.counter = 0;
    //     this.programEntryIsVisible = false
    //   }
    // }
  },
  computed: {
    showProgramEvents: function () {
      for (event of this.entry.events) {
        //logical condition for every event...
      }

      // var programEventIsVisible = false

      // var inCheckedInstitutions =  this.checkedInstitutions.includes(this.entry.title) || (this.checkedInstitutions.length == 0)

      // var inCheckedThemes = this.checkIntersectionForFilters(this.checkedThemes, this.programevent.themes);

      // var inCheckedKindOfEvents = this.checkIntersectionForFilters(this.checkedEvents, this.programevent.kindOfEvent);

      // var inCheckedLanguages = this.checkIntersectionForFilters(this.checkedLanguages, this.programevent.languages);

      // programEventIsVisible = inCheckedInstitutions && inCheckedThemes && inCheckedKindOfEvents && inCheckedLanguages;

      // return programEventIsVisible;
    }
  }
}

</script>

<style lang="css" scoped>
</style>