/* Local snapshot bootstrap — written for offline viewing of the saved page.
   Initializes the particle dot animation directly, without the WordPress +
   Elementor runtime that the saved snapshot can't re-run. */
(function () {
  "use strict";

  function initParticles() {
    if (typeof window.particlesJS !== "function") return false;

    // Remove the frozen canvas captured in the snapshot so it doesn't
    // linger behind the live one.
    document.querySelectorAll(".particles-js-canvas-el").forEach(function (c) {
      c.remove();
    });
    document
      .querySelectorAll(".lqd-particles-bg-wrap canvas")
      .forEach(function (c) {
        c.remove();
      });

    document.querySelectorAll(".has-particle-effect").forEach(function (el) {
      if (el.getAttribute("data-local-initialized")) return;
      el.setAttribute("data-local-initialized", "1");

      var id = el.id;
      if (!id) {
        id = "particle-" + Math.random().toString(36).slice(2, 11);
        el.id = id;
      }
      // Fresh canvas inside the widget itself (defensive: another save
      // might have captured one here).
      el.querySelectorAll("canvas").forEach(function (c) {
        c.remove();
      });

      var raw = el.getAttribute("data-particles-options");
      var opts;
      try {
        opts = raw ? JSON.parse(raw) : undefined;
      } catch (e) {
        opts = undefined;
      }
      window.particlesJS(id, opts);
    });
    return true;
  }

  function start() {
    var tries = 0;
    (function retry() {
      if (initParticles() || ++tries > 30) return;
      setTimeout(retry, 100);
    })();
  }

  if (document.readyState === "complete") {
    start();
  } else {
    window.addEventListener("load", start);
  }
})();
