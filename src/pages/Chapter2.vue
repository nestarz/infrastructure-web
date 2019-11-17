<template>
  <screens
    :chapter="2"
    :playing="playing"
    @play="controls.play"
    @jump="controls.jump"
    class="dark"
  >
    <portal to="screen-1">
      <portal-target name="screen-1-text" class="screen-1-text"></portal-target>
      <packet-ar class="packet-ar"></packet-ar>
    </portal>
    <portal to="screen-1-text" class="title">
      <div class="title">Your packet look</div>
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
      <portal-target
        name="screen-4-text"
        class="screen-4-text screen-text"
      ></portal-target>
    </portal>
    <sequence
      root
      :duration="duration"
      @controls="setControls"
      @playing="playing = true"
      @paused="playing = false"
      @ended="ended"
      :autoplay="autoplay"
    >
      <sequence>
        <sequence root :duration="duration / torCircuit.length">
          <template v-slot:default="{ current }">
            <sequence v-for="[x, y] in torCircuit" :key="x[0] + y[0]">
              <portal to="screen-2-text">1{{current}} Etablishing a tor circuit...</portal>
            </sequence>
            <sequence>
              <portal to="screen-2-text"> Tor circuit established...</portal>
            </sequence>
          </template>
        </sequence>
        <portal to="screen-2-map">
          <template v-for="{ ip, latitude, longitude } in nodes">
            <map-marker :coordinates="[longitude, latitude]" :key="ip">
              <rect :width="2" :height="2" fill="white" />
            </map-marker>
          </template>
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
        <portal to="screen-4-text">
          <mark>Dark networks</mark> like tor let you borrow names from
          volunteers disposing their identity.
        </portal>
        <portal to="screen-3">
          <img src="/assets/images/R14P.jpg" />
        </portal>
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
    const start = [5.47778, 51.44083];
    return {
      playing: ref(false),
      sequence,
      controls,
      duration: 10000,
      autoplay: false,
      setControls: value => (controls.value = value),
      ended: () => null, //root._router.push({ path: "/chapter/2" }),
      nodes,
      torCircuit: [
        [start, [5.47778 - 10, 51.44083 - 10]],
        [
          [5.47778 - 10, 51.44083 - 10],
          [5.47778 + 2, 51.44083 + 2]
        ],
        [
          [5.47778 + 20, 51.44083 + 20],
          [5.47778 + 30, 51.44083 + 30]
        ]
      ]
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
</style>
