<template>

    <li v-if="showProgramEvent" id="program">
      <h2>{{ programevent.title }}</h2>

      <time v-for="time in programevent.time">
        <span v-if="time.type === 'setTimes'"> {{ time.start.date | formatDate }} (Dauer: {{ time.duration }})<br></span>

        <span v-if="time.type === 'continuous'"> {{ time.start.date | formatDate }} – {{ time.end.date | formatDate }} (Durchgehend)<br></span>


        <span v-if="time.type === 'iterating'">  {{ time.start.date | formatDate }} – {{ time.end.date | formatDate }} ({{ time.frequency }}, Dauer: {{ time.duration }})<br></span>
      </time>

      <div v-if="programevent.themes.length">
        <div class="themes">
          <h3>Themen:</h3>
          <ul>
            <li v-for="theme in programevent.themes">{{ theme.title }}</li>
          </ul>
        </div>
      </div>
      <div v-if="programevent.kindOfEvent.length">
        <div class="kindOfEvent">
          <h3>Art der Veranstaltung:</h3>
          <ul>
            <li v-for="kindOfEvent in programevent.kindOfEvent">{{ kindOfEvent.title }}</li>
          </ul>
        </div>
      </div>
      <div v-if="programevent.languages.length">
        <div class="languages">
          <h3>Sprachen:</h3>
          <ul>
            <li v-for="language in programevent.languages">{{ language.title }}</li>
          </ul>
        </div>
      </div></br>
      <saveprogram></saveprogram>
    </li>

</template>

<script>
import SaveProgram from './SaveProgram.vue'

module.exports = {
  name: 'programevent',
  props: ['programevent','institution', 'checkedInstitutions','checkedThemes','checkedEvents','checkedLanguages'],
  components: {
    saveprogram: SaveProgram
  },
  data: function () {
    return {
    }
  },
  methods: {
    checkIntersectionForFilters: function (checkedSelection, eventSpecificEntries){
      var inCheckedSelection = _.intersectionWith(checkedSelection, _.map(eventSpecificEntries, 'title') , _.isEqual).length || (checkedSelection.length === 0);
      return inCheckedSelection;
    }
  },
  computed: {
    showProgramEvent: function () {

      var programEventIsVisible = false

      var inCheckedInstitutions =  this.checkedInstitutions.includes(this.institution) || (this.checkedInstitutions.length == 0)

      var inCheckedThemes = this.checkIntersectionForFilters(this.checkedThemes, this.programevent.themes);

      var inCheckedKindOfEvents = this.checkIntersectionForFilters(this.checkedEvents, this.programevent.kindOfEvent);

      var inCheckedLanguages = this.checkIntersectionForFilters(this.checkedLanguages, this.programevent.languages);


      programEventIsVisible = inCheckedInstitutions && inCheckedThemes && inCheckedKindOfEvents && inCheckedLanguages;
      return programEventIsVisible;
    }
  }
}

</script>

<style lang="css" scoped>
</style>