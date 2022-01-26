export function getAnimation(callback, total, final) {
  let start;

  function step(t) {
    if (start === undefined) {
      start = t;
    }
    let elapsed = t - start;
    callback(elapsed, total);

    if (elapsed < total) {
      window.requestAnimationFrame(step);
    } else {
      if (final) {
        final();
      }
    }
  }

  window.requestAnimationFrame(step);
}
