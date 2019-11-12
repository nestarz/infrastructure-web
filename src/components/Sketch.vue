<template>
  <div>
    <vue-p5 v-on="{ setup, draw }"></vue-p5>
  </div>
</template>

<script>
export default {
  setup() {
    return {
      setup(sketch) {
        sketch.createCanvas(window.innerWidth, window.innerHeight);
        sketch.noCursor();

        sketch.colorMode(sketch.HSB, 360, 100, 100);
        sketch.rectMode(sketch.CENTER);
        sketch.noStroke();
      },
      draw(sketch) {
        sketch.background(sketch.mouseY / 2, 100, 100);

        sketch.fill(360 - sketch.mouseY / 2, 100, 100);
        sketch.rect(360, 360, sketch.mouseX + 1, sketch.mouseX + 1);
      }
    };
  }
};
</script>

<style>
</style>