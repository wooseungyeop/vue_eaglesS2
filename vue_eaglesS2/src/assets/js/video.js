setTimeout(function () {
  document.getElementById("btnfadeIn").classList.add("fade-out");
}, 31200);

document.addEventListener("DOMContentLoaded", function () {
  var div = document.querySelector(".back_Box_All");

  // fadeIn effect
  div.style.opacity = 0;
  div.style.display = "block";
  var fadeEffect = setInterval(function () {
    if (!div.style.opacity) {
      div.style.opacity = 0;
    }
    if (parseFloat(div.style.opacity) < 1) {
      div.style.opacity = (parseFloat(div.style.opacity) + 0.1).toString();
    } else {
      clearInterval(fadeEffect);

      // animate effect
      div.style.position = "relative";
      var start = null;
      var initialTop = div.offsetTop;
      var finalTop = 150;

      function animateTop(timestamp) {
        if (!start) start = timestamp;
        var progress = timestamp - start;
        var position =
          Math.min(progress / 1000, 1) * (finalTop - initialTop) + initialTop;
        div.style.top = position + "px";
        if (progress < 1000) {
          requestAnimationFrame(animateTop);
        }
      }
      requestAnimationFrame(animateTop);
    }
  }, 50);

  // handle link click
  var links = document.querySelectorAll("a");
  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      var url = this.getAttribute("href");
      var startFadeOut = null;

      function fadeOut(timestamp) {
        if (!startFadeOut) startFadeOut = timestamp;
        var progress = timestamp - startFadeOut;
        div.style.opacity = Math.max(1 - progress / 500, 0).toString();
        div.style.top = 150 - 140 * (progress / 500) + "px";

        if (progress < 500) {
          requestAnimationFrame(fadeOut);
        } else {
          window.location.href = url;
        }
      }
      requestAnimationFrame(fadeOut);
    });
  });
});
