<template>
  <div>
    <portal to="map" tag="g" slim v-if="!error">
      <map-line
        v-if="parent && user"
        :from="[parent.longitude, parent.latitude]"
        :to="[user.longitude, user.latitude]"
        stroke="red"
        :stroke-width="24"
      ></map-line>
      <template v-for="{longitude, latitude, hostname} in childs">
        <map-line
          :from="[parent.longitude, parent.latitude]"
          :to="[longitude, latitude]"
          :key="hostname + longitude"
          stroke="red"
        ></map-line>
        <map-marker
          :coordinates="[longitude, latitude]"
          :key="hostname + latitude"
          :r="2"
          fill="red"
        >
          <circle r="2" fill="red" />
        </map-marker>
      </template>
    </portal>
    <select v-model="hostname">
      <option>https://www.nsa.gov/</option>
      <option>https://www.alexandermcqueen.com/</option>
      <option>https://www.japan.go.jp/</option>
      <option>https://www.elysee.fr/</option>
      <option>https://www.designacademy.nl/</option>
    </select>
  </div>
</template>

<script>
import { ref, computed, watch } from "@vue/composition-api";
import useMapHostname from "~/utils/useMapHostname.js";

export default {
  props: {
    hostname: String
  },
  setup(props, { emit }) {
    const hostname = computed(() => props.hostname);
    const { user, parent, childs, error } = useMapHostname(hostname);
    watch(error, () => error.value && emit("error", error.value));

    return {
      user,
      parent,
      childs,
      error
    };
  }
};
</script>