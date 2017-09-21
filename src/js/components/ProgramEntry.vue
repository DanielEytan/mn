<template>
    <div class="program--entry">
      <article>
        <h1><a :href="entry.url">{{ entry.number }} – {{ entry.title }}</a></h1>

        <p>{{ entry.address }}<br><span v-for="color in entry.shuttleLine"> {{ color.title }} </span> – {{ entry.journey }}</p><br>

        <p>Essen: {{ entry.food }}</p><br>

        <h2>{{ entry.programmTitle }}</h2>
        <div v-html="entry.programmText"></div>
        <br>

        <h3>Programm</h3><br>
        <ul class="program-list" >
          <programevent v-for="programevent in entry.events" :key="programevent.id" :programevent="programevent"></programevent>
        </ul>
        

      </article>
    </div>
</template>

<script>
import ProgramEvent from './ProgramEvent.vue'


module.exports = {
  name: 'programentry',
  props: ['entry'],
  components: {
    programevent: ProgramEvent
  },
  data: function () {
    return {
    }
  }
}

</script>

<style lang="css" scoped>
</style>