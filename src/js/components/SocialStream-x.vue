<template>
<!--     <div class="social-stream">
      {{ instagram }}
    </div> -->
      <vue-instagram token="37839051.1677ed0.484bbca8f1624e51881a376cb17df041" username="danieleytan" :count="5" :tags="['mnbasel', 'hashtag2']">
    <template slot="feeds" slot-scope="props">
      <li class="fancy-list"> {{ props.feed.link }} </li>
    </template>
    <template slot="error" slot-scope="props">
      <div class="fancy-alert"> {{ props.error.error_message }} </div>
    </template>
  </vue-instagram>
</template>

<script>
  import VueInstagram from 'vue-instagram'

module.exports = {
  name: 'socialstream',
  components: {
    VueInstagram
  },
  data: function () {
    return {
      instagram: []
    }
  },
  mounted () {
    this.getEntries();
  },
  methods: {
    getEntries () {
      let vm = this;
      axios.get('https://api.instagram.com/v1/tags/search?q=snowy&access_token=37839051.1677ed0.484bbca8f1624e51881a376cb17df041')
        .then(response => {
          this.instagram = response.data.data
        })
    }
  }
}

</script>

<style lang="css" scoped>
</style>