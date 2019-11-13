import { ref, watch } from "@vue/composition-api";

const rotate = (arr, x) => arr.slice(x).concat(arr.slice(0, x));

export default ({ duration = 3000, loop = false }) => {
  const sequences = ref([]);
  const current = ref(0);
  const play = ref(true);
  const jump = ref(null);
  const stopped = ref(false);

  const animate = async () => {
    stopped.value = false;
    for (const [i, seq] of rotate(
      [...sequences.value.entries()],
      current.value || 0
    )) {
      current.value = i;
      
      seq.current = true;
      await new Promise(resolve => {
        let end = false;
        const timeout = setTimeout(() => {
          end = true;
        }, seq.duration || duration);
        const interval = setInterval(() => {
          if (jump.value || end) {
            clearTimeout(timeout);
            clearInterval(interval);
            resolve();
          }
        }, 10);
      });
      if (!play.value && !jump.value) break;
      seq.current = false;

      if (jump.value) {
        console.log("jumped");
        jump.value = false;
        break;
      }
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
    play: value => {
      play.value = value;
    },
    jump: value => {
      jump.value = true;
      current.value += value;
      if(!play.value) {
        console.log(current.value);
        animate();
      }
    },
    stopped
  };
};
