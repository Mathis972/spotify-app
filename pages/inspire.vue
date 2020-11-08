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
    <b-button @click="increment">+</b-button>
    <b-button @click="decrement">-</b-button>
    <!-- <transition-group
      name="up"
      tag="div"
    > -->
    <div
      v-for="(image, index) in images"
      :key="image.src"
      style=" width: 400px"
    >
      <transition name="slider">
        <div
          v-show="index === currIndex"
          style="width: 400px"
        >
          <img :src="require(`~/assets/${image.src}`)">
          <h2 style="text-align: center">{{image.text}}</h2>
        </div>
      </transition>

    </div>
    <!-- </transition-group> -->

  </section>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      show: false,
      currIndex: 0,
      images: [
        { src: 'reading-corner-colour-400px.png', text: "une Bonne Lecture (faux)" },
        { src: "gameboy-colour-400px.png", text: "Les Jeux Vidéos" },
        { src: "drawkit-support-man-colour-400px.png", text: "Coder :O" },
      ]
    }
  },
  mounted () {
    this.modifyColor("#CC5A71");
    console.log(this.images[0].src)
  },
  methods: {
    increment () {
      if (this.currIndex != this.images.length - 1) {
        this.currIndex += 1;

      } else {
        this.currIndex = 0;
      }

    },
    decrement () {
      if (this.currIndex != 0) {
        this.currIndex -= 1;
        console.log(this.currIndex)
      } else {
        this.currIndex = this.images.length - 1;
      }
    },
    ...mapMutations({ modifyColor: 'color/modify' }),
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
.slider-enter-active {
  transition: all 2s ease;
}
.slider-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slider-enter, .slider-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(50px);
  opacity: 0;
}
</style>
