
var test = require('module');
import Vue from 'vue'
import Hello from './components/Hello.vue'

test();
console.log('Hallo Internet!');

var vueApp = new Vue({
    delimiters: ['${', '}'],
    el: '#vue-app',
    components: {Hello},
    data: {
        menuOpen: false,
    },
    methods: {
        toggle: function() {
            this.menuOpen = !this.menuOpen;
        }
    },
});