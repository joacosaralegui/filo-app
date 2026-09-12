(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Nav: sombra sutil al scrollear.
  var nav = document.querySelector('nav.site');
  var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 8); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Reveal al entrar en viewport. Los grupos (cursos, FAQ) se escalonan por
  // índice de hermano para dar sensación de cascada, sin tocar transition-delay
  // en CSS (eso arruinaría el timing del hover).
  var revealEls = document.querySelectorAll('.reveal, .reveal-fade');
  if (reduceMotion) {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  } else if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          var siblings = Array.prototype.filter.call(el.parentElement.children, function (c) {
            return c.classList.contains('reveal') || c.classList.contains('reveal-fade');
          });
          var delay = siblings.indexOf(el) * 90;
          setTimeout(function () { el.classList.add('in-view'); }, delay);
          io.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }
})();
