<template>
  <div class="tile is-ancestor">
    <div class="tile is-vertical is-8">
      <div class="tile">
        <div class="tile is-parent is-vertical">
          <article class="tile is-child notification is-primary">
            <p class="title">Currently Playing</p>
            <div class="media is-align-items-center">
              <div class="media-left">
                <figure class="image is-48x48 ">
                  <img
                    :src="user.currentTrack.item.album.images[0].url"
                    alt="Placeholder image"
                    class="is-rounded"
                  >
                </figure>
              </div>
              <div class="media-content">
                <p class="subtitle is-clipped ">{{user.currentTrack.item.name}} by {{user.currentTrack.item.artists[0].name}} on {{user.currentTrack.item.album.name}}</p>
              </div>
            </div>
          </article>
          <article class="tile is-child notification is-warning">
            <p class="title">User profile</p>
            <p class="subtitle">Un petit plaisantin</p>
          </article>
        </div>
        <div class="tile is-parent">
          <article class="tile is-child notification is-info">
            <p class="title">{{user.display_name}}</p>
            <p class="subtitle">{{user.email}}</p>
            <figure class="image is-4by3">
              <img :src="user.images[0].url">
            </figure>
          </article>
        </div>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child notification is-danger">
          <p class="title">Your stats</p>
          <p class="subtitle">Top Artists</p>
          <div class="content">
            <div class="columns is-mobile is-multiline is-centered is-one-third-tablet">
              <div
                v-for="topArtist of user.topArtists"
                :key="topArtist.id"
                class="column is-half-mobile custom-style"
              >
                <figure class="image is-64x64 ">
                  <img
                    :src="topArtist.images[0].url"
                    alt="Placeholder image"
                    class="is-rounded"
                  >
                </figure>
                <p class="has-text-centered">{{topArtist.name}}</p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child notification is-success">
        <div class="content">
          <b-button
            v-if="!lyricsGenius"
            size="is-large"
            icon-left="text-box"
            class="is-primary"
            @click="searchLyricsGenius(user.currentTrack.item.artists[0].name,user.currentTrack.item.name)"
          >
            Get The Lyrics
          </b-button>
          <p class="title">Tall tile</p>
          <p class="subtitle">With even more content</p>
          <div class="content">
            <p v-if="lyricsGenius">{{lyricsGenius}}</p>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import { getLyrics } from 'genius-lyrics-api';
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      lyricsObject: null,
      lyricsGenius: null
    }

  },
  methods: {
    //TODO statistiques des genres dominants pour créer graphique
    GenresStats () {

    },
    //only provides a portion of the lyrics
    searchLyrics (artistName, songTitle) {
      this.$axios.$get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=json&q_track=${songTitle}&q_artist=${artistName}&apikey=${process.env.lyricsId}`)
        .then((resp) => this.lyricsObject = resp)
        .catch((err) => console.log(err));
    },
    searchLyricsGenius (artistName, songTitle) {
      const options = {
        apiKey: process.env.geniusToken,
        title: songTitle,
        artist: artistName,
        optimizeQuery: true
      };
      getLyrics(options).then((lyrics) => this.lyricsGenius = lyrics);

      //GETS SONG FROM GENIUS

      // this.$axios.$get(`https://cors-anywhere.herokuapp.com/http://api.genius.com/search?q=${encodeURI(songTitle + ' ' + artistName)}`, {
      //   headers: { Authorization: "Bearer " + process.env.geniusToken }
      // })
      //   .then((resp) => this.lyricsObjectGenius = resp.response.hits[0].result)
      //   .catch((err) => console.log(err));

    }
  }

}
</script>

<style>
.custom-style {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>