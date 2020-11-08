<template>
  <section class="section">
    <div class="columns is-mobile">
      <Card
        title="Free"
        icon="github"
      >
        Open source on <a href="https://github.com/buefy/buefy"> GitHub </a>
      </Card>

      <Card
        title="Responsive"
        icon="cellphone-link"
      >
        <b class="has-text-grey"> Every </b> component is responsive
      </Card>

      <Card
        title="Modern"
        icon="alert-decagram"
      >
        Built with <a href="https://vuejs.org/"> Vue.js </a> and
        <a href="http://bulma.io/"> Bulma </a>
      </Card>

      <Card
        title="Lightweight"
        icon="arrange-bring-to-front"
      >
        No other internal dependency
      </Card>
    </div>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
import Card from "~/components/Card";

export default {
  name: "HomePage",

  components: {
    Card
  },
  mounted () {
    this.modifyColor("#6FD08C");
  },
  methods: {
    ...mapMutations({ modifyColor: 'color/modify' }),
  }
};
</script>
