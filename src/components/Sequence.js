import { createElement as h, ref, onUnmounted } from "@vue/composition-api";
import * as workerTimers from "worker-timers";

const withSeq = x => x.tag && x.tag.includes("sequence");

export default {
  props: {
    root: Boolean,
    duration: Number,
    id: String,
    autoplay: { type: Boolean, default: true },
    tag: { type: String, default: "div" }
  },
  setup(props, { slots, emit }) {
    if (!props.root) {
      return () => slots.default && h(props.tag, slots.default());
    }

    const count = ref(4);

    if (props.autoplay) {
      const id = workerTimers.setInterval(() => {
        count.value += 1;
      }, props.duration);
      onUnmounted(() => workerTimers.clearInterval(id));
    }

    emit("controls", {
      jump: v => {
        count.value += v;
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
