<template>
  <sequence :duration="x" :loop="true">
    <sequence :duration="x/4">
      <sequence>HAHA</sequence>
      <sequence>PFF</sequence>
      <sequence>OK</sequence>
      <sequence>HH</sequence>
    </sequence>
    <sequence>APRES MOI</sequence>
  </sequence>
</template>

<script>
export default {
  components: {
    Sequence: () => import("~/components/Sequence.js")
  },
  setup() {
    return {
      x: 2000
    }
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
