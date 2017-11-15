<template>
  <div class="print-button">
    <div v-on:click="print">drucken</div>
  </div>
</template>

<script>

module.exports = {
  name: 'printbutton',
  data: function () {
    return {
    }
  },
  methods: {
    print: function () {
      window.print();
    }
  }
}

</script>

<style lang="css" scoped>
.print-button {
  cursor: pointer;
  padding: 10px;
  border: 1px solid black;
  display: inline-block;
}
</style>