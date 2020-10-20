<template>
  <section class="section">
    <button @click="connect">
      Authorizes
    </button>
  </section>
</template>

<script>
export default {
  name: 'SpotifyPage',
  methods: {
    async connect () {

      await this.$axios.$get(`https://accounts.spotify.com/authorize?client_id=${process.env.spotifyId}&redirect_uri=https://nuxt-spotify-stats.herokuapp.com/spotify&scope=user-read-private%20user-read-email&response_type=token&state=123`, { headers: { 'Access-Control-Allow-Origin': '*' } })
    }
  }
}
</script>
