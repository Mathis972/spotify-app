<template>
  <div>
    <section
      v-if="!access_token"
      class="section"
    >
      <h2 class="title is-2">This app needs your authorization to work 😳👉👈</h2>
      <p v-if="error"> Please :(</p>
      <b-button
        type="is-primary"
        icon-right="check-outline"
        @click="connect"
      >
        Authorize with Spotify
      </b-button>
      {{ user.display_name }}

    </section>
    <section
      v-else
      class="section"
    >
      <!-- <spotifyCard
        v-if="loaded"
        :user="user"
      ></spotifyCard> -->
      <spotifyTile
        v-if="loaded"
        :user="user"
      ></spotifyTile>
    </section>
  </div>
</template>

<script>
// import spotifyCard from '../components/SpotifyCard'
import spotifyTile from "../components/SpotifyTile"
export default {
  name: "SpotifyPage",
  components: {
    // spotifyCard,
    spotifyTile
  },
  data () {
    return {
      user: {},
      storedState: '',
      stateKey: 'spotify_auth_state',
      access_token: '',
      error: '',
      loaded: false
    };
  },
  async mounted () {
    if (localStorage.getItem('spotify_auth_state')) {
      try {

        this.storedState = localStorage.getItem('spotify_auth_state')
      } catch (e) {
        localStorage.removeItem('spotify_auth_state')
      }
    }
    // this.storedState = localStorage.getItem('spotify_auth_state');

    let params = this.getHashParams();
    let state = params.state;
    this.error = this.$route.query.error;
    this.access_token = params.access_token;
    console.log(state, this.storedState);


    if (this.access_token && (state == null || state !== this.storedState)) {
      alert('There was an error during the authentication');
    } else {
      // localStorage.removeItem(this.stateKey);
      if (this.access_token) {
        await this.$axios
          .$get("https://api.spotify.com/v1/me", {
            headers: { Authorization: "Bearer " + this.access_token }
          })
          .then(resp => {
            this.user = resp;
            this.$axios
              .$get("https://api.spotify.com/v1/me/player/currently-playing", {
                headers: { Authorization: "Bearer " + this.access_token }
              }).then(resp => {
                this.user.currentTrack = resp;
                this.loaded = true
              })

          })
          .catch((err) => { console.log(err); localStorage.removeItem(this.stateKey) });
      }
    }
    console.log("e")


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
    /**
  * Generates a random string containing numbers and letters
  * @param  {number} length The length of the string
  * @return {string} The generated string
  */
    generateRandomString (length) {
      var text = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    },
    async connect () {
      let state = this.generateRandomString(16);
      let scope = 'user-read-private user-read-email user-read-currently-playing'
      let URL = ""
      localStorage.setItem(this.stateKey, state);

      process.env.environment === "development"
        ? (URL = "http:%2F%2Flocalhost:3000%2Fspotify")
        : (URL =
          "https:%2F%2Fnuxt-spotify-stats.herokuapp.com%2Fspotify");
      window.location = `https://accounts.spotify.com/authorize?client_id=${process.env.spotifyId}&redirect_uri=${URL}&scope=${encodeURI(scope)}&response_type=token&state=${state}`;
    }
  }
};
</script>
