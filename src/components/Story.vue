<template>
  <div class="layer">
    <vue-map name="map" projection="geoOrthographic" :rotate="true"></vue-map>
    <nav>
      <a href="#" @click="p = p - 1">{{ p - 1 }}</a>
      <template v-if="p">
        <span>{{ stories[p].title }}</span>
        <span>Chapter {{ p }}</span>
      </template>
      <a href="#" @click="p = p + 1">{{ p + 1 }}</a>
    </nav>
    <div class="panel" v-if="p || p === 0">
      <component :is="stories[p].component"></component>
    </div>
  </div>
</template>


<script>
import { ref } from "@vue/composition-api";

export default {
  components: {
    VueMap: () => import("~/components/Map.vue"),
    Chapter1: () => import("~/components/Chapter1.vue"),
    Chapter2: () => import("~/components/Chapter2.vue"),
    Chapter3: () => import("~/components/Chapter3.vue"),
    Chapter4: () => import("~/components/Chapter4.vue")
  },
  setup() {
    const hostname = ref(null);
    const dark = ref(true);

    const stories = [
      { title: "Phone Analogy" },
      { title: "Internet own's phone book", component: "chapter1" },
      { title: "Call me by your name", component: "chapter2" },
      { title: "Call me by your best friend name", component: "chapter3" }
    ];
    return {
      p: ref(null),
      dark,
      hostname,
      stories,
      showError: error => {
        alert(error);
      }
    };
  }
};
</script>

<style>
.layer {
  display: grid;
  grid-template-columns: 1fr 0fr 1fr;
  grid-gap: 0rem;
  height: 50vh;
  font-size: 0.5rem;
}

.panel {
  display: grid;
  grid-auto-rows: min-content;
  align-content: center;
  justify-content: center;
  overflow: hidden;
  max-width: 50vw;
}

select {
  width: 100%;
}

svg text {
  font-size: 4em;
  background: var(--background);
}

.dark {
  --background: hsl(0, 0%, 0%);
  --color: green;

  background: var(--background);
  color: var(--color);
}

nav {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: 3em;
}

nav span {
  writing-mode: sideways-lr;
}
</style>