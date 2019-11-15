<template>
  <div>
    <sequence root :duration="x" id="root">
      <sequence>LOL</sequence>
      <sequence root :duration="x / 10" id="count">
        <sequence>OK</sequence>
        <sequence>MDR</sequence>
        <sequence>MDR1</sequence>
        <sequence>MDR2</sequence>
        <sequence>MDR3</sequence>
      </sequence>
    </sequence>
  </div>
</template>

<script>
import { watch, ref } from "@vue/composition-api";

export default {
  components: {
    Sequence: () => import("~/components/Sequence.js")
  },
  setup() {
    const controls = ref(null);
    return {
      x: 1000,
      controls,
      setcontrols: value => (controls.value = value)
    };
  }
};
</script>

<style>
div {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
