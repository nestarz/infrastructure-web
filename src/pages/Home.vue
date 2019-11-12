<template>
  <div class="home" :class="{ dark }">
    <vue-map></vue-map>
    <nav>
      <a href="#" @click="p = p - 1">{{ p - 1 }}</a>
      <span>The new age</span>
      <span>Chapter 1</span>
      <a href="#" @click="p = p + 1">{{ p + 1 }}</a>
    </nav>
    <div class="panel">
      <map-story v-if="p === 1"></map-story>
      <map-nodes @error="showError" v-if="p === 2"></map-nodes>
      <map-tld @error="showError" v-if="p === 3"></map-tld>
      <map-traceroute :hostname="hostname" @error="showError" v-if="p === 4"></map-traceroute>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/composition-api";

export default {
  components: {
    VueMap: () => import("~/components/Map.vue"),
    MapStory: () => import("~/components/MapStory.vue"),
    MapTraceroute: () => import("~/components/MapTraceroute.vue"),
    MapTld: () => import("~/components/MapTld.vue"),
    MapNodes: () => import("~/components/MapNodes.vue")
  },
  setup() {
    const hostname = ref(null);
    //create a synth and connect it to the master output (your speakers)
    const dark = ref(false);
    return {
      p: ref(null),
      dark,
      hostname,
      showError: error => {
        alert(error);
      }
    };
  }
};
</script>

<style>
.home {
  display: grid;
  grid-template-columns: 1fr 0fr 1fr;
  grid-gap: 3rem;
  padding: 0 3rem;
  height: 100vh;
  max-height: 100vh;
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
  font-size: 4rem;
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
  font-size: 1.4rem;
  font-size: 3rem;
}

nav span {
  writing-mode: sideways-lr;
}

nav a:focus {
  /* border: 1px solid;
  padding: 0.2rem 0.8rem; */
}

/* nav a:focus:after {
  position: absolute;
  content: "/";
  transform: scale(6, 0.3) translateX(-0.1rem);
} */
</style>