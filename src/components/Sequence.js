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
    tag: { type: String, default: "div" }
  },
  setup(props, { slots, emit }) {
    if (!props.root) {
      return () => slots.default && h(props.tag, slots.default());
    }

    const count = ref(props.start);

    let id;
    const clean = () => id && workerTimers.clearInterval(id);
    const animate = () => {
      if (id) {
        console.error("Already playing");
        return;
      }

      id = workerTimers.setInterval(() => {
        count.value += 1;
      }, props.duration);
    };
    if (props.autoplay) animate();

    onUnmounted(clean);
    emit("controls", {
      jump: v => {
        count.value += v;
      },
      play: v => {
        if (v && !id) animate();
        else clean();
      }
    });

    const render = () => {
      const sequences = slots.default().filter(withSeq);
      const elt = sequences[count.value % sequences.length];
      return [elt];
    };

    return () => slots.default && h(props.tag, render());
  }
};
