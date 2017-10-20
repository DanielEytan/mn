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
import GoogleMap from './components/GoogleMap.vue'
import twitter from './components/twitter.vue'
import contrast from './components/contrast.vue'




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
        myprogram: MyProgram,
        googlemap: GoogleMap,
        twitter: twitter,
        contrast: contrast,
    },
    data: {
        menuOpen: false,
        activeContrast: false,
        openInstitution: false,
        openThemes: false,
        openKinds: false,
        openLang: false,
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
   //  mounted () {
   //    this.stateContrast();
      
   // },
    methods: {
        toggle: function() {
            this.menuOpen = !this.menuOpen;
        },
        toggleContrast: function() {
            this.activeContrast = !this.activeContrast;
            // localStorage.setItem("contrast","active");
        },
        // stateContrast: function() {
        //   var contrast = this.activeContrast;

        //   if (contrast = true) {
        //     console.log("contrast is active")
        //     this.activeContrast = !this.activeContrast;
        //   };
        //   if (contrast = false) {
        //     console.log("contrast is inactive")
        //   };
        //   //  if (this.activeContrast = false) {
        //   //   console.log("contrast is not active")
        //   // };
        // },
         toggleInstitution: function(){
            this.openInstitution = !this.openInstitution;
            if (this.openThemes = true) {
              this.openThemes = !this.openThemes;
            };
             if (this.openKinds = true) {
              this.openKinds = !this.openKinds;              
            };
            if (this.openLang = true) {
              this.openLang = !this.openLang;              
            };
        
        },
         toggleThemes: function(){
            this.openThemes = !this.openThemes;
            if (this.openInstitution = true) {
              this.openInstitution = !this.openInstitution;
            };
             if (this.openKinds = true) {
              this.openKinds = !this.openKinds;              
            };
            if (this.openLang = true) {
              this.openLang = !this.openLang;              
            };
        },
         toggleKinds: function(){
            this.openKinds = !this.openKinds;
            if (this.openInstitution = true) {
              this.openInstitution = !this.openInstitution;
            };
             if (this.openThemes = true) {
              this.openThemes = !this.openThemes;              
            };
            if (this.openLang = true) {
              this.openLang = !this.openLang;              
            };
        },
         toggleLang: function(){
            this.openLang = !this.openLang;
            if (this.openInstitution = true) {
              this.openInstitution = !this.openInstitution;
            };
             if (this.openThemes = true) {
              this.openThemes = !this.openThemes;              
            };
            if (this.openKinds = true) {
              this.openKinds = !this.openKinds;              
            };
        },
        removeFilter: function (filter) {
          // console.log(filter);
          if(this.checkedInstitutions.indexOf(filter) > -1) {
            this.checkedInstitutions.splice(this.checkedInstitutions.indexOf(filter),1);
          }
          if(this.checkedThemes.indexOf(filter) > -1) {
            this.checkedThemes.splice(this.checkedThemes.indexOf(filter),1);
          }
          if(this.checkedEvents.indexOf(filter) > -1) {
            this.checkedEvents.splice(this.checkedEvents.indexOf(filter),1);
          }
          if(this.checkedLanguages.indexOf(filter) > -1) {
            this.checkedLanguages.splice(this.checkedLanguages.indexOf(filter),1);
          }
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