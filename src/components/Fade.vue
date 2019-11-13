<template>
  <div ref="animated" class="animated">
    <slot />
  </div>
</template>

<script>
import anime from "animejs";
import { onMounted, watch, ref } from "@vue/composition-api";
export default {
  props: {
    current: Number
  },
  setup(props, { slots }) {
    const animated = ref(null);
    watch([() => props.current, animated], () => {
      anime.remove(animated.value);
      anime({
        targets: animated.value,
        opacity: [0, 1],
        duration: 2000,
        direction: "alternate",
        easing: 'easeOutExpo'
      });
    });
    return {
      animated
    };
  }
};
</script>

<style>
.animated {
  opacity: 0;
}
</style>