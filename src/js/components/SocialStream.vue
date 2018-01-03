<template>
    <div class="social-stream">
      {{ instagram }}
    </div>
</template>

<script>
module.exports = {
  name: 'socialstream',
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
      axios.get('https://api.instagram.com/v1/tags/search?q=mnbasel&access_token=37839051.b3f3b18.06fdb246384d410f9aba55d4d193468d')
        .then(response => {
          this.instagram = response.data.data
        })
    }
  }
}

</script>

<style lang="css" scoped>
</style>