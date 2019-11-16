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
          <mark>Switchboard Operators</mark>, or Hello Girls, pointed
          communication to the right cable route.
        </portal>
        <portal to="screen-3">
          <video autoplay controls loop src="/assets/video/switch2.mp4" />
        </portal>
        <portal :to="x" v-for="x in ['screen-1-map', 'screen-2-map']" :key="x">
          <sequence
            root
            :duration="duration / (telegraphSim.length * 7)"
            tag="g"
            :loop="true"
          >
            <sequence v-for="(x, i) in telegraphSim" :key="i" tag="g">
              <map-line
                v-if="telegraphSim[i + 1]"
                :from="[x[0], x[1]]"
                :to="[telegraphSim[i + 1][0], telegraphSim[i + 1][1]]"
                :stroke-width="10"
                stroke="yellow"
              ></map-line>
            </sequence>
          </sequence>
        </portal>
        <portal to="screen-2-text"
          >Communication Simulation using Telephone Network</portal
        >
      </sequence>
      <sequence>
        <portal to="screen-4-text">
          <mark>Telephone numbers</mark> are addresses linking your device and
          your identity. They are attributed by authorized companies.
        </portal>
      </sequence>
      <sequence>
        <portal :to="x" v-for="x in ['screen-1-map', 'screen-2-map']" :key="x">
          <sequence
            root
            :duration="duration / (tlds.length / 100)"
            tag="g"
            :loop="true"
          >
            <sequence
              v-for="{ name, longitude, latitude } in tlds"
              :key="name"
              tag="g"
            >
              <map-annotation
                :subject="[longitude, latitude]"
                :dx="25"
                :dy="25"
              >
                <text :x="-8">{{ name }}</text>
              </map-annotation>
              <map-marker :coordinates="[longitude, latitude]">
                <circle :r="10" fill="yellow" />
              </map-marker>
            </sequence>
          </sequence>
        </portal>
        <portal to="screen-2-text"
          >Domain names registries</portal
        >
        <portal to="screen-4-text">
          White and <mark>Yellow pages</mark> are directories listing phone
          numbers resolving to the identity of the line holder.
        </portal>
      </sequence>
      <sequence>
        <portal to="screen-4-text">
          Internet share the same logic with
          <mark>wires, routing and address registries</mark>.
        </portal>
      </sequence>
      <sequence>
        <portal to="screen-3">
          <img src="/assets/images/6780309.jpg" />
          <img src="/assets/images/ARPANET_first_router2.jpg" />
        </portal>
        <portal to="screen-4-text">
          <mark>Routers</mark> are <mark>Hello Girls</mark>. Both know the best
          route to transmit the communication, and how.
        </portal>
      </sequence>
      <sequence>
        <portal to="screen-4-text">
          <mark>IP addresses</mark> are <mark>Phone numbers</mark>. An IP is
          unique in the world, ICANN give ranges to countries, then attributed
          by companies.
        </portal>
      </sequence>
      <sequence>
        <portal to="screen-4-text">
          <mark>Internet Registries</mark> are <mark>Phone Book</mark>. All
          countries registries are subset of a single, root registry, owned by
          ICANN.
        </portal>
      </sequence>
      <sequence>
        <portal to="screen-4-text">
          IP being a name to your identity, every messages sent from this
          address makes you <mark>entitled</mark>.
        </portal>
      </sequence>
      <sequence>
        <portal to="screen-4-text">
          Todays Hello Girls, still listen to your conversation spying for
          <mark>intelligence agencies to white-hat hackers</mark>.
        </portal>
      </sequence>
    </sequence>
  </screens>
</template>

<script>
import { watch, ref } from "@vue/composition-api";
import telegraph1901 from "~/assets/json/handmade_telegraph_1901.json";
import tlds from "~/assets/json/tlds.json";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

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
      duration: 10000,
      autoplay: false,
      setControls: value => (controls.value = value),
      ended: () => null, //root._router.push({ path: "/chapter/2" }),
      tlds: Object.entries(tlds)
        .filter(([_, tld]) => tld.geo && tld.geo[0])
        .map(([name, tld]) => ({
          name,
          longitude: tld.geo[0].longitude,
          latitude: tld.geo[0].latitude
        }))
        .sort(() => 0.5 - Math.random()),
      telegraph1901: telegraph1901.features[0].geometry.coordinates,
      telegraphSim: telegraph1901.features[0].geometry.coordinates.slice(0, 15),
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
