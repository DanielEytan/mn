<template>
  <div class="saved-links">{{ text }}</div>
</template>

<script>

module.exports = {
   name: 'savedLink',
   data: function () {
      return {
         text: 'Saved Links'
         // save: true
      }

   },
   methods: {
      save: function (event) {
         // alert('saved')
         localStorage.getItem('event:')
         alert('test')
         // if (localStorage.getItem('event:', 'text')) {
         //    // alert('saved');
         //    localStorage.removeItem('event:', 'text')
         // }
      },

   }
}

</script>

<style lang="css" scoped>
</style>