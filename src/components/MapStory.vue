<template>
  <div class="story">
    <h1 v-refs:sequence>opt out the yellow pages</h1>
    <p
      v-refs:sequence
    >Before Internet, one mean to contact people in different places of the world was using the phone.</p>
    <div v-refs:sequence>
      <p>Each individuals were connected to each others by copper cables.</p>
      <portal to="map" tag="g" slim>
        <!-- carefull -->
        <template v-if="current === 2 || current === 3">
          <map-line :from="x[0]" :to="x[1]" stroke="red" v-for="x in randomLL" :key="x[0][0]"></map-line>
        </template>
      </portal>
    </div>
    <img
      src="https://www.thisiscolossal.com/wp-content/uploads/2014/09/tower-1.jpg"
      v-refs:sequence
    />
    <p v-refs:sequence>Connected to this wireframe, you were given a phone number.</p>
    <pre v-refs:sequence duration="1000">+336 20 40 62 67</pre>
    <pre v-refs:sequence duration="1000">+226 815 00 200</pre>
    <pre v-refs:sequence duration="1000">+1 47-73904011</pre>
    <pre v-refs:sequence duration="1000">+1 212 879 5500</pre>
    <p v-refs:sequence>This number or address is given by an authority, usually the state.</p>
    <p v-refs:sequence>And it is listed in a repertory, called the white pages.</p>
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/7/76/New_haven_directory_1878.jpg"
      v-refs:sequence
    />
    <div v-refs:sequence duration="3000" song="connection">
      <p>You could call people from Eindhoven to London in no time.</p>
      <portal to="map" tag="g" slim>
        <!-- carefull -->
        <template v-if="current === 12">
          <map-line :from="[-0.118092, 51.509865]" :to="[51.44083, 5.47778]" stroke="red"></map-line>
        </template>
      </portal>
    </div>
    <p v-refs:sequence>Internet use the same kind of network and system.</p>
    <p
      v-refs:sequence
    >Like the Phone System, it have the same notion of address, authorities and providers.</p>
    <p v-refs:sequence>19th Century Phones are Today's Computers</p>
    <p v-refs:sequence>Phone books are Registries</p>
    <pre v-refs:sequence>
; &lt;&lt;&gt;&gt; DiG 9.8.3-P1 &lt;&lt;&gt;&gt; airkoryo.com.kp.
;; global options: +cmd
;; Got answer:
;; -&gt;&gt;HEADER&lt;&lt;- opcode: QUERY, status: NOERROR, id: 33458
;; flags: qr rd ra; QUERY: 1, ANSWER: 6, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;airkoryo.com.kp.		IN	ANY

;; ANSWER SECTION:
airkoryo.com.kp.	21599	IN	A	175.45.176.69
airkoryo.com.kp.	21599	IN	SOA	ns1.airkoryo.com.kp. postmaster.airkoryo.com.kp. 2012042612 28800 7200 1209600 3600
airkoryo.com.kp.	21599	IN	NS	ns1.airkoryo.com.kp.
airkoryo.com.kp.	21599	IN	NS	ns2.airkoryo.com.kp.
airkoryo.com.kp.	21599	IN	MX	10 mail.airkoryo.com.kp.
airkoryo.com.kp.	21599	IN	TXT	&quot;vspf1 ipv4:175.45.176.70 -all&quot;

;; Query time: 302 msec
;; SERVER: 172.16.0.1#53(172.16.0.1)
;; WHEN: Mon Sep 19 22:49:39 2016
;; MSG SIZE  rcvd: 195

; &lt;&lt;&gt;&gt; DiG 9.8.3-P1 &lt;&lt;&gt;&gt; co.kp.
;; Got answer:
;; -&gt;&gt;HEADER&lt;&lt;- opcode: QUERY, status: NOERROR, id: 45384
;; flags: qr rd ra; QUERY: 1, ANSWER: 3, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;co.kp.				IN	ANY

;; ANSWER SECTION:
co.kp.			21599	IN	SOA	ns1.co.kp. root.co.kp. 2013082900 28800 86400 1209600 86400
co.kp.			21599	IN	NS	ns2.co.kp.
co.kp.			21599	IN	NS	ns1.co.kp.
    </pre>
    <p v-refs:sequence>Switchboard operators are DNS Servers</p>
    <div v-refs:sequence duration="5000">
      <video
        autoplay
        loop
        src="/assets/video/[Bell Telephone Switchboard Operators] (1940-1950 -).mp4"
      />
    </div>
    <p v-refs:sequence>and copper cables are ... copper cables</p>
  </div>
</template>

<script>
import anime from "animejs/lib/anime.es.js";
import { ref, watch, computed } from "@vue/composition-api";

import useSound from "~/utils/vue-sound.js";

const random = (from, to, fixed) =>
  (Math.random() * (to - from) + from).toFixed(fixed) * 1;

export default {
  setup() {
    const { play, stop } = useSound();
    const sequence = ref([]);
    const current = ref(null);

    const animate = async () => {
      const last = sequence.value.length - 1;
      for (const [i, elt] of sequence.value.entries()) {
        const getAttr = (attr, def) =>
          (elt.attributes[attr] && elt.attributes[attr].value) || def;
        current.value = i;

        await anime({
          targets: elt,
          opacity: 1,
          duration: getAttr("duration", 4000),
          direction: i === last && "alternate",
          begin: () => {
            elt.style.display = "block";
            const songName = getAttr("song");
            if (songName) play(songName);
          },
          complete: () => {
            elt.style.display = "none";
            stop();
          }
        }).finished;
      }

      animate();
    };

    watch(sequence, () => {
      if (!sequence.value.length) return;
      animate();
    });
    return {
      sequence,
      current,
      randomLL: [...Array(100).keys()].map(i => [
        [random(-180, 180, 3), random(-180, 180, 3)],
        [random(-180, 180, 3), random(-180, 180, 3)]
      ])
    };
  }
};
</script>

<style scoped>
.story > * {
  opacity: 0;
  display: none;
}

p,
pre {
  max-width: 50rem;
  font-size: 1.8rem;
}

pre {
  font-size: 1.2rem;
}

img {
  max-width: 100%;
}
</style>
