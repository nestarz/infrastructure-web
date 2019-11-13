<template>
  <screens :chapter="2" @play="play">
    <portal to="screen-1">
      <story-map name="screen-1-map" :rotate="true"></story-map>
      <portal-target name="screen-1-text" class="screen-text">
        <strong>Call me by your name</strong>
        <pre>Darknet(s) in the Network</pre>
      </portal-target>
    </portal>
    <portal to="screen-2">
      <story-map name="screen-2-map" projection="geoMercator" :scale="120"></story-map>
      <portal-target name="screen-2-text" class="map-title"></portal-target>
    </portal>
    <portal to="screen-4">
      <portal-target name="screen-4-text" class="screen-text"></portal-target>
    </portal>
    <sequence v-refs:sequences to="screen-4-text">
      <portal to="screen-4-text">
        Dark networks
        <i>(ie. Darknets)</i> are built upon internet ecosystem. They uses the sames addresses, routers, registries and cables.
      </portal>
      <portal to="screen-2-text">Main Dark Networks operating on Internet as of 2019</portal>
    </sequence>
    <sequence v-refs:sequences to="screen-4-text">
      <portal to="screen-4-text">
        Darknets are meant to protect emitters identity during the travel of messages. The most used in November 2019, is
        <strong>tor</strong>.
      </portal>
    </sequence>
    <sequence v-refs:sequences to="screen-4-text">
      <portal to="screen-4-text">Tor is based on relays. As the olympic game, the emitter give the message to relays until destination is reached. The message is crypted at each relay and only the emitter know which relays have been used. Recipient don't know who is the original emitter, and only know the last relay. Same for routers and opeerators, the information of the emitter is unknown. Relays are others users of the networks. At each connection, a new team of relay is found.</portal>
    </sequence>
  </screens>
</template>

<script>
import useAnime from "~/utils/useAnime.js";
import { watch } from "@vue/composition-api";

export default {
  components: {
    Screens: () => import("~/components/Screens.vue"),
    Sequence: () => import("~/components/Sequence.vue"),
    StoryMap: () => import("~/components/Map.vue")
  },
  setup(props, { root }) {
    const { sequences, current, play, stopped } = useAnime({
      duration: 3000,
      loop: true
    });

    return {
      sequences,
      play
    };
  }
};
</script>