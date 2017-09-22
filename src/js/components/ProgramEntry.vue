<template>
    <div class="program--entry">
      <article v-if="showProgramEvents">
        <h1><a :href="entry.url">{{ entry.number }} – {{ entry.title }}</a></h1>

        <p>{{ entry.address }}<br><span v-for="color in entry.shuttleLine"> {{ color.title }} </span> – {{ entry.journey }}</p><br>

        <p>Essen: {{ entry.food }}</p><br>

        <h2>{{ entry.programmTitle }}</h2>
        <div v-html="entry.programmText"></div>
        <br>

        <h3>Programm</h3><br>
        <ul class="program-list" >
          <programevent v-for="programevent in entry.events" :key="programevent.id" :programevent="programevent" :programevent-is-visible="programevent.isVisible" :institution="entry.title" :checked-institutions="checkedInstitutions" :checked-themes="checkedThemes" :checked-events="checkedEvents" :checked-languages="checkedLanguages"></programevent>
        </ul>
      </article>
    </div>
</template>

<script>
import ProgramEvent from './ProgramEvent.vue'


module.exports = {
  name: 'programentry',
  props: ['entry','childCount','checkedInstitutions','checkedThemes','checkedEvents','checkedLanguages'],
  components: {
    programevent: ProgramEvent
  },
  data: function () {
    return {
    }
  },
  methods: {
    checkIntersectionForFilters: function (checkedSelection, eventSpecificEntries){
      var inCheckedSelection = (_.intersectionWith(checkedSelection, _.map(eventSpecificEntries, 'title') , _.isEqual).length > 0) || (checkedSelection.length === 0);
      return inCheckedSelection;
    },
    programEventIsVisible: function (programevent) {
      var programEventIsVisible = false

      var inCheckedInstitutions =  this.checkedInstitutions.includes(this.entry.title) || (this.checkedInstitutions.length == 0)

      var inCheckedThemes = this.checkIntersectionForFilters(this.checkedThemes, programevent.themes);

      var inCheckedKindOfEvents = this.checkIntersectionForFilters(this.checkedEvents, programevent.kindOfEvent);

      var inCheckedLanguages = this.checkIntersectionForFilters(this.checkedLanguages, programevent.languages);

      programEventIsVisible = inCheckedInstitutions && inCheckedThemes && inCheckedKindOfEvents && inCheckedLanguages;

      return programEventIsVisible;
    },
  },
  computed: {
    showProgramEvents: function () {
      var programEntryIsVisible = true;
      var childStatusList = [];

      for (let programevent of this.entry.events) {
        programevent.isVisible = this.programEventIsVisible(programevent);
        childStatusList.push(programevent.isVisible);
      }
      if(childStatusList.includes(true)) {
        programEntryIsVisible = true;
      } else {
        programEntryIsVisible = false;
      }

      // var shownInThisEntry = childStatusList.reduce(function(n, val) {
      //     return n + (val === true);
      // }, 0);

      // var hiddenInThisEntry = childStatusList.reduce(function(n, val) {
      //     return n + (val === false);
      // }, 0);

      // console.log(this.entry.title);
      // console.log(shownInThisEntry);
      // this.entry.childCount = shownInThisEntry;
      // this.$emit('update:child-count', shownInThisEntry);
      // console.log("updated:");
      // console.log(this);

      return programEntryIsVisible;
    }
  }
}

</script>

<style lang="css" scoped>
</style>