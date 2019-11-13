<template>
  <div class="home">
    <main>
      <portal-target name="screen-1" tag="section" class="screen screen-1" multiple></portal-target>
      <portal-target name="screen-2" tag="section" class="screen screen-2" multiple></portal-target>
      <portal-target name="screen-3" tag="section" class="screen screen-3" multiple></portal-target>
      <portal-target name="screen-4" tag="section" class="screen screen-4" multiple></portal-target>
    </main>
    <nav>
      <ul>
        <router-link :to="`/chapter/${chapter - 1}`">{{ chapter - 1}}</router-link>
        <li @click="toggle">{{ play ? 'Pause' : 'Play' }}</li>
        <router-link :to="`/chapter/${chapter + 1}`">{{ chapter + 1}}</router-link>
      </ul>
    </nav>
    <footer v-for="x in 2" :key="x">
      <span v-for="y in (3-x)*9" :key="y">{{ title }}</span>
    </footer>
    <slot />
  </div>
</template>

<script>
import { ref, watch } from "@vue/composition-api";

export default {
  props: {
    chapter: { type: Number, required: true }
  },
  setup(props, { emit }) {
    const play = ref(true);
    watch(play, () => emit("play", play.value));
    return {
      title: "opt-out the yellow pages",
      toggle: () => (play.value = !play.value),
      play
    };
  }
};
</script>

<style>
main {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: minmax(45vh, 1fr);
  min-height: 100vh;
}

@media (min-width: 900px) {
  main {
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 1fr;
    height: 100vh;
  }
}

section {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
}

section:nth-of-type(1) {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1.5fr 1fr;
}

.map-title {
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-weight: bold;
  background: var(--background);
}

.screen-text {
  flex: 1;
  padding: 5rem;
}

@media (min-width: 900px) {
  section:nth-of-type(1) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
  }
}

nav {
  position: fixed;
  display: flex;
  pointer-events: none;
  justify-content: center;
  align-items: center;
  inset: 0;
  z-index: 999;
}

nav ul {
  opacity: 0;
  cursor: pointer;
  pointer-events: all;
  display: flex;
  justify-content: center;
  height: min-content;
}

nav ul:hover {
  opacity: 1;
}

nav li,
nav a {
  list-style: none;
  margin: 1rem;
  padding: 1rem;
  border: 1px solid;
  background: var(--background);
  min-width: 4em;
  text-align: center;
}

footer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  pointer-events: none;
  font-size: 1rem;
}

footer:last-of-type {
  writing-mode: vertical-rl;
}

footer span {
  margin-right: 1rem;
}

@media (min-width: 900px) {
  footer {
    justify-content: center;
    align-items: center;
  }
}
</style>