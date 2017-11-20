<template>
  <div class="program__list__event__info--wrapper flex-container" v-on:click="saveProgram" v-on:mouseover="mouseOver" v-on:mouseleave="mouseLeave" v-bind:class="{ active: hover }">
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
      <div class="icons">
          <div v-for="kindOfEvent in programevent.kindOfEvent" v-if="kindOfEvent.title == 'Kinder & Familien'"><span >🎠</span></div>
          <div v-for="language in programevent.languages">
          <span v-if="language.title == 'Deutsch'">⚀</span>
          <span v-if="language.title == 'Englisch'">⚂</span>
          <span v-if="language.title == 'Französisch'">⚁</span>
          <span v-if="language.title == 'Italienisch'">⚃</span>
          <span v-if="language.title == 'Spanisch'">⚄</span>
          </div>
        </div>

      <ul class="categories">
        <li v-for="theme in programevent.themes"><span><nobr>{{ theme.title }}</nobr></span></li>
        <li v-for="kindOfEvent in programevent.kindOfEvent"><span v-if="kindOfEvent.title != 'Kinder & Familien'"><nobr>{{ kindOfEvent.title }}</nobr></span></li>
      </ul>

    <saveprogram ref="saveprogram" :programevent="programevent"></saveprogram>
  </div>
</template>

<script>
import SaveProgram from './SaveProgram.vue'

module.exports = {
  name: 'myprogramevent',
  props: ['programevent'],
  components: {
    saveprogram: SaveProgram,
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
    saveProgram: function (toggle) {
      var id = this.programevent.id;
      var saveprogram_child_component = this.$refs.saveprogram;
      // saveprogram_child_component.removeFromList(id);
      saveprogram_child_component.save(id,toggle);
    },
    removeFromList: function () {
      var id = this.programevent.id;
      var saveprogram_child_component = this.$refs.saveprogram;
      saveprogram_child_component.removeFromList(id);
    }
  }

}

</script>

<style lang="css" scoped>

</style>