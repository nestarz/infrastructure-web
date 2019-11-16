<template>
  <div class="home">
    <main>
      <portal-target
        name="screen-1"
        tag="section"
        class="screen screen-1"
        multiple
      ></portal-target>
      <portal-target
        name="screen-2"
        tag="section"
        class="screen screen-2"
        multiple
      ></portal-target>
      <portal-target
        name="screen-3"
        tag="section"
        class="screen screen-3"
        multiple
      ></portal-target>
      <portal-target
        name="screen-4"
        tag="section"
        class="screen screen-4"
        multiple
      ></portal-target>
    </main>
    <nav>
      <ul>
        <router-link :to="`/chapter/${chapter - 1}`"
          >Chapter {{ chapter - 1 }}</router-link
        >
        <div>
          <li @click="rewind">Rewind</li>
          <li @click="toggle">{{ playing ? "Pause" : "Play" }}</li>
          <li @click="forward">Forward</li>
        </div>
        <router-link :to="`/chapter/${chapter + 1}`"
          >Chapter {{ chapter + 1 }}</router-link
        >
      </ul>
    </nav>
    <footer v-for="x in 2" :key="x">
      <span v-for="y in (3 - x) * 9" :key="y">{{ title }}</span>
    </footer>
    <slot />
  </div>
</template>

<script>
import "aframe";
import { ref, watch } from "@vue/composition-api";

export default {
  props: {
    chapter: { type: Number, required: true },
    playing: Boolean
  },
  setup(props, { emit }) {
    return {
      title: "opt-out the yellow pages",
      toggle: () => emit("play", !props.playing),
      forward: () => emit("jump", +1),
      rewind: () => emit("jump", -1)
    };
  }
};
</script>

<style>
@keyframes fadein {
  from {
    transform: scale(2, 2);
  }
  to {
    transform: scale(1, 1);
  }
}

@keyframes opacity {
  0% {
    opacity: 0;
  }
  70% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

main {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: minmax(45vh, 1fr);
  min-height: 100vh;
  background: var(--background);
  color: var(--color);
  /* animation: opacity 10s linear; */
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

.map-source {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  font-weight: bold;
  background: var(--background);
  font-size: 10px;
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
  flex-wrap: wrap;
  pointer-events: none;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 999;
}

nav ul {
  opacity: 0;
  cursor: pointer;
  pointer-events: all;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: min-content;
  flex-direction: column;
  margin-left: -3rem;
}

nav ul:hover {
  opacity: 1;
}

nav li {
  min-width: 4em;
}

nav div {
  display: flex;
  flex-wrap: wrap;
}

nav li,
nav a {
  list-style: none;
  margin: 1rem;
  padding: 1rem;
  border: 1px solid;
  background: var(--background);
  text-align: center;
}

nav a {
  writing-mode: vertical-lr;
  width: min-content;
}

nav a:last-of-type {
  transform: rotate(180deg);
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
  /* animation: fadein 10s linear; */
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

.screen-1-text,
.screen-4-text {
  flex: 1;
  padding: 5rem;
}

video {
  height: 100%;
  width: 100%;
  background: var(--primary);
}

.screen-1-text {
  display: grid;
  grid-template-columns: 0fr 1fr;
  grid-gap: 1rem;
}

.title {
  writing-mode: vertical-lr;
  font-weight: bold;
  grid-row: span 2;
  transform: rotate(180deg);
}

.screen-4-text {
  font-size: 2em;
}

@keyframes color {
  0% {
    color: yellow;
  }
  90% {
    color: yellow;
  }
  100% {
    color: inherit;
  }
}

mark {
  animation: color 2s linear;
}
</style>