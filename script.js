// Salon Diva — interactions (ported from the Claude Design component logic)
(function () {
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  // Scroll reveal
  if ('IntersectionObserver' in window) {
    var reveal = function (els, dist, dur, threshold) {
      els.forEach(function (el) {
        el.style.opacity = 0;
        el.style.transform = 'translateY(' + dist + 'px)';
        el.style.transition = 'opacity ' + dur + 's ease, transform ' + dur + 's cubic-bezier(.2,.7,.2,1)';
      });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.style.opacity = 1; e.target.style.transform = 'none'; io.unobserve(e.target); }
        });
      }, { threshold: threshold });
      els.forEach(function (el) { io.observe(el); });
    };
    reveal($$('.desktop [data-reveal]'), 28, 1, 0.12);
    reveal($$('.mobile [data-reveal]'), 24, 0.9, 0.1);
  }

  // Gallery filters
  var filterBtns = $$('[data-filter]');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var f = btn.getAttribute('data-filter');
      filterBtns.forEach(function (b) {
        var on = b.getAttribute('data-filter') === f;
        b.style.background = on ? '#c4566c' : 'transparent';
        b.style.color = on ? '#fff' : '#c4566c';
      });
      $$('[data-type]').forEach(function (item) {
        var on = f === 'All' || item.getAttribute('data-type') === f;
        item.style.opacity = on ? 1 : 0.28;
        item.style.filter = on ? 'none' : 'grayscale(1)';
      });
    });
  });

  // Booking
  var service = 'Hair';
  var setService = function (s) {
    service = s;
    $$('[data-service-select]').forEach(function (sel) { sel.value = s; });
    $$('[data-service-opt]').forEach(function (b) {
      var on = b.getAttribute('data-service-opt') === s;
      b.style.background = on ? '#c4566c' : '#fff';
      b.style.color = on ? '#fff' : '#2b2326';
      b.style.borderColor = on ? '#c4566c' : '#e3cfc9';
    });
  };
  var setBooked = function (booked) {
    $$('[data-service-name]').forEach(function (el) { el.textContent = service; });
    $$('[data-book-form]').forEach(function (el) { el.hidden = booked; });
    $$('[data-book-done]').forEach(function (el) { el.hidden = !booked; });
  };
  $$('[data-service-select]').forEach(function (sel) {
    sel.addEventListener('change', function () { setService(sel.value); });
  });
  $$('[data-service-opt]').forEach(function (b) {
    b.addEventListener('click', function () { setService(b.getAttribute('data-service-opt')); });
  });
  $$('[data-book]').forEach(function (b) { b.addEventListener('click', function () { setBooked(true); }); });
  $$('[data-book-reset]').forEach(function (a) { a.addEventListener('click', function () { setBooked(false); }); });

  // Mobile menu
  var menu = document.querySelector('[data-menu]');
  $$('[data-menu-open]').forEach(function (b) { b.addEventListener('click', function () { menu.hidden = false; }); });
  $$('[data-menu-close]').forEach(function (b) { b.addEventListener('click', function () { menu.hidden = true; }); });

  // Mobile gallery lightbox
  var lb = document.querySelector('[data-lightbox-view]');
  var lbImg = lb.querySelector('[data-lb-img]');
  var lbCap = lb.querySelector('[data-lb-cap]');
  $$('[data-lightbox]').forEach(function (item) {
    item.addEventListener('click', function () {
      var img = item.querySelector('img');
      lbImg.src = img.getAttribute('src');
      lbImg.alt = item.getAttribute('data-cap');
      lbImg.style.objectPosition = item.getAttribute('data-pos');
      lbCap.textContent = item.getAttribute('data-cap');
      lb.hidden = false;
    });
  });
  lb.addEventListener('click', function () { lb.hidden = true; });

  // Mobile review carousel dots
  var reviews = document.querySelector('[data-reviews]');
  var dots = $$('[data-dot]');
  var current = 0;
  reviews.addEventListener('scroll', function () {
    var i = Math.round(reviews.scrollLeft / 314);
    if (i === current) return;
    current = i;
    dots.forEach(function (d, j) {
      d.style.width = j === i ? '22px' : '6px';
      d.style.background = j === i ? '#c4566c' : '#e3cfc9';
    });
  }, { passive: true });
})();
