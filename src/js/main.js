//require
window.axios = require('axios');
window._ = require('lodash');

//import
import Vue from 'vue'
import ThemeList from './components/ThemeList.vue'
import InstitutionFilter from './components/InstitutionFilter.vue'
import CheckboxFilter from './components/CheckboxFilter.vue'
import TimeFilter from './components/TimeFilter.vue'
import ProgramList from './components/ProgramList.vue'
import saveProgram from './components/SaveProgram.vue'
import moment from 'moment.min.js'



//vue main app instance
var vueApp = new Vue({
    delimiters: ['${', '}'],
    el: '#vue-app',
    components: {
        themelist:ThemeList,
        institutionfilter:InstitutionFilter,
        checkboxfilter:CheckboxFilter,
        timefilter:TimeFilter,
        programlist: ProgramList,
        saveprogram: saveProgram
    },
    data: {
        menuOpen: false,
        checkedInstitutions: [],
        checkedThemes: [],
        checkedEvents: [],
        checkedLanguages: [],
        checkedTimes: [],
        institutionsAPITitle: "institution",
        themesAPITitle: "themes",
        eventsAPITitle: "events",
        languagesAPITitle: "languages",
    },
    methods: {
        toggle: function() {
            this.menuOpen = !this.menuOpen;
        }
    },
    
});

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format("HH:mm")
  }
});


Vue.filter('timeTable', function(value) {
    var translate = {
      "18:00": 0,
      "18:15": 1,
      "18:30": 2,
      "18:45": 3,
      "19:00": 4,
      "19:15": 5,
      "19:30": 6,
      "19:45": 7,
      "20:00": 8,
      "20:15": 9,
      "20:30": 10,
      "20:45": 11,
      "21:00": 12,
      "21:15": 13,
      "21:30": 14,
      "21:45": 15,
      "22:00": 16,
      "22:15": 17,
      "22:30": 18,
      "22:45": 19,
      "23:00": 20,
      "23:15": 21,
      "23:30": 22,
      "23:45": 23,
      "00:00": 24,
      "00:15": 25,
      "00:30": 26,
      "00:45": 27,
      "01:00": 28,
      "01:15": 29,
      "01:30": 30,
      "01:45": 31,
      "02:00": 32
    }

  if (value) {
    return translate[value];
  }
});



Vue.prototype._ = _;