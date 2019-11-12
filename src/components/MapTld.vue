<template>
  <div>
    <portal to="map" tag="g" slim>
      <template v-for="{domain, latitude, longitude, type} in TLDs">
        <map-marker
          v-if="currentTLD"
          :coordinates="[longitude, latitude]"
          :key="domain"
          :r="currentTLD.domain === domain ? 24 : 1"
          :fill="colorType(type, domain, currentTLD)"
        >
          <circle
            :r="currentTLD.domain === domain ? 20 : 1"
            :fill="colorType(type, domain, currentTLD)"
          />
        </map-marker>
      </template>
      <map-line
        v-if="currentTLD"
        :from="[-118.419444, 33.976389]"
        :to="[currentTLD.longitude, currentTLD.latitude]"
        :stroke-width="12"
        :stroke="'red'"
      ></map-line>
    </portal>
    <pre v-if="currentTLD">{{ currentTLD.raw }}</pre>
    <!-- <ul>
      <li
        v-for="{domain} in TLDs"
        :key="domain"
        :class="{active: currentTLD.domain === domain}"
      >{{ domain }}</li>
    </ul>-->
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from "@vue/composition-api";

const randomProperty = function(obj) {
  const keys = Object.keys(obj);
  return obj[keys[(keys.length * Math.random()) << 0]];
};
import useSound from "~/utils/vue-sound.js";

export default {
  props: {
    hostname: String
  },
  setup(props, { emit }) {
    const typeByColor = {
      generic: "blue",
      sponsored: "yellow",
      "country-code": "red"
    };
    const TLDs = ref(null);
    const currentTLD = ref(null);
    fetch("/assets/json/tlds.json")
      .then(r => r.json())
      .then(data =>
        Object.keys(data)
          .filter(key => data[key].geo && data[key].geo.length)
          .filter(key => data[key].Type === "country-code")
          .map(key => {
            return {
              domain: key,
              type: data[key].Type,
              latitude: data[key].geo[0].latitude,
              longitude: data[key].geo[0].longitude,
              raw: data[key].__raw
            };
          })
      )
      .then(data => (TLDs.value = data.slice(0, 10)))
      // .then(() => [...Array(2340).keys()].forEach(i => clearInterval(i))) // hack
      .then(() => {
        const randomize = () =>
          (currentTLD.value =
            TLDs.value[Math.floor(TLDs.value.length * Math.random())]);
        randomize();
        setInterval(() => randomize(), 2500);
      });

    const { play } = useSound();
    watch(currentTLD, () => {
      play();
    });

    return {
      currentTLD,
      TLDs,
      colorType: (type, domain, current) => {
        if (current && current.domain) {
          return current.domain === domain ? "red" : "white";
        }
        return typeByColor[type] || "black";
      }
    };
  }
};
</script>

<style scoped>
pre {
  width: 100%;
  max-width: 66rem;
  overflow: hidden;
  font-size: 1rem;
  text-align: left;
}
ul {
  columns: 3;
}
li {
  font-size: 5px;
  list-style: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
li.active {
  font-size: 40px;
}
</style>