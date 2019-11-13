<template>
  <screens :chapter="1" @play="controls.play" @jump="controls.jump">
    <portal to="screen-1">
      <story-map name="screen-1-map" :rotate="true"></story-map>
      <portal-target name="screen-1-text" class="screen-text">
        <strong>Call me by your name</strong>
        <pre>Darknet(s) in the Network</pre>
      </portal-target>
    </portal>
    <portal to="screen-2">
      <story-map
        name="screen-2-map"
        projection="geoMercator"
        :scale="120"
      ></story-map>
      <portal-target name="screen-2-text" class="map-title"></portal-target>
    </portal>
    <portal to="screen-4">
      <portal-target name="screen-4-text" class="screen-text"></portal-target>
    </portal>
    <sequence
      :duration="duration"
      @controls="setControls"
      @ended="ended"
      :autoplay="false"
    >
      <sequence>
        <portal to="screen-4-text">
          Dark networks
          <i>(ie. Darknets)</i> are built upon internet ecosystem. They uses the
          sames addresses, routers, registries and cables.
        </portal>
        <portal to="screen-2-text"
          >Main Dark Networks operating on Internet as of 2019</portal
        >
      </sequence>
      <sequence>
        <portal to="screen-4-text">
          Darknets are meant to protect emitters identity during the travel of
          messages. The most used in November 2019, is
          <strong>tor</strong>.
        </portal>
      </sequence>
      <sequence>
        <portal to="screen-4-text">
          <sequence :duration="duration / 4">
            <sequence>Tor is based on relays.</sequence>
            <sequence
              >As the olympic game, the emitter give the message to relays until
              destination is reached.</sequence
            >
            <sequence
              >Recipient don't know who is the original emitter, and only know
              the last relay. Same for routers and opeerators, the information
              of the emitter is unknown.</sequence
            >
            <sequence
              >Relays are others users of the networks. At each connection, a
              new team of relay is found.</sequence
            >
          </sequence>
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
    StoryMap: () => import("~/components/Map.vue")
  },
  setup(props, { root }) {
    const sequence = ref(null);
    const controls = ref({ play: () => null, jump: () => null });

    return {
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
