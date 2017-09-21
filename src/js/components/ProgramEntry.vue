<template>
    <div class="program--entry">
      <article v-if="programEntryIsVisible">
        <h1><a :href="entry.url">{{ entry.number }} – {{ entry.title }}</a></h1>

        <p>{{ entry.address }}<br><span v-for="color in entry.shuttleLine"> {{ color.title }} </span> – {{ entry.journey }}</p><br>

        <p>Essen: {{ entry.food }}</p><br>

        <h2>{{ entry.programmTitle }}</h2>
        <div v-html="entry.programmText"></div>
        <br>

        <h3>Programm</h3><br>
        <ul class="program-list" >
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
    }
  },
  methods: {
    showProgramEntry: function () {
      this.programEntryIsVisible = true;
    }
  }
}

</script>

<style lang="css" scoped>
</style>