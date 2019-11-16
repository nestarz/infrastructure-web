<template>
  <div class="face">
    <web-cam ref="camera" :selectFirstDevice="true" @error="error"></web-cam>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import * as faceapi from "face-api.js";
import { WebCam } from "vue-web-cam";
import { ref, watch } from "@vue/composition-api";

function promiseTimeout(ms, promise) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(null), ms);
    promise.then(resolve).catch(reject);
  });
}

function videoDimensions(video) {
  var videoRatio = video.videoWidth / video.videoHeight;
  var width = video.offsetWidth,
    height = video.offsetHeight;
  var elementRatio = width / height;
  if (elementRatio > videoRatio) width = height * videoRatio;
  else height = width / videoRatio;
  return {
    width: width,
    height: height
  };
}

export default {
  components: {
    WebCam
  },
  props: {
    interval: { type: Number, default: 500 }
  },
  setup(props, { emit }) {
    const camera = ref(null);
    const canvas = ref(null);
    const run = async () => {
      const options = new faceapi.TinyFaceDetectorOptions({
        inputSize: 128,
        scoreThreshold: 0.3
      });

      const result = await promiseTimeout(
        1000,
        faceapi.detectAllFaces(camera.value.$el, options)
      );
      if (result) {
        const { width, height } = videoDimensions(camera.value.$el);
        canvas.value.width = width;
        canvas.value.height = height;
        const resizedResults = faceapi.resizeResults(result, { width, height });
        faceapi.draw.drawDetections(canvas.value, resizedResults);

        const canvases = await faceapi.extractFaces(
          camera.value.$el,
          resizedResults
        );
        emit("canvases", canvases);
      }

      setTimeout(run, props.interval);
    };

    watch([camera, canvas], () => {
      if (!camera.value || !canvas.value) return;
      faceapi.nets.tinyFaceDetector
        .loadFromUri("/assets/models/faceapi")
        .then(run);
    });
    return {
      camera,
      canvas,
      error: console.log
    };
  }
};
</script>

<style scoped>
video,
canvas {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
}
canvas {
  z-index: 2;
  margin-left: auto;
  margin-right: auto;
}
</style>
