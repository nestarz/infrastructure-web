import { createElement as h, ref, computed } from "@vue/composition-api";
import useAnime from "~/utils/useAnime.js";

export default {
  props: {
    duration: Number,
    loop: Boolean
  },
  setup(props, { slots }) {
    const childs = ref([]);
    const childSequences = computed(() =>
      childs.value.filter(x => x.tag && x.tag.includes("sequence"))
    );
    const others = computed(() =>
      childs.value.filter(x => !x.tag || !x.tag.includes("sequence"))
    );

    const { current, play, ended, jump } = useAnime({
      sequences: childSequences,
      duration: props.duration,
      loop: props.loop
    });

    const childSequencesActives = computed(() => {
      return childSequences.value[current.value];
    });

    const render = () => {
      childs.value = slots.default();
      return [...others.value, childSequencesActives.value];
    };

    return () => h("div", render());
  }
};
