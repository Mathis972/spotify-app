<template>
  <section class="section">
    <b-button
      type="is-primary"
      @click="connect"
    >
      authorizes
    </b-button>
    {{ user.display_name }}
    <spotifyCard
      v-if="user.display_name"
      :user="user"
    ></spotifyCard>
  </section>
</template>

<script>
import spotifyCard from '../components/SpotifyCard'
export default {
  name: "SpotifyPage",
  components: {
    spotifyCard
  },
  data () {
    return {
      user: {}
    };
  },
  mounted () {
    let params = this.getHashParams();
    let access_token = params.access_token;
    // let state = params.state

    if (access_token) {
      this.$axios
        .$get("https://api.spotify.com/v1/me", {
          headers: { Authorization: "Bearer " + access_token }
        })
        .then(resp => (this.user = resp));
    }
  },
  methods: {
    getHashParams () {
      var hashParams = {};
      var e,
        r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
      while ((e = r.exec(q))) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
      }
      return hashParams;
    },
    async connect () {
      let URL = "";
      process.env.environment === "development"
        ? (URL = "http:%2F%2Flocalhost:3000%2Fspotify")
        : (URL =
          "https:%2F%2Fnuxt-spotify-stats.herokuapp.com0%2Fspotify");
      console.log(URL);
      console.log(process.env.environment);
      window.location = `https://accounts.spotify.com/authorize?client_id=${process.env.spotifyId}&redirect_uri=${URL}&scope=user-read-private%20user-read-email&response_type=token&state=123`;
    }
  }
};
</script>
