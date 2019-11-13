<template>
  <div class="sequence portal-only" :class="order !== -1 && `sequence-${order}`">
    <template v-if="display">
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
      display: false,
      order: -1
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