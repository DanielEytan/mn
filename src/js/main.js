
var test = require('module');

test();
console.log('Hallo Internet!');

new Vue({
    delimiters: ['${', '}'],
    el: '#menu',
    data: {
        menuOpen: false,
    },
    methods: {
        toggle: function() {
            this.menuOpen = !this.menuOpen;
        }
    },
});

