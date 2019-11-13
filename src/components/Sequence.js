import { createElement as h, ref, computed, watch } from "@vue/composition-api";
import useAnime from "~/utils/useAnime.js";

export default {
  props: {
    duration: Number,
    loop: Boolean
  },
  setup(props, { slots, emit }) {
    const childs = ref([]);
    const sequences = computed(() =>
      childs.value.filter(x => x.tag && x.tag.includes("sequence"))
    );
    const others = computed(() =>
      childs.value.filter(x => !x.tag || !x.tag.includes("sequence"))
    );
    const { current, play, ended, jump } = useAnime({
      sequences,
      duration: props.duration
    });
    emit("controls", { jump, play, current });
    watch(ended, () => ended.value && emit("ended", ended.value));
    const activeseq = computed(() => sequences.value[current.value]);
    const render = () => {
      childs.value = slots.default();
      return [...others.value, activeseq.value];
    };
    return () => h("div", render());
  }
};
