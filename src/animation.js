let animation = {
  doAnimation: function (callback, total, final) {
    let start;

    function step(t) {
      if (start === undefined) {
        start = t;
      }
      let elapsed = t - start;
      let ratio = elapsed / total;
      callback({ elapsed, total, ratio });

      if (elapsed < total) {
        window.requestAnimationFrame(step);
      } else {
        if (final) {
          final();
        }
      }
    }

    window.requestAnimationFrame(step);
  },

  animateElementStyle: function (id, attr, getValue, total, final) {
    let el = document.getElementById(id);
    let update = ({ ratio }) => {
      el.style[attr] = getValue(ratio);
    };

    animation.doAnimation(
      update,
      total,
      final
    );
  }
};

export {animation}