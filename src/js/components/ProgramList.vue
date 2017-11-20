<template>
  <div>
    <div class="scroll-top-button" v-bind:class="{ show : showWhenScrolled }" v-on:click="scrollTop" >▲</div>
    <div class="filter__selection--wrapper">
       <div class="number" v-bind:class="{ hide : hideWhenScrolled }">
        <p><nobr>Veranstaltungen: {{calcNumberOfEvents()}}</nobr></p>
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

        <!-- Gruppiert -->
      <!--   <div class="flex-container">
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
        </div>
        <div class="removeAll--tag" v-if="checkedFilters.length > 0">
          <span>Alle Filter zurücksetzen</span> <span v-on:click="removeFromFilters('',true)">(x)</span>
        </div>
      </div> -->

        <div class="filter-tags--container">
          <div class="filter--tag inst" v-for="(filter,index) in checkedInstitutions">
            <span v-if="index == 0">I</span>
            <div v-bind:class="'index-' + index"><span>{{filter}}</span> <span v-on:click="removeFromFilters(filter)">&#9447;</span></div>
          </div>
          <div class="filter--tag theme" v-for="(filter,index) in checkedThemes">
            <span v-if="index == 0">T</span>

            <!-- <div class="space-element" v-if="index == 0"></div> -->

            <div v-bind:class="'index-' + index"><span>{{filter}}</span> <span v-on:click="removeFromFilters(filter)">&#9447;</span></div>
          </div>
          <div class="filter--tag kind" v-for="(filter,index) in checkedEvents">
            <span v-if="index == 0">V</span>
            <!-- <div class="space-element" v-if="index == 0"></div> -->

            <div v-bind:class="'index-' + index"><span>{{filter}}</span> <span v-on:click="removeFromFilters(filter)">&#9447;</span></div>
          </div>
          <div class="filter--tag languages" v-for="(filter,index) in checkedLanguages">
            <span v-if="index == 0">S</span>
            <!-- <div class="space-element" v-if="index == 0"></div> -->

            <div v-bind:class="'index-' + index"><span>{{filter}}</span> <span v-on:click="removeFromFilters(filter)">&#9447;</span></div>
          </div>
        </div>
        <div class="removeAll--tag" v-if="checkedFilters.length > 0" v-on:click="removeFromFilters('',true)">
          <span>Alle Filter zurücksetzen</span> <span>&#9447;</span>
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
      index: '',
      hideWhenScrolled: true,
      showWhenScrolled: false,
    }
  },
  computed: {
    checkedFilters: function () {
      return this.checkedInstitutions.concat(this.checkedThemes).concat(this.checkedEvents).concat(this.checkedLanguages);
    }
  },
  mounted () {
    this.getEntries();
    window.addEventListener("scroll", this.scrolled);
  },
  methods: {
    scrollTop: function () {
      VueScrollTo.scrollTo(document.getElementById('header'), 500);
    },
     scrolled: function () {
          var doc = document.documentElement;
          var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
          console.log(top);
           if (top > 4000) {
            this.hideWhenScrolled = true;
            this.showWhenScrolled = true;
          } else {
            this.hideWhenScrolled = false;
            this.showWhenScrolled = false;
          }
            

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

        })
    },
    initEventHash: function () {
      for (let entry of this.program ) {
        this.eventHash[entry.id] = 0;
        
      }
    },
    calcNumberOfEvents: function () {
      var sum = 0;
      for(var key in this.eventHash){
        sum += parseInt(this.eventHash[key]);
      }
      return sum;
    },
    updateEventNumberOfEntry: function (data) {
      this.$set(this.eventHash, Object.keys(data)[0], data[Object.keys(data)[0]]);

    }
  }
}

</script>

<style lang="css" scoped>

</style>