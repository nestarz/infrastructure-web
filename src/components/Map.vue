<template>
  <map-composable :projection="projection" :projection-config="config" :canvas="false" class="map">
    <map-graticule fill="transparent" stroke="black" :stroke-width="1"></map-graticule>
    <map-sphere stroke="black" :stroke-width="2"></map-sphere>
    <map-geographies :geography="geoUrl">
      <template v-slot:default="{geographies}">
        <map-geography
          v-for="geo in geographies"
          :key="geo.rsmKey"
          :geography="geo"
          fill="var(--background)"
          stroke="var(--color)"
        ></map-geography>
      </template>
    </map-geographies>
    <portal-target name="map" tag="g" multiple></portal-target>
  </map-composable>
</template>

<script>
import { ref, computed, watch, reactive } from "@vue/composition-api";
import world110m from "~/assets/json/world-110m.json";

import requestAnimationFps from "~/utils/requestAnimationFps.js";

export default {
  setup() {
    const rotate = reactive({
      x: 0,
      y: 0
    });
    const config = computed(() => ({
      rotate: [rotate.x, rotate.y - 30],
      scale: 200
    }));
    const animate = () => {
      rotate.x = rotate.x + 0.1;
      // rotate.y = rotate.y - 0.1;
    };
    requestAnimationFps(animate, 20);
    return {
      config,
      projection: "geoOrthographic",
      geoUrl: world110m
    };
  }
};
</script>

<style scoped>
.map {
  max-height: 100vh;
}
</style>