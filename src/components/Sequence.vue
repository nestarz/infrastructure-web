<template>
  <div class="sequence portal-only">
    <template v-if="current">
      <slot />
    </template>
  </div>
</template>

<script>
export default {
  props: {
    duration: Number
  },
  setup() {
    return {
      current: false
    };
  }
};
</script>

<style>
.sequence.portal-only {
  display: none;
  opacity: 0;
}
</style>