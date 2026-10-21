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

  /* ---------- Quiet reveal for images below the fold ---------- */
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    $$('main .fig, main .product-card, main .gallery li, main .life-card').forEach(function (el) {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add('reveal');
        io.observe(el);
      }
    });
    window.addEventListener('beforeprint', function () {
      $$('.reveal').forEach(function (el) { el.classList.add('in'); });
    });
  }

  /* ---------- List (stored on this device only) ---------- */
  var KEY = 'integrale-list-v1';
  function readList() {
    try { var v = JSON.parse(localStorage.getItem(KEY)); return Array.isArray(v) ? v : []; }
    catch (e) { return []; }
  }
  function writeList(items) {
    try { localStorage.setItem(KEY, JSON.stringify(items)); return true; }
    catch (e) { return false; }
  }
  function totalQty(items) { return items.reduce(function (n, i) { return n + i.qty; }, 0); }
  function optsText(i) { return [i.colour, i.size, i.format].filter(Boolean).join(' · '); }

  function updateCount() {
    var n = totalQty(readList());
    $$('[data-list-count]').forEach(function (el) {
      el.textContent = n;
      el.classList.toggle('has-items', n > 0);
    });
  }

  var dialog = $('#list-dialog');
  var listBody = dialog && $('[data-list-body]', dialog);
  var listStatus = dialog && $('[data-list-status]', dialog);
  var lastOpener = null;

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function renderList() {
    if (!listBody) return;
    var items = readList();
    if (!items.length) {
      listBody.innerHTML =
        '<div class="list-empty"><p>Your list is empty. Pieces you add from the shop will appear here.</p>' +
        '<a class="link" href="/shop"><span>Browse the shop</span> <span class="arrow" aria-hidden="true">→</span></a></div>';
      return;
    }
    listBody.innerHTML =
      '<ul class="list-items">' + items.map(function (i, n) {
        return '<li>' +
          '<p class="list-name"><a href="/shop/' + esc(i.slug) + '">' + esc(i.name) + '</a></p>' +
          '<p class="list-opts">' + esc(optsText(i) || 'No options') + '</p>' +
          '<div class="qty" role="group" aria-label="Quantity of ' + esc(i.name) + '">' +
            '<button type="button" data-qty="-1" data-i="' + n + '" aria-label="One fewer">−</button>' +
            '<output aria-live="polite">' + i.qty + '</output>' +
            '<button type="button" data-qty="1" data-i="' + n + '" aria-label="One more">+</button>' +
          '</div>' +
          '<button type="button" class="text-button list-remove" data-remove="' + n + '">Remove<span class="vh"> ' + esc(i.name) + '</span></button>' +
        '</li>';
      }).join('') + '</ul>' +
      '<div class="list-actions">' +
        '<button type="button" class="btn btn-wide" data-list-copy>Copy list</button>' +
        '<button type="button" class="text-button" data-list-clear>Clear list</button>' +
      '</div>';
  }

  function openList(opener) {
    if (!dialog) return;
    lastOpener = opener || document.activeElement;
    listStatus.textContent = '';
    renderList();
    dialog.showModal();
  }

  if (dialog) {
    $$('[data-list-open]').forEach(function (b) { b.addEventListener('click', function () { openList(b); }); });
    $('[data-list-close]', dialog).addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener('close', function () { if (lastOpener && lastOpener.focus) lastOpener.focus(); });

    listBody.addEventListener('click', function (e) {
      var t = e.target.closest('button');
      if (!t) return;
      var items = readList();
      if (t.hasAttribute('data-qty')) {
        var i = +t.getAttribute('data-i');
        items[i].qty = Math.max(1, Math.min(20, items[i].qty + +t.getAttribute('data-qty')));
        writeList(items); renderList(); updateCount();
        var again = $('[data-i="' + i + '"][data-qty="' + t.getAttribute('data-qty') + '"]', listBody);
        if (again) again.focus();
      } else if (t.hasAttribute('data-remove')) {
        var removed = items.splice(+t.getAttribute('data-remove'), 1)[0];
        writeList(items); renderList(); updateCount();
        listStatus.textContent = removed.name + ' removed.';
        var next = $('button', listBody) || $('[data-list-close]', dialog);
        next.focus();
      } else if (t.hasAttribute('data-list-clear')) {
        writeList([]); renderList(); updateCount();
        listStatus.textContent = 'List cleared.';
        $('[data-list-close]', dialog).focus();
      } else if (t.hasAttribute('data-list-copy')) {
        copyList(items);
      }
    });
  }

  function copyList(items) {
    var text = 'integrale — my list\n' + items.map(function (i) {
      return '• ' + i.name + (optsText(i) ? ' (' + optsText(i) + ')' : '') + ' × ' + i.qty;
    }).join('\n');
    function fallback() {
      // Clipboard unavailable: show the text so it can be copied by hand.
      var old = $('.list-copy-fallback', listBody);
      if (old) old.remove();
      var ta = document.createElement('textarea');
      ta.className = 'list-copy-fallback';
      ta.readOnly = true;
      ta.setAttribute('aria-label', 'Your list as text');
      ta.value = text;
      listBody.appendChild(ta);
      ta.focus(); ta.select();
      listStatus.textContent = 'Copying isn’t available here. The list is selected below so you can copy it yourself.';
    }
    if (navigator.clipboard && window.isSecureContext) {
      // Some browsers never settle the promise when access is blocked.
      var settled = false;
      var timer = setTimeout(function () { if (!settled) { settled = true; fallback(); } }, 1500);
      navigator.clipboard.writeText(text).then(function () {
        if (settled) return;
        settled = true; clearTimeout(timer);
        listStatus.textContent = 'Copied to your clipboard.';
      }, function () {
        if (settled) return;
        settled = true; clearTimeout(timer);
        fallback();
      });
    } else {
      fallback();
    }
  }

  updateCount();
  window.addEventListener('storage', function (e) { if (e.key === KEY) { updateCount(); if (dialog && dialog.open) renderList(); } });

  /* ---------- Product page ---------- */
  var pdp = $('[data-product]');
  if (pdp) {
    var gallery = $('[data-pdp-gallery]', pdp);
    var views = $$('[data-view]', pdp);
    var thumbs = $$('[data-view-btn]', pdp);
    thumbs.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var n = btn.getAttribute('data-view-btn');
        views.forEach(function (v) { v.hidden = v.getAttribute('data-view') !== n; });
        thumbs.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      });
    });

    var form = $('[data-pdp-form]', pdp);
    var status = $('[data-pdp-status]', pdp);
    form.addEventListener('change', function (e) {
      var input = e.target;
      var label = $('[data-opt-value="' + input.name + '"]', form);
      if (label) label.textContent = input.value;
      if (input.name === 'colour') {
        gallery.style.setProperty('--g', input.getAttribute('data-g'));
        gallery.style.setProperty('--gi', input.getAttribute('data-gi'));
      }
      if (input.name === 'size') {
        var err = $('[data-error="size"]', form);
        if (err) err.hidden = true;
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      if ($('[data-required="size"]', form) && !data.get('size')) {
        $('[data-error="size"]', form).hidden = false;
        $('input[name="size"]', form).focus();
        status.textContent = '';
        return;
      }
      var entry = {
        slug: pdp.getAttribute('data-product'),
        name: pdp.getAttribute('data-name'),
        colour: data.get('colour') || '',
        size: data.get('size') || '',
        format: data.get('format') || '',
        qty: 1,
      };
      var items = readList();
      var same = items.filter(function (i) {
        return i.slug === entry.slug && i.colour === entry.colour && i.size === entry.size && i.format === entry.format;
      })[0];
      if (same) same.qty = Math.min(20, same.qty + 1); else items.push(entry);
      if (!writeList(items)) {
        status.textContent = 'Your browser isn’t letting this site save a list, so it couldn’t be added.';
        return;
      }
      updateCount();
      status.innerHTML = 'Added to your list. <button type="button" class="text-button" data-list-open-inline>View list</button>';
      $('[data-list-open-inline]', status).addEventListener('click', function (ev) { openList(ev.currentTarget); });
    });
  }

  /* ---------- Shop filter ---------- */
  var grid = $('[data-product-grid]');
  if (grid) {
    var chips = $$('.filters [data-filter]');
    var countEl = $('[data-filter-count]');
    var emptyEl = $('[data-filter-empty]');
    function applyFilter(cat) {
      var shown = 0;
      $$('.product-card', grid).forEach(function (card) {
        var on = cat === 'all' || card.getAttribute('data-category') === cat;
        card.hidden = !on;
        if (on) shown++;
      });
      $$('[data-life]', grid).forEach(function (el) { el.hidden = cat !== 'all'; });
      chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c.getAttribute('data-filter') === cat)); });
      countEl.textContent = shown + (shown === 1 ? ' piece' : ' pieces');
      emptyEl.hidden = shown > 0;
    }
    $$('[data-filter]').forEach(function (c) {
      c.addEventListener('click', function () { applyFilter(c.getAttribute('data-filter')); });
    });
  }

  /* ---------- Studio lightbox ---------- */
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
