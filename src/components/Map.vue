<template>
  <map-composable :projection="projection" :projection-config="config" :canvas="false" class="map">
    <map-graticule fill="transparent" stroke="var(--color)" :stroke-width="1"></map-graticule>
    <map-sphere stroke="var(--color)" :stroke-width="2"></map-sphere>
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
    <portal-target :name="name" tag="g" multiple></portal-target>
  </map-composable>
</template>

<script>
import { ref, computed, watch, reactive } from "@vue/composition-api";
import world110m from "~/assets/json/world-110m.json";

import requestAnimationFps from "~/utils/requestAnimationFps.js";

export default {
  props: {
    projection: { type: String, default: "geoOrthographic" },
    name: String,
    rotate: Boolean,
    scale: { type: Number, default: 80 }
  },
  setup(props) {
    const rotate = reactive({
      x: 0,
      y: 0
    });
    const config = computed(() => ({
      rotate: [rotate.x, rotate.y - 30],
      scale: props.scale
    }));
    const animate = () => {
      rotate.x = rotate.x + 0.4;
      // rotate.y = rotate.y - 0.1;
    };
    props.rotate && requestAnimationFps(animate, 6);
    return {
      config,
      geoUrl: world110m
    };
  }
};
</script>