<template>
  <screens
    :chapter="1"
    :playing="playing"
    @play="controls.play"
    @jump="controls.jump"
  >
    <portal to="screen-1">
      <story-map name="screen-1-map" :rotate="true"></story-map>
      <portal-target name="screen-1-text" class="screen-1-text"></portal-target>
    </portal>
    <portal to="screen-1-text" class="title">
      <div class="title">Foundation</div>
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
      root
      :duration="duration"
      @controls="setControls"
      @playing="playing = true"
      @paused="playing = false"
      @ended="ended"
      :autoplay="autoplay"
    >
      <sequence>
        <portal to="screen-2-text"
          >First transatlantic telegraph cable, August 16, 1858</portal
        >
        <portal :to="x" v-for="x in ['screen-1-map', 'screen-2-map']" :key="x">
          <map-line
            :from="[
              transatlantic1[0].coordinates[1],
              transatlantic1[0].coordinates[0]
            ]"
            :to="[
              transatlantic1[1].coordinates[0],
              transatlantic1[1].coordinates[1]
            ]"
            :stroke-width="10"
            stroke="yellow"
          ></map-line>
        </portal>
        <portal to="screen-4-text">
          Wired transmission networks pre-dates the Internet.
          <mark>Telegraph</mark> was the first and contributed to build today's
          Internet infrastructure.
        </portal>
        <portal to="screen-3">
          <img src="/assets/images/R14P.jpg" />
        </portal>
      </sequence>
      <sequence>
        <portal to="screen-4-text"
          >Communications were made between poles through copper cables using
          Morse, the first <mark>Serial Protocol</mark>.</portal
        >
        <portal to="screen-2-text">Telegraph Network, 1901</portal>
        <portal to="screen-2-source"
          >https://en.wikipedia.org/wiki/File:1901_Eastern_Telegraph_cables.png</portal
        >
        <portal :to="x" v-for="x in ['screen-1-map', 'screen-2-map']" :key="x">
          <template v-for="(x, i) in telegraph1901">
            <map-line
              v-if="telegraph1901[i + 1]"
              :from="[x[0], x[1]]"
              :to="[telegraph1901[i + 1][0], telegraph1901[i + 1][1]]"
              :stroke-width="5"
              stroke="yellow"
              :key="x[0] + i"
            ></map-line>
          </template>
        </portal>
        <portal to="screen-3">
          <video
            autoplay
            controls
            src="/assets/video/AT&T Archives Hello, Europe.mp4"
          />
        </portal>
      </sequence>
      <sequence>
        <portal to="screen-4-text">
          At each pole,
          <mark>Switchboard Operators</mark> pointed communication to the right
          cable route.
        </portal>
        <portal to="screen-3">
          <video autoplay controls loop src="/assets/video/switch2.mp4" />
        </portal>
        <portal :to="x" v-for="x in ['screen-1-map', 'screen-2-map']" :key="x">
          <sequence
            root
            :duration="duration / telegraph1901.length"
            tag="g"
            :loop="true"
          >
            <sequence v-for="(x, i) in telegraph1901" :key="i" tag="g">
              <map-line
                v-if="telegraph1901[i + 1]"
                :from="[x[0], x[1]]"
                :to="[telegraph1901[i + 1][0], telegraph1901[i + 1][1]]"
                :stroke-width="10"
                stroke="yellow"
              ></map-line>
            </sequence>
          </sequence>
        </portal>
        <portal to="screen-2-text"
          >Communication Simulation using Telegraph Network</portal
        >
        <portal to="screen-2-source"
          >https://en.wikipedia.org/wiki/File:1901_Eastern_Telegraph_cables.png</portal
        >
      </sequence>
      <sequence>
        <portal to="screen-4-text">
          Users were attributed
          <strong>unique address numbers</strong> from local authorities.
        </portal>
      </sequence>
      <sequence>
        <portal to="screen-4-text">
          All addresses are listed in a single file,
          <strong>a phone book,</strong> to be used by operators, authorities
          and senders.
        </portal>
      </sequence>
      <sequence>
        <portal to="screen-4-text">
          Internet is a superset with
          <strong>new protocols and automation systems</strong> but share the
          same logic with wires, routing and address registries.
        </portal>
      </sequence>
      <sequence>
        <portal to="screen-4-text">
          <strong>Routers are Switchboard operators.</strong>
          They receive the same information, the message and the wanted
          destination. They both know the best route to transmit the
          communication and how.
        </portal>
      </sequence>
      <sequence>
        <portal to="screen-4-text">
          <strong>IP addresses are Phone addresses.</strong>
          An IP is unique in the world, and to preserve uniqueness, only ICANN
          give them. Uniquness is needed to reach destination without any other
          information than IP.
        </portal>
      </sequence>
      <sequence>
        <portal to="screen-4-text">
          <strong>Internet Registries are Phone book.</strong>
          Where phone books were only per countries, all registries in Internet
          are subset of a single registry, from ICANN. This unique phone book is
          used by operators to attribute to people available addresses.
        </portal>
      </sequence>
    </sequence>
  </screens>
</template>

<script>
import { watch, ref } from "@vue/composition-api";
import telegraph1901 from "~/assets/json/handmade_telegraph_1901.json";

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
      playing: ref(false),
      sequence,
      controls,
      duration: 1000,
      autoplay: false,
      setControls: value => (controls.value = value),
      ended: () => root._router.push({ path: "/chapter/2" }),
      telegraph1901: telegraph1901.features[0].geometry.coordinates,
      transatlantic1: [
        {
          name: "Foilhommerum Bay, Valentia Island, Ireland",
          coordinates: [51.892284, -10.390663]
        },
        {
          name: "Heart's Content, Newfoundland, Canada",
          coordinates: [-53.364028930664055, 47.871222774564146]
        }
      ],
      inventions: [
        {
          name: "Telegraph",
          date: "May 24, 1844",
          emitters: "Samuel F.B. Morse",
          connection: [
            [38.889248, -77.050636],
            [39.29038, -76.61219]
          ]
        },
        {
          name: "Telephone",
          date: "February 12, 1877",
          emitters: "Graham Bell",
          connection: [
            [42.361145, -71.057083],
            [42.519539, -70.896713]
          ]
        },
        {
          // Traffic Cop, Moon, ...
          name: "Internet",
          date: "October 29, 1969",
          emitters: "Leonard Kleinrock",
          connection: [[37.452961, -122.181725], [34.06999972 - 118.439789907]]
        }
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

video {
  height: 100%;
  width: 100%;
  background: var(--primary);
}

.screen-1-text {
  display: grid;
  grid-template-columns: 0fr 1fr;
  grid-gap: 1rem;
}

.title {
  writing-mode: vertical-lr;
  font-weight: bold;
  grid-row: span 2;
  transform: rotate(180deg);
}

.screen-4-text {
  font-size: 2em;
}

@keyframes color {
  0% {
    color: yellow;
  }
  90% {
    color: yellow;
  }
  100% {
    color: inherit;
  }
}

mark {
  animation: color 2s linear;
}
</style>
