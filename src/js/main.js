//require
window.axios = require('axios');

//import
import Vue from 'vue'
import ThemeList from './components/ThemeList.vue'
import InstitutionFilter from './components/InstitutionFilter.vue'
import CheckboxFilter from './components/CheckboxFilter.vue'
import ProgramList from './components/ProgramList.vue'


//vue main app instance
var vueApp = new Vue({
    delimiters: ['${', '}'],
    el: '#vue-app',
    components: {
        themelist:ThemeList,
        institutionfilter:InstitutionFilter,
        checkboxfilter:CheckboxFilter,
        programlist: ProgramList
    },
    data: {
        menuOpen: false,
        checkedInstitutions: [],
        checkedThemes: [],
        checkedEvents: [],
        institutionsAPITitle: "institution",
        themesAPITitle: "themes",
        eventsAPITitle: "events"
    },
    methods: {
        toggle: function() {
            this.menuOpen = !this.menuOpen;
        }
    },
    
});