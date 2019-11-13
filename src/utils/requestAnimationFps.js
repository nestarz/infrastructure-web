export default function (fn, fps) {
  // Use var then = Date.now(); if you
  // don't care about targetting < IE9
  let then = new Date().getTime();

  // custom fps, otherwise fallback to 60
  fps = fps || 60;
  const interval = 1000 / fps;

  return (function loop(time) {
    requestAnimationFrame(loop);

    // again, Date.now() if it's available
    const now = new Date().getTime();
    const delta = now - then;

    if (delta > interval) {
      // Update time
      // now - (delta % interval) is an improvement over just
      // using then = now, which can end up lowering overall fps
      then = now - (delta % interval);

      // call the fn
      fn();
    }
  }(0));
}
