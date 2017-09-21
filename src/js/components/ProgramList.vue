<template>
  <p>Hola</p>
</template>

<script>

module.exports = {
  name: 'programlist',
  data: function () {
    return {
      program: []
    }
  },
  mounted () {
    this.getEntries();
  },
  methods: {
    getEntries () {
      let _this = this;
      axios.get('program.json')
        .then(response => {
          this.program = response.data.data;
        })
    }
  }
}

</script>

<style lang="css" scoped>
</style>