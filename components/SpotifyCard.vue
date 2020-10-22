<template>
  <div class="card">

    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <figure class="image is-48x48">
            <img
              :src="user.images[0].url"
              alt="Placeholder image"
            >
          </figure>
        </div>
        <div class="media-content">
          <p class="title is-4">{{user.display_name}}</p>
          <p class="subtitle is-6">{{user.email}}</p>
        </div>
      </div>

      <div class="content">
        {{user.followers.total}} followers seulement le gros loser.
      </div>
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