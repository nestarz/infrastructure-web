import { createElement as h, ref, onUnmounted } from "@vue/composition-api";
import * as workerTimers from "worker-timers";

const withSeq = x => x.tag && x.tag.includes("sequence");

export default {
  props: {
    root: Boolean,
    duration: Number,
    id: String,
    start: { type: Number, default: 0 },
    autoplay: { type: Boolean, default: true },
    tag: { type: String, default: "div" },
    loop: { type: Boolean, default: false }
  },
  setup(props, { slots, emit }) {
    if (!props.root) {
      return () => slots.default && h(props.tag, slots.default());
    }

    const index = ref(props.start);

    let id;
    const clean = () => {
      if (typeof id === "number") workerTimers.clearInterval(id);
      emit("paused");
    };
    const animate = () => {
      if (id) {
        console.error("Already playing");
        return;
      }

      id = workerTimers.setInterval(() => {
        index.value += 1;
      }, props.duration);
      emit("playing");
    };

    if (props.autoplay) animate();
    onUnmounted(clean);

    emit("controls", {
      jump: v => {
        index.value += v;
      },
      play: v => {
        if (v && !id) animate();
        else clean();
      }
    });

    return () => {
      if (!slots.default) return null;

      const sequences = slots.default().filter(withSeq);
      const current = index.value % sequences.length;
      emit("current", current);

      if (!props.loop && current === sequences.length - 1) {
        clean();
        emit('ended');
      }
      return h(props.tag, [sequences[current]]);
    };
  }
};
