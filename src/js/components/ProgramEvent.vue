<template>

    <li id="program">
      <h2>{{ programevent.title }}</h2>

      <time v-for="time in programevent.time">

        <span> {{ time.start | date("h:i") }} (Dauer: {{ time.duration }})<br></span>


      </time>

<!--       {% for time in entry.time %}
         <time>
          {% if time.type == "setTimes" %}
        {{ time.start | date("h:i") }} (Dauer: {{ time.duration }})<br>
      {% elseif time.type == "continuous" %}
          {{ time.start | date("h:i") }} – {{ time.end | date("h:i") }} (Durchgehend)
      {% elseif time.type == "iterating" %}
          {{ time.start | date("h:i") }} – {{ time.end | date("h:i") }} ({{ time.frequency }}, Dauer: {{ time.duration }})
          {% endif %}
        </time>
      {% endfor %} -->


    </li>
</template>

<script>


module.exports = {
  name: 'programevent',
  props: ['programevent'],
  components: {
  },
  data: function () {
    return {
    }
  }
}

</script>

<style lang="css" scoped>
</style>