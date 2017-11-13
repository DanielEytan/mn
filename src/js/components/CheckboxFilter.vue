<template>
    <div class="checkBoxFilter">
      <ul class="list-group">
        <li class="list-group-item" v-for="entry in possibleValues">
          <div v-on:click="filterChecked(entry)" class="label--wrapper">
          <input class="filter-checkbox" type="checkbox" v-bind:id="'program-input-'+entry.id" v-bind:value="entry.title" v-model="internalCheckedValues">
          <label v-bind:class="{checked:checkedLabel(entry)}" v-bind:for="entry.title">{{ entry.title }}</label> 
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
    checkedLabel: function (entry) {
      var index = this.internalCheckedValues.indexOf(entry.title)
      var isChecked = false;
      if(index !== -1) {
        isChecked = true;
      } else {
        isChecked = false;
      }
      return isChecked;
    },
    filterChecked: function (entry) {
      var index = this.internalCheckedValues.indexOf(entry.title)
      if(index !== -1) {
        this.internalCheckedValues.splice(index,1);
      } else {
        this.internalCheckedValues.push(entry.title);
      }
    },
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
  .filter-checkbox {
    display: none;
  }
  .label--wrapper label:before {
    content:"☐ ";
  }
  .label--wrapper label.checked:before {
    content:"☑ ";
  }
</style>