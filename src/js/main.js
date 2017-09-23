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
import savedLink from './components/SavedLink.vue'
import MyProgram from './components/MyProgram.vue'
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
        saveprogram: saveProgram,
        savedlink: savedLink,
        myprogram: MyProgram


    },
    data: {
        menuOpen: false,
        checkedInstitutions: [],
        checkedThemes: [],
        checkedEvents: [],
        checkedLanguages: [],
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

Vue.prototype._ = _;