
var test = require('module');
window.axios = require('axios');

import Vue from 'vue'
import Hello from './components/Hello.vue'
import CategoryList from './components/CategoryList.vue'
import Map from './components/Map.vue'
import Locations from './components/Locations.vue'
import saveProgram from './components/SaveProgram.vue'
// import Map from './components/Map.vue'



// test();
console.log('Hallo Internet!');

var vueApp = new Vue({
    delimiters: ['${', '}'],
    el: '#vue-app',
    components: {Hello:Hello, categorylist:CategoryList, locations:Locations, googlemap:Map, saveprogram:saveProgram},
    data: {
        menuOpen: false,
    },
    methods: {
        toggle: function() {
            this.menuOpen = !this.menuOpen;
        }
    },
});