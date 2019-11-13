import { ref, watch, computed } from "@vue/composition-api";

const rotate = (arr, x) => {
  const res = arr.slice(x).concat(arr.slice(0, x));
  return res;
};

const wait = (duration, play) =>
  new Promise(resolve => {
    const ended = ref(false);
    const timeout = setTimeout(() => {
      ended.value = true;
    }, duration);

    const stopWatch = watch(
      [ended, play],
      () => {
        if (ended.value || !play.value) {
          clearTimeout(timeout);
          stopWatch();
          resolve();
        }
      },
      { lazy: true }
    );
  });

export default ({ sequences, duration = 3000, loop = false }) => {
  const current = ref(0);
  const order = computed(() =>
    rotate([...sequences.value.entries()], current.value || 0)
  );

  const play = ref(true);
  const pause = ref(false);
  const jump = ref(0);
  const running = ref(false);

  let previous;
  const animate = async () => {
    if (running.value) {
      console.error("Can't launch another animation.");
    }

    running.value = true;
    for (const [i, sequence] of order.value) {
      if (previous) previous.display = false;
      current.value = i;
      sequence.display = true;
      previous = sequence;
      await wait(duration || sequence.duration, play);
      if (!play.value) {
        break;
      }
      sequence.display = false;
    }
    running.value = false;
    if (play.value && loop) {
      animate();
    } else {
      play.value = false;
    }
  };

  watch([sequences, play], () => {
    if (sequences.value.length && play.value && !running.value) {
      animate();
    }
  });

  let wasPlaying = false;
  watch(
    [jump, play],
    () => {
      if (!play.value && jump.value) {
        current.value = (current.value + jump.value) % sequences.value.length;
        setTimeout(() => {
          play.value = wasPlaying;
          pause.value = false;
        }, 1);
        jump.value = null;
      }
    },
    { lazy: true }
  );

  return {
    sequences,
    current,
    play: value => {
      play.value = value;
      pause.value = !value;
    },
    jump: value => {
      wasPlaying = play.value;
      play.value = false;
      pause.value = true;
      jump.value = value;
    },
    reset: () => {},
    ended: computed(() => !play.value && !pause.value)
  };
};
