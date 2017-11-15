<template>
  <div class="program__list__event__info--wrapper" v-on:click="saveProgram(programevent.id)" v-on:mouseover="mouseOver" v-on:mouseleave="mouseLeave" v-bind:class="{ active: hover }">
    <h1 class="event-title">{{ programevent.title }}</h1>
    <div v-for="time in programevent.time">
      <time v-if="time.type === 'setTimes'"> {{ time.start.date | formatDate }} <span v-if="time.duration.length">(Dauer: {{ time.duration }})</span><br></time>
      <time v-if="time.type === 'continuous'"> {{ time.start.date | formatDate }} – {{ time.end.date | formatDate }} (Durchgehend)<br></time>
      <time v-if="time.type === 'iterating'">  {{ time.start.date | formatDate }} – {{ time.end.date | formatDate }} ({{ time.frequency }}<span v-if="time.duration.length">, Dauer: {{ time.duration }}</span>)<br></time>
    </div>
    <div v-html="programevent.description">{{ programevent.description }}</div>
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
    saveProgram: function (id) {
      var saveprogram_child_component = this.$refs.saveprogram;
      saveprogram_child_component.save(id);
    }
  }

}

</script>

<style lang="css" scoped>
</style>