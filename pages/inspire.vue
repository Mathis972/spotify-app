<template>
  <section class="section">
    <h2 class="title is-3 has-text-grey">
      "Yen a sous le capot
      <transition
        name="up"
        appear
        @after-enter="show = true"
      >
        <b-icon
          icon="rocket"
          size="is-large"
        />

      </transition>"
      <h1 v-if="show">Sir</h1>
    </h2>
    <h3 class="subtitle is-6 has-text-grey">
      Author:
      <a>
        Moi
      </a>
    </h3>
  </section>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  }
}
</script>

<style>
.up-enter-active {
  transition: all 3s ease;
}
.up-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.up-enter, .up-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(100px);
  opacity: 0;
}
</style>
