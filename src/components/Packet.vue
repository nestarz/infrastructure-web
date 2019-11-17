<template>
  <div class="aframe">
    <face-track @canvases="v => (canvas = v[0])" class="tracker"></face-track>
    <a-scene embedded class="aframe" vr-mode-ui="enabled: false">
      <a-box position="0 1.58 -1.5" rotation="0 45 0" ref="box"></a-box>
    </a-scene>
  </div>
</template>

<script>
import "aframe";
import { ref, watch, onMounted } from "@vue/composition-api";
import requestAnimationFps from "~/utils/requestAnimationFps.js";

export default {
  components: {
    FaceTrack: () => import("~/components/Face.vue")
  },
  setup() {
    const box = ref(null);
    const canvas = ref(null);

    watch(canvas, () => {
      if (!canvas.value) return;
      console.log(canvas.value);
      const texture = new THREE.CanvasTexture(
        canvas.value.getContext("2d").canvas
      );
      box.value.object3D.children[0].material = new THREE.MeshBasicMaterial({
        map: texture
      });
    });

    onMounted(() =>
      requestAnimationFps(() => {
        box.value.object3D.rotateX(0.01);
        box.value.object3D.rotateY(0.005);
        box.value.object3D.rotateZ(0.005);
      }, 20)
    );
    return {
      box,
      canvas
    };
  }
};
</script>

<style scoped>
.tracker {
  opacity: 0;
  pointer-events: none;
}
</style>
