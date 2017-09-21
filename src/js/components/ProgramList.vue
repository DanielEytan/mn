<template>
  <div class="program--list">
    <programentry v-for="entry in program" :key="entry.id" :entry="entry"></programentry>
  </div>
</template>

<script>
import ProgramEntry from './ProgramEntry.vue'

module.exports = {
  name: 'programlist',
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