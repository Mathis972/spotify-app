<template>
  <div>
    <nav
      class="navbar header has-shadow"
      :style="{background :this.$store.state.color.primary}"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <a
          class="navbar-item"
          href="/"
        >
          <img
            src="~assets/buefy.png"
            alt="Buefy"
            height="28"
          >
        </a>

        <div class="navbar-burger">
          <span />
          <span />
          <span />
        </div>
      </div>
    </nav>

    <section class="main-content columns">
      <aside class="column is-2 section">
        <p class="menu-label is-hidden-touch">
          General
        </p>
        <ul class="menu-list">
          <li
            v-for="(item, key) of items"
            :key="key"
          >
            <nuxt-link
              :to="item.to"
              exact-active-class="active"
              :style="cssClass"
            >
              <b-icon :icon="item.icon" /> {{ item.title }}
            </nuxt-link>
          </li>
        </ul>
      </aside>

      <div class="container column is-10">
        <nuxt />
      </div>
    </section>
  </div>
</template>

<script>
export default {

  data () {
    return {
      items: [
        {
          title: "Home",
          icon: "home",
          to: { name: "index" }
        },
        {
          title: "Inspire",
          icon: "lightbulb",
          to: { name: "inspire" }
        },
        {
          title: "Spotify",
          icon: "account-music",
          to: { name: "spotify" }
        }
      ]
    };
  },
  computed: {
    cssClass () {
      return {
        '--active-bg-color': this.$store.state.color.primary
      }
    }
  }
};
</script>
<style scoped>
.active {
  background-color: var(--active-bg-color) !important;
}
</style>
