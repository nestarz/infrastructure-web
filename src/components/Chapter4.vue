<template>
  <div>
    <portal :to="to" tag="g" slim v-for="to in ['map', 'tor']" :key="to">
      <map-line
        v-if="parent && user"
        :from="[parent.longitude, parent.latitude]"
        :to="[user.longitude, user.latitude]"
        stroke="yellow"
        :stroke-width="24"
      ></map-line>
      <template v-for="{longitude, latitude, hostname} in childs">
        <map-line
          :from="[parent.longitude, parent.latitude]"
          :to="[longitude, latitude]"
          :key="hostname + longitude"
          stroke="yellow"
        ></map-line>
        <map-marker
          :coordinates="[longitude, latitude]"
          :key="hostname + latitude"
          :r="2"
          fill="yellow"
        >
          <circle r="2" fill="yellow" />
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