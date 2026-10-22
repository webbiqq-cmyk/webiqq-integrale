/* integrale — small progressive enhancements. Every page works without this. */
(function () {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ---------- Missing images: show a calm placeholder instead of a broken icon ---------- */
  document.addEventListener('error', function (e) {
    var t = e.target;
    if (t && t.tagName === 'IMG') {
      var frame = t.closest('.frame');
      if (frame) frame.classList.add('is-missing');
    }
  }, true);

  /* ---------- Mobile menu ---------- */
  var menu = $('#mobile-menu');
  var menuOpenBtn = $('[data-menu-open]');
  function openMenu() {
    menu.hidden = false;
    menuOpenBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    var first = $('nav a', menu);
    if (first) first.focus();
  }
  function closeMenu(restore) {
    menu.hidden = true;
    menuOpenBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (restore) menuOpenBtn.focus();
  }
  if (menu && menuOpenBtn) {
    menuOpenBtn.addEventListener('click', openMenu);
    $('[data-menu-close]', menu).addEventListener('click', function () { closeMenu(true); });
    menu.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu(true);
      if (e.key === 'Tab') trapFocus(e, menu);
    });
    $$('a', menu).forEach(function (a) { a.addEventListener('click', function () { closeMenu(false); }); });
    window.matchMedia('(min-width: 820px)').addEventListener('change', function (m) { if (m.matches) closeMenu(false); });
  }

  function trapFocus(e, root) {
    var f = $$('a[href], button:not([disabled]), input:not([disabled])', root).filter(function (el) { return el.offsetParent !== null; });
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ---------- Menu: highlight the category in view ---------- */
  var menuLinks = $$('.menu-bar a[href^="#"]');
  if (menuLinks.length) {
    var sections = menuLinks.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); });
    var ticking = false;
    var markCurrent = function () {
      ticking = false;
      var current = null;
      sections.forEach(function (sec) { if (sec && sec.getBoundingClientRect().top <= 120) current = sec; });
      menuLinks.forEach(function (a, i) {
        if (sections[i] === current) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(markCurrent); }
    }, { passive: true });
    markCurrent();
  }

  /* ---------- Past displays lightbox ---------- */
  var lb = $('#lightbox');
  var dataEl = $('#gallery-data');
  if (lb && dataEl) {
    var photos = JSON.parse(dataEl.textContent);
    var img = $('[data-lb-img]', lb);
    var cap = $('[data-lb-caption]', lb);
    var count = $('[data-lb-count]', lb);
    var current = 0, opener = null;
    function show(n) {
      current = (n + photos.length) % photos.length;
      var p = photos[current];
      img.src = p.src;
      img.srcset = p.srcset;
      img.sizes = '100vw';
      img.alt = p.alt;
      cap.textContent = p.caption;
      count.textContent = (current + 1) + ' / ' + photos.length;
    }
    $$('[data-gallery-index]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        opener = btn;
        show(+btn.getAttribute('data-gallery-index'));
        lb.showModal();
        $('[data-lb-close]', lb).focus();
      });
    });
    $('[data-lb-prev]', lb).addEventListener('click', function () { show(current - 1); });
    $('[data-lb-next]', lb).addEventListener('click', function () { show(current + 1); });
    $('[data-lb-close]', lb).addEventListener('click', function () { lb.close(); });
    lb.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(current - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); show(current + 1); }
    });
    lb.addEventListener('close', function () { if (opener) opener.focus(); });
  }

  /* ---------- Transparent header over the home hero ---------- */
  var siteHeader = $('.site-header');
  if (siteHeader && document.body.classList.contains('page-home')) {
    var hTicking = false;
    var markHeader = function () {
      hTicking = false;
      siteHeader.classList.toggle('is-top', window.scrollY < 40);
    };
    window.addEventListener('scroll', function () {
      if (!hTicking) { hTicking = true; requestAnimationFrame(markHeader); }
    }, { passive: true });
    markHeader();
  }

  /* ---------- Scroll reveal ---------- */
  var toReveal = $$('.reveal');
  if (toReveal.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.18, rootMargin: '0px 0px -8% 0px' });
      toReveal.forEach(function (el) { io.observe(el); });
    } else {
      toReveal.forEach(function (el) { el.classList.add('is-in'); });
    }
  }

  /* ---------- Hero parallax (subtle, disabled for reduced motion) ---------- */
  var parallax = $('[data-parallax]');
  if (parallax && window.matchMedia('(prefers-reduced-motion: no-preference)').matches && window.matchMedia('(min-width: 900px)').matches) {
    var pTicking = false;
    var movePx = function () {
      pTicking = false;
      var r = parallax.getBoundingClientRect();
      var mid = r.top + r.height / 2 - window.innerHeight / 2;
      var shift = Math.max(-18, Math.min(18, mid * -0.04));
      parallax.style.transform = 'translateY(' + shift.toFixed(1) + 'px)';
    };
    window.addEventListener('scroll', function () {
      if (!pTicking) { pTicking = true; requestAnimationFrame(movePx); }
    }, { passive: true });
    movePx();
  }

  /* ---------- Opening hours (only rendered once hours are confirmed) ---------- */
  $$('[data-hours]').forEach(function (el) {
    try {
      var h = JSON.parse(el.getAttribute('data-hours'));
      var parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: h.timeZone, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
      }).formatToParts(new Date());
      var get = function (t) { return parts.filter(function (p) { return p.type === t; })[0].value; };
      var day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
      var now = get('hour') + ':' + get('minute');
      var today = h.weekly.filter(function (d) { return d.day === day; })[0];
      var open = today && now >= today.open && now < today.close;
      var note = document.createElement('span');
      note.className = 'open-note';
      note.textContent = open ? ' · Open now' : ' · Closed now';
      el.appendChild(note);
    } catch (e) { /* leave the published hours as they are */ }
  });
})();
