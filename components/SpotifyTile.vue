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
            <p class="title">...tiles</p>
            <p class="subtitle">Bottom tile</p>
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
          <p class="title">Wide tile</p>
          <p class="subtitle">Aligned with the right tile</p>
          <div class="content">
            <!-- Content -->
          </div>
        </article>
      </div>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child notification is-success">
        <div class="content">
          <p class="title">Tall tile</p>
          <p class="subtitle">With even more content</p>
          <div class="content">
            <!-- Content -->
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {

  props: {
    user: {
      type: Object,
      required: true
    }
  },

}
</script>

<style>
</style>