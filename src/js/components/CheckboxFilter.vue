<template>
    <div class="checkBoxFilter">
      <ul class="list-group">
        <li class="list-group-item" v-for="entry in possibleValues">
          <div>
          <input type="checkbox" v-bind:id="'program-input-'+entry.id" v-bind:value="entry.title" v-model="internalCheckedValues">
          <label v-bind:for="entry.title">{{ entry.title }}</label>
        </div>
        </li >
      </ul>
    </div>
</template>

<script>
import { EventBus } from '../event-bus.js';


module.exports = {
  name: 'checkboxfilter',
  props: ['valueName'],
  data: function () {
    return {
      possibleValues: [],
      internalCheckedValues: []
    }
  },
  watch: {
    'internalCheckedValues': function() {
      // When the internal value changes, we $emit an event. Because this event is 
      // named 'input', v-model will automatically update the parent checkedValues data attribute
      EventBus.$emit('checkbox-clicked');
      this.$emit('input', this.internalCheckedValues);
    }
  },
  mounted () {
    this.getEntries();
    this.initEventBus();
  },
  methods: {
    initEventBus: function () {
      var _this = this;
      EventBus.$on('remove-all-filter', function () {
        _this.internalCheckedValues = [];
      });
    },
    getEntries: function () {
      let _this = this;
      axios.get(this.valueName + '.json')
        .then(response => {
          this.possibleValues = response.data.data;
          this.initValues();
        })
    },
    initValues () {
      this.$emit('init-possible-values', _.map(this.possibleValues,'title'));
    }
  }
}

</script>

<style lang="css" scoped>
</style>