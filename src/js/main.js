
var test = require('module');
window.axios = require('axios');

import Vue from 'vue'
import Hello from './components/Hello.vue'
import CategoryList from './components/CategoryList.vue'

// test();
console.log('Hallo Internet!');

var vueApp = new Vue({
    delimiters: ['${', '}'],
    el: '#vue-app',
    components: {Hello:Hello, categorylist:CategoryList},
    data: {
        menuOpen: false,
    },
    methods: {
        toggle: function() {
            this.menuOpen = !this.menuOpen;
        }
    },
});