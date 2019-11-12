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
    const dark = ref(false);

    const stories = [
      {title: "Phone Analogy"},
      {title: "Internet own's phone book"},
      {title: "Call me by your name"},
      {title: "Call me by your best friend name"},
    ]
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
  grid-gap: 3rem;
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