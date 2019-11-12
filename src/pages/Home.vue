<template>
  <div>
    <div class="home">
      <story class="layer1" :class="{ dark }"></story>
      <div>
        <vue-map name="tor" projection="geoMercator" :scale="120"></vue-map>
      </div>
      <div></div>
      <div class="layer2" :class="{ dark }"></div>
    </div>
    <p class="overlay overlay1">
      <span v-for="x in 15" :key="x">opt-out the yellow pages</span>
    </p>
    <p class="overlay overlay2">
      <span v-for="x in 15" :key="x">opt-out the yellow pages</span>
    </p>
  </div>
</template>

<script>
import { ref } from "@vue/composition-api";

export default {
  components: {
    Story: () => import("~/components/Story.vue"),
    VueMap: () => import("~/components/Map.vue")
  },
  setup() {
    const dark = ref(false);
    return {
      dark
    };
  }
};
</script>

<style>
.home {
  display: grid;
  background: #d7d7d7;
  grid-gap: 0px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}

.home > * {
  background: var(--background);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  pointer-events: none;
}

.overlay2 {
  writing-mode: sideways-lr;
}

.overlay span {
  margin-right: 1rem;
}
</style>