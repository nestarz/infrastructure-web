import { ref, watch } from "@vue/composition-api";

const rotate = (arr, x) => arr.slice(x).concat(arr.slice(0, x));

export default ({ duration = 3000, loop = false }) => {
  console.log(duration);
  const sequences = ref([]);
  const current = ref(0);
  const play = ref(true);
  const stopped = ref(false);

  const animate = async () => {
    stopped.value = false;
    for (const [i, seq] of rotate(
      [...sequences.value.entries()],
      current.value || 0
    )) {
      current.value = i;
      seq.current = true;
      await new Promise(resolve => setTimeout(resolve, seq.duration || duration));
      if (!play.value) break;
      seq.current = false;
    }
    if (loop && play.value) animate();
    else stopped.value = true;
  };

  watch([sequences, play], () => {
    if (!sequences.value.length) return;
    if (play) animate();
  });

  return {
    sequences,
    current,
    play: (value) => play.value = value,
    stopped
  };
}

