<template>
  <screens :chapter="1" @play="play" @jump="jump">
    <portal to="screen-1">
      <story-map name="screen-1-map" :rotate="true"></story-map>
      <portal-target name="screen-1-text" class="screen-1-text"></portal-target>
    </portal>
    <portal to="screen-1-text">
      <strong>Foundation</strong>
      <pre>Internet ∋ Telegraph</pre>
    </portal>
    <portal to="screen-2">
      <story-map
        name="screen-2-map"
        projection="geoMercator"
        :scale="120"
      ></story-map>
    </portal>
    <portal to="screen-4">
      <portal-target name="screen-4-text" class="screen-text"></portal-target>
    </portal>
    <sequence v-refs:sequences>
      <portal to="screen-4-text">
        <pre>
BI. (YEAR) BEFORE INTERNET
INTERNET BIRTH ~ October 29, 1969
        </pre>
      </portal>
      <portal to="screen-3">
        <img
          style="max-height: 100%"
          src="/assets/images/The White King in a Council with the Welsh Party, Receiving a... - The Metropolitan Museum of Art.jpg"
        />
      </portal>
    </sequence>
    <sequence v-refs:sequences>
      <portal to="screen-4-text"
        >As the first electrical telecommunications system, the Telegraph and
        the Telephone, have a lot in common with today's Internet.</portal
      >
      <portal to="screen-3">
        <img
          style="max-height: 100%"
          src="/assets/images/The White King in a Council with the Welsh Party, Receiving a... - The Metropolitan Museum of Art.jpg"
        />
      </portal>
      <portal to="screen-2-map">
        <template v-for="x in telegraph">
          <map-line :from="x" :to="x" stroke="red" :key="x[0]"></map-line>
        </template>
      </portal>
    </sequence>
    <sequence v-refs:sequences>
      <portal to="screen-4-text"
        >Communications were made between poles trough copper cables and
        wires.</portal
      >
    </sequence>
    <sequence v-refs:sequences>
      <portal to="screen-4-text">
        At each pole,
        <strong>switchboard operators</strong> pointed communication to the
        right cable route.
      </portal>
    </sequence>
    <sequence v-refs:sequences>
      <portal to="screen-4-text">
        Users were attributed
        <strong>unique address numbers</strong> from local authorities.
      </portal>
    </sequence>
    <sequence v-refs:sequences>
      <portal to="screen-4-text">
        All addresses are listed in a single file,
        <strong>a phone book,</strong> to be used by operators, authorities and
        senders.
      </portal>
    </sequence>
    <sequence v-refs:sequences>
      <portal to="screen-4-text">
        Internet is a superset with
        <strong>new protocols and automation systems</strong> but share the same
        logic with wires, routing and address registries.
      </portal>
    </sequence>
    <sequence v-refs:sequences>
      <portal to="screen-4-text">
        <strong>Routers are Switchboard operators.</strong>
        They receive the same information, the message and the wanted
        destination. They both know the best route to transmit the communication
        and how.
      </portal>
    </sequence>
    <sequence v-refs:sequences>
      <portal to="screen-4-text">
        <strong>IP addresses are Phone addresses.</strong>
        An IP is unique in the world, and to preserve uniqueness, only ICANN
        give them. Uniquness is needed to reach destination without any other
        information than IP.
      </portal>
    </sequence>
    <sequence v-refs:sequences>
      <portal to="screen-4-text">
        <strong>Internet Registries are Phone book.</strong>
        Where phone books were only per countries, all registries in Internet
        are subset of a single registry, from ICANN. This unique phone book is
        used by operators to attribute to people available addresses.
      </portal>
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
    const { sequences, current, play, stopped, jump } = useAnime({
      duration: 3000,
      loop: true
    });
    // watch(
    //   stopped,
    //   () => stopped.value && root._router.push({ path: "/chapter/2" })
    // );

    return {
      sequences,
      play,
      jump,
      telegraph: [
        [2.074458, 47.795445],
        [10.683946, 51.217896],
        [40.540523, -5.350239]
      ]
    };
  }
};
</script>

<style>
.screen-1-text,
.screen-4-text {
  flex: 1;
  padding: 5rem;
}
</style>
