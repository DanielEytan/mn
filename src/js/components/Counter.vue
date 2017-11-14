<template>
 <div class="centered">
    <div class="mn-date"><span>Noch {{ days }} Nächte bis zur Museumsnacht <br> </span>Freitag, 19. Januar 2018, 18–2 Uhr</div>
    <!-- <div class="saved-link" v-if="items.length > 0"><a :href="url">♥ {{ items.length }} <span>– MEIN PROGRAMM</span></a></div> -->
 </div>

 <!-- <div class="saved-link"><a :href="url">Saved Elements: <span>{{ items }}</span></a></div> -->

</template>

<script>
  module.exports = {
    name: 'counter',
    props: ['days'],
    data: function () {
      return {

      }
    },
  }

</script>

<style lang="css" scoped>
</style>