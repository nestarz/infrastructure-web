<template>
  <div class="home">
    <vue-map>
      <map-line
        v-if="parent && user"
        :from="[parent.latitude, parent.longitude]"
        :to="[user.longitude, user.latitude]"
        stroke="yellow"
      ></map-line>
      <template v-for="{longitude, latitude, hostname, address} in childs">
        <map-line
          :from="[parent.latitude, parent.longitude]"
          :to="[latitude, longitude]"
          :key="hostname"
          :stroke-width="1"
        ></map-line>
        <map-marker :coordinates="[latitude, longitude]" :key="address + Math.random()">
          <circle r="2" fill="yellow" />
        </map-marker>
      </template>
    </vue-map>
    <div class="game">
      <a-scene embedded vr-mode-ui="enabled: false">
        <a-assets>
        </a-assets>

        <a-entity id="duck1" position="1 0 -3">
          <a-box color="#fdfd96" scale="0.1 0.1 .1"></a-box>
          <a-animation
            attribute="rotation"
            to="0 -360 0"
            repeat="indefinite"
            fill="both"
            easing="linear"
            dur="30000"
          ></a-animation>
          <a-box color="#fdfd96" scale="0.1 0.1 .1" position="0 0 1">
            <a-animation
              attribute="rotation"
              to="0 360 0"
              easing="linear"
              dur="4000"
              begin="mouseenter"
            ></a-animation>
            <a-box
              color="#fdfd96"
              position="20 0 -10"
              change-color-on-hover="color: white"
              scale="2 3 3"
              collison-check="el: #otherduck; radius: 0.15; other-radius: 0.15;"
            ></a-box>
          </a-box>
        </a-entity>

        <a-entity id="duck2" position="-1.2 0 -3.3">
          <a-box color="#ca96fd" scale="0.1 0.1 .1"></a-box>
          <a-animation
            attribute="rotation"
            to="0 360 0"
            repeat="indefinite"
            fill="both"
            easing="linear"
            dur="40000"
          ></a-animation>
          <a-box color="#ca96fd" scale="0.1 0.1 .1" position="0 0 1">
            <a-animation
              attribute="rotation"
              to="0 360 0"
              easing="linear"
              fill="both"
              dur="4000"
              begin="mouseenter"
            ></a-animation>
            <a-box
              id="otherduck"
              color="#ca96fd"
              position="0 0 -15"
              change-color-on-hover="color: white"
              scale="3 3 2"
            ></a-box>
          </a-box>
        </a-entity>

        <a-entity
          id="sign"
          position="2.5 1 -3.5"
          rotation="0 -30 0"
          text="width: 4; align: center; color: black; value: Wifi spot"
        >
          <a-animation
            attribute="rotation"
            to="0 -390 0"
            easing="linear"
            dur="2000"
            begin="mouseenter"
          ></a-animation>
          <a-box color="#fed6fa" position="0 0 -0.05" scale="1.8 0.6 0.1"></a-box>
          <a-box color="#fed6fa" position="0 -0.7 -0.05" scale="0.1 1 0.1"></a-box>
        </a-entity>

        <a-entity
          id="score"
          position="-2.5 1 -2"
          rotation="0 45 0"
          text="width: 4; align: center; color: black; value: Score \n 000"
        >
          <a-animation
            attribute="rotation"
            to="0 405 0"
            easing="linear"
            fill="both"
            dur="800"
            begin="updateScore"
          ></a-animation>
          <a-box color="#fed6fa" position="0 0 -0.05" scale="0.8 0.6 0.1"></a-box>
          <a-box color="#fed6fa" position="0 -0.7 -0.05" scale="0.1 1 0.1"></a-box>
        </a-entity>

        <a-plane
          id="ground"
          position="0 -0.1 0"
          rotation="-90 0 0"
          width="60"
          height="60"
          color="#7BC8A4"
        ></a-plane>

        <a-entity id="pond" position="0 0 -5">
          <a-ocean
            scale="1.5 1.2 0.2"
            material="color: #000000"
            density="20"
            opacity="0.8"
            speed="0.1"
          ></a-ocean>
          <a-box position="0 0 -6" scale="15 0.6 1" material="color: #ccccc7"></a-box>
          <a-box position="0 0 6" scale="15 0.6 1" material="color: #ccccc7"></a-box>
          <a-box
            position="7.85 -0.16 0"
            scale="1 0.6 13"
            rotation=" 0 0 -22"
            material="color: #ccccc7"
          ></a-box>
          <a-box
            position="-7.85 -0.16 0"
            scale="1 0.6 13"
            rotation=" 0 0 22"
            material="color: #ccccc7"
          ></a-box>
        </a-entity>

        <a-camera position="0 0.2 1.3">
          <a-cursor></a-cursor>
        </a-camera>

        <a-sky id="background" src="#skyTexture" theta-length="91" radius="30"></a-sky>

        <a-entity light="type: ambient; color: #FFF; intensity: 0.6"></a-entity>
        <a-entity light="type: directional; color: #FFF; intensity: 0.8" position="-0.5 5 4"></a-entity>
      </a-scene>
    </div>
    <div class="panel">
      <h1>Your address is unknown, but I can locate you.</h1>
      <p>Geolocation is based on all signals your digital device can see.</p>
      <p>The signals are triangulated and matched with a "ground truth" that comes from GPS-enabled devices, mostly smartphones. In fact, every time you use a map service on your phone, it picks up the nearby wifi (and bluetooth) signals and records that info along with your GPS position, and sends it to Google or Apple depending on your device. The resulting databases are extremely valuable and are also used to more accurately locate devices that do have GPS, since GPS is slow, does not work indoors, gets errors when there are high buildings or mountains nearby, etc.</p>
      <h1>Where do you wanna go ?</h1>
      <select v-model="hostname">
        <option>https://www.nsa.gov/</option>
        <option>https://www.games.com/</option>
        <option>https://www.alexandermcqueen.com/</option>
      </select>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from "@vue/composition-api";

import world110m from "~/assets/json/world-110m.json";

import Papa from "papaparse";
import registarscsv from "~/assets/csv/registars.csv";

import useMapHostname from "~/utils/useMapHostname.js";

import "aframe";

export default {
  components: {
    VueMap: () => import("~/components/Map.vue")
  },
  setup() {
    const registars = ref(null);
    Papa.parse(registarscsv, {
      download: true,
      header: true,
      complete: results => (registars.value = results.data)
    });
    const icann = computed(() =>
      registars.value.find(({ initial }) => initial === "ICANN")
    );

    const hostname = ref(null);
    const { user, parent, childs } = useMapHostname(hostname);

    watch([user, parent, childs, hostname], () => {
      console.log("hostname", hostname.value);
      console.log("user", user.value);
      console.log("parent", parent.value);
      console.log("childs", childs.value);
    });

    return {
      hostname,
      user,
      parent,
      childs,
      registars,
      icann,
      config: ref({ scale: 340, rotate: [0, -20] }),
      projection: "geoEqualEarth",
      geoUrl: world110m
    };
  }
};
</script>

<style>
.home {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  height: 100vh;
  max-height: 100vh;
}

.panel {
  display: grid;
  justify-content: center;
  align-items: center;
  grid-auto-rows: min-content;
  align-self: center;
  padding: 2rem;
}
</style>