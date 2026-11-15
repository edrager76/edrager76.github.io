// Slide shows of the DeskSlot site. Without this script all slides stand under each other (the HTML is complete);
// with it one slide at a time, with Previous and Next, the arrow keys (while the focus is in the slide show) and
// "Slide 2 of 4" in a live region for screen readers. No libraries, nothing from elsewhere.
(function () {
  "use strict";
  document.querySelectorAll("[data-slideshow]").forEach(function (show) {
    var slides = show.querySelectorAll(".slide");
    var nav = show.querySelector(".slide-nav");
    var prev = show.querySelector("[data-prev]");
    var next = show.querySelector("[data-next]");
    var status = show.querySelector(".slide-status");
    if (!slides.length || !nav || !prev || !next || !status) return;
    var current = 0;

    function show_(i, announce) {
      current = Math.max(0, Math.min(slides.length - 1, i));
      slides.forEach(function (s, n) {
        var on = n === current;
        s.classList.toggle("current", on);
        s.setAttribute("aria-hidden", on ? "false" : "true");
      });
      prev.disabled = current === 0;
      next.disabled = current === slides.length - 1;
      // The page starts with "Slide 1 of n" in the live region (written by the tool), so loading says nothing.
      if (announce) status.textContent = "Slide " + (current + 1) + " of " + slides.length;
      // A disabled button loses the focus; keep it in the slide show.
      if (announce && document.activeElement && document.activeElement.disabled) (current === 0 ? next : prev).focus();
    }

    show.classList.add("js");
    nav.hidden = false;
    prev.addEventListener("click", function () { show_(current - 1, true); });
    next.addEventListener("click", function () { show_(current + 1, true); });
    show.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { show_(current - 1, true); e.preventDefault(); }
      else if (e.key === "ArrowRight") { show_(current + 1, true); e.preventDefault(); }
    });
    show_(0, false);
  });
})();
