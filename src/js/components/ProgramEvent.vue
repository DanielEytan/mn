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
        <div class="additional-lang" v-html="programevent.additionalLang">{{ programevent.additionalLang }}</div>
        
      </div>
      <div class="icons">
        <div v-for="kindOfEvent in programevent.kindOfEvent" v-if="kindOfEvent.title == 'Für Kinder & Familien'"><span >🎠</span></div>
        <div v-for="language in programevent.languages">
          <span v-if="language.title == 'Deutsch'" class="de">🅳</span>
          <span v-if="language.title == 'English'" class="en">🅴</span>
          <span v-if="language.title == 'Français'" class="fr">🅵</span>
          <span v-if="language.title == 'Italiano'" class="it">🅸</span>
          <span v-if="language.title == 'Español'" class="sp other">🆂</span>
          <span v-if="language.title == 'Magyar'" class="other">🅷</span>
          <span v-if="language.title == 'Pусский'" class="other">🆁</span>

        </div>
      </div>

      <ul class="categories">
        <li v-for="theme in programevent.themes"><span><nobr>{{ theme.title }}</nobr></span></li><li v-for="kindOfEvent in programevent.kindOfEvent"><span v-if="kindOfEvent.title != 'Für Kinder & Familien'"><nobr>{{ kindOfEvent.title }}</nobr></span></li>
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