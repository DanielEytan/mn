<template>

    <li v-if="programeventIsVisible" class="program__list__event program__list--complete__event">
      <h1 class="event-title">{{ programevent.title }}</h1>
      {{ programevent.programmText }}

<!--       <time v-for="time in programevent.time">
        <span v-if="time.type === 'setTimes'"> {{ time.start.date | formatDate }} (Dauer: {{ time.duration }})<br></span>

        <span v-if="time.type === 'continuous'"> {{ time.start.date | formatDate }} – {{ time.end.date | formatDate }} (Durchgehend)<br></span>


        <span v-if="time.type === 'iterating'">  {{ time.start.date | formatDate }} – {{ time.end.date | formatDate }} ({{ time.frequency }}, Dauer: {{ time.duration }})<br></span>
      </time> -->

       <div v-for="time in programevent.time">
                  <time v-if="time.type === 'setTimes'"> {{ time.start.date | formatDate }} <span v-if="time.duration.length">(Dauer: {{ time.duration }})</span><br></time>
                  <time v-if="time.type === 'continuous'"> {{ time.start.date | formatDate }} – {{ time.end.date | formatDate }} (Durchgehend)<br></time>
                  <time v-if="time.type === 'iterating'">  {{ time.start.date | formatDate }} – {{ time.end.date | formatDate }} ({{ time.frequency }}<span v-if="time.duration.length">, Dauer: {{ time.duration }}</span>)<br></time>
               </div>
      <!-- <div v-if="programevent.description.length">{{ programevent.description }} test</div> -->
      <div v-html="programevent.description">{{ programevent.description }}</div>
      <div  class="cat-wrapper">
      <div v-if="programevent.themes.length">
        <div class="themes">
          <h3>Themen und Sparten:</h3>
          <ul>
            <li v-for="theme in programevent.themes">{{ theme.title }}</li>
          </ul>
        </div>
      </div>
      <div v-if="programevent.kindOfEvent.length">
        <div class="kindOfEvent">
          <h3>Veranstaltungsarten:</h3>
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
      </div>
      </div>
      <saveprogram :programevent="programevent"></saveprogram>
    </li>

</template>

<script>
import SaveProgram from './SaveProgram.vue'

module.exports = {
  name: 'programevent',
  props: ['programevent','programeventIsVisible', 'institution', 'checkedInstitutions','checkedThemes','checkedEvents','checkedLanguages','checkedTimes'],
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