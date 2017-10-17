<template>
    <div class="program--block narrow">
      <article v-if="showProgramEvents">
        <div class="institution">
        {{ entry.number }} <span v-for="color in entry.shuttleLine"> {{ color.title }} </span>
        <h1><a :href="entry.url">{{ entry.title }}</a></h1>
        <h2>{{ entry.programmTitle }}</h2>
        <!-- <p>{{ entry.address }}<br> – {{ entry.journey }}</p><br> -->

        <p>Essen: {{ entry.food }}</p><br>

        </div>
        <!-- <div v-html="entry.programmText"></div> -->

        <ul class="program-list" >
          <programevent v-for="programevent in entry.events" :key="programevent.id" :programevent="programevent" :programevent-is-visible="programevent.isVisible" :institution="entry.title" :checked-institutions="checkedInstitutions" :checked-themes="checkedThemes" :checked-events="checkedEvents" :checked-languages="checkedLanguages" :checked-times="checkedTimes"></programevent>
        </ul>
      </article>
    </div>
</template>

<script>
import ProgramEvent from './ProgramEvent.vue'


module.exports = {
  name: 'programentry',
  props: ['entry','checkedInstitutions','checkedThemes','checkedEvents','checkedLanguages','checkedTimes'],
  components: {
    programevent: ProgramEvent
  },
  data: function () {
    return {
      internalNumberOfEvents: 0
    }
  },
  watch: {
    internalNumberOfEvents: function () {
      var changes = {};
      changes[this.entry.id] = this.internalNumberOfEvents;
      this.$emit('update-event-number-of-entry', changes);
    }
  },
  methods: {
    checkIntersectionForFilters: function (checkedSelection, eventSpecificEntries){
      var inCheckedSelection = (_.intersectionWith(checkedSelection, _.map(eventSpecificEntries, 'title') , _.isEqual).length > 0) || (checkedSelection.length === 0);
      return inCheckedSelection;
    },
    checkIntersectionForTimeFilter: function (selectedTimes, eventTime){
      var isOneInRange = false
      var selectedStart = this.$options.filters.timeTable(selectedTimes[0]);
      var selectedEnd = this.$options.filters.timeTable(selectedTimes[1]);

      for(let time of eventTime) {
        var eventStart = this.$options.filters.timeTable(this.$options.filters.formatDate(time.start.date));
        if ( ( eventStart >= selectedStart ) && (eventStart <= selectedEnd) ) {
          isOneInRange = true;
          break;
        }
      }
      return isOneInRange;
    },
    programEventIsVisible: function (programevent) {
      var programEventIsVisible = false

      var inCheckedInstitutions =  this.checkedInstitutions.includes(this.entry.title) || (this.checkedInstitutions.length == 0)

      var inCheckedThemes = this.checkIntersectionForFilters(this.checkedThemes, programevent.themes);

      var inCheckedKindOfEvents = this.checkIntersectionForFilters(this.checkedEvents, programevent.kindOfEvent);

      var inCheckedLanguages = this.checkIntersectionForFilters(this.checkedLanguages, programevent.languages);

      var inSelectedTime = this.checkIntersectionForTimeFilter(this.checkedTimes, programevent.time);


      programEventIsVisible = inCheckedInstitutions && inCheckedThemes && inCheckedKindOfEvents && inCheckedLanguages && inSelectedTime;

      return programEventIsVisible;
    },
    numberOfEventsOfEntry: function () {
      var counter = 0;
      var childStatusList = {};

      for (let programevent of this.entry.events) {
        if(this.programEventIsVisible(programevent)) {
          counter++;
        }
      }
      this.internalNumberOfEvents = counter;
      return counter;
    }
  },
  computed: {
    showProgramEvents: function () {
      var programEntryIsVisible = true;
      var childStatusList = [];

      for (let programevent of this.entry.events) {
        programevent.isVisible = this.programEventIsVisible(programevent);
        childStatusList.push(programevent.isVisible);
      }
      if(childStatusList.includes(true)) {
        programEntryIsVisible = true;
      } else {
        programEntryIsVisible = false;
      }
      this.numberOfEventsOfEntry();
      return programEntryIsVisible;
    }
  }
}

</script>

<style lang="css" scoped>
</style>