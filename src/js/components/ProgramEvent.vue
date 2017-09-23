<template>

    <li v-if="programeventIsVisible" class="program--event">
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
      <saveprogram :programevent="programevent"></saveprogram>
    </li>

</template>

<script>
import SaveProgram from './SaveProgram.vue'

module.exports = {
  name: 'programevent',
  props: ['programevent','programeventIsVisible', 'institution', 'checkedInstitutions','checkedThemes','checkedEvents','checkedLanguages'],
  components: {
    saveprogram: SaveProgram
  },
  data: function () {
    return {
    }
  },
  methods: {
  },
  computed: {
  },
  watch: {
  }
}

</script>

<style lang="css" scoped>
</style>