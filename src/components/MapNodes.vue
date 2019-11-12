<template>
  <div>
    <portal to="map" tag="g" slim>
      <template v-for="{ip, latitude, longitude} in nodes">
        <map-marker :coordinates="[longitude, latitude]" :key="ip" :r="1" fill="yellow"></map-marker>
      </template>
      <map-line
        v-if="node1 && node2"
        :from="[node1.longitude, node1.latitude]"
        :to="[node2.longitude, node2.latitude]"
        :stroke-width="12"
        :stroke="'red'"
      ></map-line>
    </portal>
    <ul>
      <li
        v-for="{ip} in nodes"
        :key="ip"
        :class="{active: node1 && node2 && (node1.ip === ip || node2.ip === ip)}"
      >{{ ip }}</li>
    </ul>
  </div>
</template>

<script>
import {
  ref,
  computed,
  watch,
  onMounted,
  onUnmounted
} from "@vue/composition-api";

import raw from "/assets/json/nodes.json";
import useSound from "~/utils/vue-sound.js";

export default {
  setup(props, { emit }) {
    const { play } = useSound();
    const nodes = ref(
      raw
        .filter(value => value)
        .map(value => {
          return {
            ip: value.ip,
            latitude: value.latitude,
            longitude: value.longitude
          };
        })
        .slice(0, 100)
    );
    const node1 = ref(null);
    const node2 = ref(null);

    const id = setInterval(() => {
      if (!nodes.value) return;

      node2.value = node1.value;
      node1.value = nodes.value[Math.floor(nodes.value.length * Math.random())];
      play();
    }, 200);
    onUnmounted(() => clearInterval(id));
    return {
      nodes,
      node1,
      node2
    };
  }
};
</script>

<style scoped>
ul {
  columns: 5;
}
li {
  font-size: 5px;
  list-style: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
li.active {
  font-size: 10px;
}
</style>