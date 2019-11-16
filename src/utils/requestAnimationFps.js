export default function (fn, fps = 60) {
  let then = Date.now();

  const interval = 1000 / fps;

  return (function loop() {
    requestAnimationFrame(loop);

    const now = Date.now();
    const delta = now - then;

    if (delta > interval) {
      then = now - (delta % interval);

      fn();
    }
  }(0));
}
