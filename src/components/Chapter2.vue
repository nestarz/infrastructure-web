<template>
  <div class="story">
    <h1 v-refs:sequence>What if you could be called by another name ?</h1>
    <h1 v-refs:sequence>Name let's other identify you, it is a virtual persona.</h1>
    <h1 v-refs:sequence>If you use another name's person, this name will be used to judge your activities.</h1>
    <portal-target to="video-holder">
      <video src="/assets/video/My Name Is Janez Janša (Trailer).mp4"/>
    </portal-target>
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
.story {
  display: flex;
  justify-content: center;
  align-items: center;
}

.story > * {
  opacity: 0;
  display: none;
}

p,
pre {
  max-width: 50em;
  font-size: 2em;
  max-width: 80%;
}

pre {
  font-size: 1.2em;
}

img {
  max-width: 100%;
}
</style>
