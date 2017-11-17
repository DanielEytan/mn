<template>
  <div>
    <div class="scroll-top-button" v-on:click="scrollTop" >▲</div>
    <div class="filter__selection--wrapper">
       <div class="number">
        <p>Anzahl Veranstaltungen: {{calcNumberOfEvents()}}</p>
      </div>
      <div class="selection"><!-- 
        <div class="filter-tags--container">
          <div class="filter--tag" v-for="filter in checkedFilters">
            <span>{{filter}}</span> <span v-on:click="removeFromFilters(filter)">(x)</span>
          </div>
          <div class="removeAll--tag" v-if="checkedFilters.length > 0">
            <span>Alle Filter zurücksetzen</span> <span v-on:click="removeFromFilters('',true)">(x)</span>
          </div>
        </div> -->
        <div class="filter-tags--container filter-tags--institutions filter-tags--column">
          <div class="filter--tag" v-for="filter in checkedInstitutions">
            <span>{{filter}}</span> <span v-on:click="removeFromFilters(filter)">(x)</span>
          </div>
        </div>
        <div class="filter-tags--container filter-tags--themes filter-tags--column">
          <div class="filter--tag" v-for="filter in checkedThemes">
            <span>{{filter}}</span> <span v-on:click="removeFromFilters(filter)">(x)</span>
          </div>
        </div>
        <div class="filter-tags--container filter-tags--events filter-tags--column">
          <div class="filter--tag" v-for="filter in checkedEvents">
            <span>{{filter}}</span> <span v-on:click="removeFromFilters(filter)">(x)</span>
          </div>
        </div>
        <div class="filter-tags--container filter-tags--languages filter-tags--column">
          <div class="filter--tag" v-for="filter in checkedLanguages">
            <span>{{filter}}</span> <span v-on:click="removeFromFilters(filter)">(x)</span>
          </div>
        </div>
        <div class="removeAll--tag" v-if="checkedFilters.length > 0">
          <span>Alle Filter zurücksetzen</span> <span v-on:click="removeFromFilters('',true)">(x)</span>
        </div>
      </div>

    </div>

    <ul class="program__list program__list--complete">
      <programentry v-for="entry in program" ref="program" :key="entry.id" :entry="entry" :checked-institutions="checkedInstitutions" :checked-themes="checkedThemes" :checked-events="checkedEvents" :checked-languages="checkedLanguages" :checked-times="checkedTimes" v-on:update-event-number-of-entry="updateEventNumberOfEntry">
      </programentry>
    </ul>

  </div>
</template>

<script>
import ProgramEntry from './ProgramEntry.vue';
import { EventBus } from '../event-bus.js';

module.exports = {
  name: 'programlist',
  props: ['checkedInstitutions','checkedThemes','checkedEvents','checkedLanguages','checkedTimes'],
  components: {
    programentry: ProgramEntry
  },
  data: function () {
    return {
      program: [],
      eventHash: {0:0},
    }
  },
  computed: {
    checkedFilters: function () {
      return this.checkedInstitutions.concat(this.checkedThemes).concat(this.checkedEvents).concat(this.checkedLanguages);
    }
  },
  mounted () {
    this.getEntries();
  },
  methods: {
    scrollTop: function () {
      VueScrollTo.scrollTo(document.getElementById('header'), 500);
    },
    removeFromFilters: function (filter, removeAll) {
      if(!removeAll) {
        this.$emit('remove-filter',filter);
      } else if(removeAll) {
        EventBus.$emit('remove-all-filter');
      }
    },
    getEntries: function () {
      let _this = this;
      axios.get('program.json')
        .then(response => {
          this.program = response.data.data;
          // var response_logger = _.map(this.program, function (o,index) {
          //   var hash = {};
          //   hash[o.id] = o.events.length;
          //   return hash;
          //   // console.log(o.events.length);
          //   // console.log(index);
          // });

          // var eventHash_logger = _.map(this.eventHash, function (key, value) {
          //   var hash = {};
          //   hash[key] = value;
          //   return hash;
          // });
          // console.log(response_logger);
          // console.log(this.eventHash);
          // console.log("response:",_.reduce(this.program,function(result,current) {
          //   return parseInt(result+current.events.length);
          // },0));
        })
    },
    // initEventHash: function () {
    //   for (let entry of this.program ) {
    //     this.eventHash[entry.id] = 0;
    //   }
    //   // console.log(this.eventHash);
    // },
    calcNumberOfEvents: function () {
      // var sum = 0;
      // console.log(this.eventHash);
      // for(var key in this.eventHash){
      //   sum += parseInt(this.eventHash[key]);
      // }
      // return sum;
      var eventHashReduced = _.reduce(this.eventHash,function(result, current) {
        return result+current;
      },0);
      return eventHashReduced;
      // console.log("calculated:",eventHashReduced)
    },
    updateEventNumberOfEntry: function (data) {
      this.$set(this.eventHash, Object.keys(data)[0], data[Object.keys(data)[0]]);
    }
  }
}

</script>

<style lang="css" scoped>
  .scroll-top-button {
    cursor: pointer;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    padding-bottom: 9px;
    background:rgba(255,255,255,.95);
    border: 1px solid black;
    z-index: 10;
  }
</style>