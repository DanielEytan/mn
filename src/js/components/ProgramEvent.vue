<template>

  <li v-if="programeventIsVisible" class="program__list__event program__list--complete__event" v-on:click="saveProgram"  v-on:mouseover="mouseOver" v-on:mouseleave="mouseLeave" v-bind:class="{ active: hover }">
    <div class="flex-container">
      <div class="time">
        <div  v-for="time in programevent.time">
          <time v-if="time.type === 'setTimes'"> {{ time.start.date | formatDate }}<span v-if="time.duration.length"><br>(Dauer: {{ time.duration }})</span></time> 
          <time v-if="time.type === 'continuous'"> {{ time.start.date | formatDate }} – {{ time.end.date | formatDate }}</time>
          <time v-if="time.type === 'iterating'">  {{ time.start.date | formatDate }} – {{ time.end.date | formatDate }} <br>({{ time.frequency }}<span v-if="time.duration.length">, Dauer: {{ time.duration }}</span>)</time>
        </div>
      </div>
    <div class="text">

      <h1 class="event-title">{{ programevent.title }}</h1>
      <div v-html="programevent.description">{{ programevent.description }}</div>
     
      </div>
<!--       <div  class="cat-wrapper">
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
    </div> -->

     <div class="icons">
          <div v-for="kindOfEvent in programevent.kindOfEvent" v-if="kindOfEvent.title == 'Kinder & Familien'"><span >🎠</span></div>
          <div v-for="language in programevent.languages">
          <span v-if="language.title == 'Deutsch'" class="other">⚀</span>
          <span v-if="language.title == 'Englisch'" class="en">⚂</span>
          <span v-if="language.title == 'Französisch'" class="fr">⚁</span>
          <span v-if="language.title == 'Italienisch'" class="it">⚃</span>
          <span v-if="language.title == 'Spanisch'" class="other">⚄</span>
          </div>
        </div>

      <ul class="categories">
        <li v-for="theme in programevent.themes"><span><nobr>{{ theme.title }}</nobr></span></li>
        <li v-for="kindOfEvent in programevent.kindOfEvent"><span v-if="kindOfEvent.title != 'Kinder & Familien'"><nobr>{{ kindOfEvent.title }}</nobr></span></li>
      </ul>
    <saveprogram  ref="saveprogram" :programevent="programevent"></saveprogram>
       

</div>
</li>

</template>

<script>
import SaveProgram from './SaveProgram.vue'
import { EventBus } from '../event-bus.js';

module.exports = {
  name: 'programevent',
  props: ['programevent','programeventIsVisible', 'institution', 'checkedInstitutions','checkedThemes','checkedEvents','checkedLanguages','checkedTimes'],
  components: {
    saveprogram: SaveProgram
  },
  data: function () {
    return {
      hover: false
    }
  },
  methods: {
    mouseOver: function () {
      this.hover = true;
    },
    mouseLeave: function () {
      this.hover = false;
    },
    saveProgram: function () {
      var saveprogram_child_component = this.$refs.saveprogram;
      saveprogram_child_component.save(this.programevent.id);
    }
  },
  computed: {
  },
  watch: {
  }
}

</script>

<style lang="css" scoped>

</style>