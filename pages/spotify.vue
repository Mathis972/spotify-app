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

      await this.$axios.$get(`https://accounts.spotify.com/authorize?client_id=${process.env.spotifyId}&redirect_uri=https:%2F%2Fnuxt-spotify-stats.herokuapp.com%2Fspotify&scope=user-read-private%20user-read-email&response_type=token&state=123`, { headers: { 'Access-Control-Allow-Origin': '*' } })
    }
  }
}
</script>
