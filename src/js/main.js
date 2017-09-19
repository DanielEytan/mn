//require
window.axios = require('axios');


//import
import Vue from 'vue'
import ThemeList from './components/ThemeList.vue'
import InstitutionFilter from './components/InstitutionFilter.vue'


//vue main app instance
var vueApp = new Vue({
    delimiters: ['${', '}'],
    el: '#vue-app',
    components: {
        themelist:ThemeList,
        institutionfilter:InstitutionFilter
    },
    data: {
        menuOpen: false,
        checkedInstitutions: []
    },
    methods: {
        toggle: function() {
            this.menuOpen = !this.menuOpen;
        }
    },
    
});