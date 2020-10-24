<template>
  <div>
    <section
      v-if="!storedState"
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
      <h1 v-if="loaded === true && loadedStats === false">Loading your stats</h1>
      <spotifyTile
        v-if="loadedStats === true"
        :user="user"
      ></spotifyTile>
      <h2 v-else>You're not listening to anything huh</h2>
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
      loaded: false,
      loadedStats: false
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
      localStorage.removeItem(this.stateKey);
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
                if (resp) {
                  this.user.currentTrack = resp;
                  this.loaded = true;
                } else {
                  console.log("Not Listening to anything atm")
                }
              })
              .catch(err => console.log(err));
          })
          .catch((err) => { console.log(err); localStorage.removeItem(this.stateKey) });
        let userSongsFromPlaylists = await this.getSongsFromUserPlaylists(await this.getUserPlaylists())
        let artistsCountArray = this.countArtists(userSongsFromPlaylists);
        let topArtistsCountArray = this.returnTopArtists(artistsCountArray, 5),
          topArtistsCountArrayLength = topArtistsCountArray.length;

        let TopArtistsArray = [];
        for (let i = 0; i < topArtistsCountArrayLength; i++) {
          TopArtistsArray.push(await this.getArtist(topArtistsCountArray[i].artistID));
        }
        this.user.topArtists = TopArtistsArray;
        this.loadedStats = true;
      }
    }


  },
  methods: {
    async getSongsFromUserPlaylists (playlists) {
      let everySongArray = [];
      for (let playlist of playlists.items) {
        await this.$axios.$get(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
          headers: { Authorization: "Bearer " + this.access_token }
        }).then(resp => {
          for (let item of resp.items) {
            everySongArray.push(item.track)
          }
        })
      }
      //REMOVING DUPLICATES

      let duplicateFree = everySongArray.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);

      return duplicateFree
    },
    countArtists (array) {
      let dictionaryOfArtists = {};
      let arrayOfArtistsCount = [];
      let arrLength = array.length;

      //creates Dictionary of artists
      for (var i = 0; i < arrLength; i++) {
        var artistId = array[i].artists[0].id;
        dictionaryOfArtists[artistId] = dictionaryOfArtists[artistId] ? dictionaryOfArtists[artistId] + 1 : 1;
      }
      //Get keys (artists) from the dictionnary
      let keys = Object.keys(dictionaryOfArtists),
        dictionaryLength = keys.length;

      //Loop over dictionnary, and push artist + count in an array to sort it 
      for (let j = 0; j < dictionaryLength; j++) {
        let key = keys[j];
        let value = dictionaryOfArtists[key];
        arrayOfArtistsCount.push({ "artistID": key, "count": value })
      }

      return arrayOfArtistsCount
    },
    returnTopArtists (array, numberOfArtists) {
      return array.sort((a, b) => b.count - a.count).splice(0, numberOfArtists)
    },
    async getArtist (artistId) {
      let artist = {};
      await this.$axios.$get('https://api.spotify.com/v1/artists/' + artistId, {
        headers: { Authorization: "Bearer " + this.access_token }
      }).then(resp => artist = resp)
        .catch(e => console.log(e));
      console.log(artist)
      return artist

    },
    async getUserPlaylists () {
      let playlists = {};
      await this.$axios
        .$get("https://api.spotify.com/v1/me/playlists", {
          headers: { Authorization: "Bearer " + this.access_token }
        }).then(resp => playlists = resp)
        .catch(err => console.log(err))
      return playlists
    },
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
