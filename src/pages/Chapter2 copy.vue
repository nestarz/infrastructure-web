<template>
  <screens
    :chapter="2"
    :playing="playing"
    @play="controls.play"
    @jump="controls.jump"
    class="dark"
  >
    <portal to="screen-1">
      <!-- <story-map name="screen-1-map" :rotate="true"></story-map> -->
      <portal-target name="screen-1-text" class="screen-1-text"></portal-target>
      <packet-ar class="packet-ar"></packet-ar>
    </portal>
    <portal to="screen-3"> </portal>
    <portal to="screen-1-text" class="title">
      <!-- <div class="title">How your packet looks like ?</div> -->
      <div class="packet"></div>
      <div class="title">Your Packet Look</div>
    </portal>
    <portal to="screen-2">
      <story-map
        name="screen-2-map"
        projection="geoMercator"
        :scale="920"
        :rotation="[-20, -15]"
      ></story-map>
      <portal-target name="screen-2-text" class="map-title"></portal-target>
      <portal-target name="screen-2-source" class="map-source"></portal-target>
    </portal>
    <portal to="screen-4">
      <portal-target name="screen-4-text" class="screen-4-text screen-text">
      </portal-target>
    </portal>
    <sequence
      :duration="duration"
      @controls="setControls"
      @ended="ended"
      :autoplay="false"
    >
      <sequence>
        <portal to="screen-2-text"
          >Packet position in the exchange route</portal
        >
        <portal to="screen-4-text">
          <mark>Dark networks</mark> like tor let you borrow names from
          volunteers disposing their identity.
        </portal>
        <portal to="screen-2-map">
          <map-marker :coordinates="[5.47778, 51.44083]">
            <circle :r="10" fill="yellow" />
          </map-marker>
          <map-marker :coordinates="[28.94966, 41.01384]">
            <rect :width="20" :height="20" fill="yellow"></rect>
          </map-marker>
          <map-annotation :subject="[5.47778, 51.44083]" :dx="-5" :dy="15">
            <text>📦</text>
          </map-annotation>
        </portal>
        <portal :to="x" v-for="x in ['screen-3-map', 'screen-2-map']" :key="x">
          <template v-for="{ ip, latitude, longitude } in nodes">
            <map-marker :coordinates="[longitude, latitude]" :key="ip">
              <rect :width="2" :height="2" fill="white" />
            </map-marker>
          </template>
        </portal>
      </sequence>
      <sequence>
        <portal to="screen-2-text"
          >Packet position in the exchange route</portal
        >
        <portal to="screen-4-text"
          >Packet position in the exchange route</portal
        >
      </sequence>
    </sequence>
  </screens>
</template>

<script>
import { watch, ref, computed } from "@vue/composition-api";

export default {
  components: {
    Screens: () => import("~/components/Screens.vue"),
    Sequence: () => import("~/components/Sequence.js"),
    StoryMap: () => import("~/components/Map.vue"),
    PacketAr: () => import("~/components/Packet.vue")
  },
  setup(props, { root }) {
    const sequence = ref(null);
    const controls = ref({ play: () => null, jump: () => null });

    const nodes = ref([]);
    import("/assets/json/nodes.json").then(
      r => (nodes.value = r.filter(node => node).slice(2000, 2400))
    );
    return {
      playing: ref(false),
      sequence,
      controls,
      setControls: value => (controls.value = value),
      ended: () => null,
      nodes,
      duration: 10000,
      telegraph: []
    };
  }
};
</script>

<style scoped>
.packet-ar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.packet {
  height: 100%;
  /* width: 100%; */
}

pre {
  font-size: 80%;
  font-family: "CascadiaCode";
  /* writing-mode: vertical-lr;
  transform: rotate(180deg); */
}
</style>
