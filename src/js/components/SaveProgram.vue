<template>
  <div class="save-element" v-on:click="save">{{ text }}</div>
</template>

<script>

module.exports = {
   name: 'saveProgram',
   data: function () {
      return {
         text: 'Save'
      }

   },
   methods: {
      save: function (event) {
         // alert('saved')
         localStorage.setItem('event:', 'text')
      }
   }
}

</script>

<style lang="css" scoped>
</style>