<template>
  <screens
    :chapter="2"
    :playing="playing"
    @play="controls.play"
    @jump="controls.jump"
    class="dark"
  >
    <portal to="screen-1">
      <!-- <story-map name="screen-1-map" :rotate="true"></story-map>
      <portal-target name="screen-1-text" class="screen-1-text"></portal-target> -->
      <packet-ar></packet-ar>
    </portal>
    <portal to="screen-1-text" class="title">
      <div class="title">Call me by your name</div>
    </portal>
    <portal to="screen-2">
      <story-map
        name="screen-2-map"
        projection="geoMercator"
        :scale="120"
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
      :duration="duration"
      @controls="setControls"
      @ended="ended"
      :autoplay="false"
    >
      <sequence>
        <portal to="screen-2-text"
          >First transatlantic telegraph cable, August 16, 1858</portal
        >
        <portal to="screen-4-text">
          How would you hide your conversations ?
          <mark>Dark networks</mark> like tor let you borrow another name to
          make conversations.
        </portal>
      </sequence>
    </sequence>
  </screens>
</template>

<script>
import { watch, ref } from "@vue/composition-api";

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

    return {
      playing: ref(false),
      sequence,
      controls,
      setControls: value => (controls.value = value),
      ended: () => null,
      duration: 10000,
      telegraph: []
    };
  }
};
</script>

<style scoped>
.aframe {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
