<template>
  <div class="program--list">
    <div>
      <!-- <p>Anzahl der ausgewählten Institute:</p> -->
      <!-- <p>Anzahl der ausgewählten Events:{{numberOfEvents}}</p> -->
    </div>
    <programentry v-for="entry in program" :key="entry.id" :entry="entry" :checked-institutions="checkedInstitutions" :checked-themes="checkedThemes" :checked-events="checkedEvents" :checked-languages="checkedLanguages"></programentry>
  </div>
</template>

<script>
import ProgramEntry from './ProgramEntry.vue'

module.exports = {
  name: 'programlist',
  props: ['checkedInstitutions','checkedThemes','checkedEvents','checkedLanguages'],
  components: {
    programentry: ProgramEntry
  },
  data: function () {
    return {
      program: []
    }
  },
  mounted () {
    this.getEntries();
  },
  methods: {
    getEntries () {
      let _this = this;
      axios.get('program.json')
        .then(response => {
          this.program = response.data.data;
        })
    }
  }
}

</script>

<style lang="css" scoped>
</style>