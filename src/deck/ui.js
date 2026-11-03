const pad = (n) => String(n).padStart(2, '0');
const clock = (s) => `${Math.floor(s / 60)}:${pad(Math.floor(s % 60))}`;
const TOTAL_MAIN = 18; // 18 slide trình bày + 1 slide tài liệu tham khảo

export function createUI(deck, stage, uiRoot) {
  /* ---------- on-stage chrome ---------- */
  const chrome = document.createElement('div');
  chrome.className = 'chrome';
  chrome.innerHTML = `
    <div class="topbar">
      <div class="brand"><i></i>MLN122 · KINH TẾ CHÍNH TRỊ MÁC – LÊNIN</div>
      <div class="right"><span class="clock mono"></span><span class="sec"></span><span class="cnt"></span></div>
    </div>
    <nav class="dots" aria-label="Chọn slide">
      ${deck.slides.map((s, i) => `<button data-go="${i}" aria-label="Slide ${pad(i + 1)}"><span class="tip">${pad(i + 1)} · ${s.title}</span></button>`).join('')}
    </nav>
    <div class="steps-hint"><span class="sh-t mono">Bấm để hiện ý tiếp theo</span><span class="sh-d"></span></div>
    <div class="progress"><i></i></div>`;
  stage.appendChild(chrome);
  const $sec = chrome.querySelector('.sec');
  const $cnt = chrome.querySelector('.cnt');
  const $clock = chrome.querySelector('.clock');
  const $bar = chrome.querySelector('.progress i');
  const $hint = chrome.querySelector('.steps-hint');
  const $hintDots = chrome.querySelector('.sh-d');
  const dots = [...chrome.querySelectorAll('.dots button')];
  dots.forEach((b) => b.addEventListener('click', () => deck.go(+b.dataset.go)));

  /* ---------- overview ---------- */
  const ov = document.createElement('div');
  ov.className = 'overview';
  ov.innerHTML = `<h3><b>TỔNG QUAN</b> · ${deck.slides.length} slide · Esc để đóng</h3><div class="grid"></div>`;
  uiRoot.appendChild(ov);
  const grid = ov.querySelector('.grid');
  let built = false;
  const buildOverview = () => {
    if (built) return;
    built = true;
    deck.els.forEach((el, i) => {
      const cell = document.createElement('button');
      cell.className = 'cell';
      cell.innerHTML = `<div class="thumb"><div class="mini"></div></div><div class="cap"><span>${pad(i + 1)}</span>${deck.slides[i].title}</div>`;
      const clone = el.cloneNode(true);
      clone.classList.add('is-active');
      clone.removeAttribute('style');
      clone.querySelectorAll('[style]').forEach((n) => n.removeAttribute('style'));
      cell.querySelector('.mini').appendChild(clone);
      cell.addEventListener('click', () => { closeOverview(); deck.go(i); });
      grid.appendChild(cell);
    });
  };
  const sizeThumbs = () => {
    grid.querySelectorAll('.thumb').forEach((t) => {
      t.querySelector('.mini').style.transform = `scale(${t.clientWidth / 1920})`;
    });
  };
  const openOverview = () => {
    buildOverview();
    ov.classList.add('open');
    grid.querySelectorAll('.cell').forEach((c, i) => c.classList.toggle('on', i === deck.index));
    requestAnimationFrame(sizeThumbs);
  };
  const closeOverview = () => ov.classList.remove('open');
  window.addEventListener('resize', () => ov.classList.contains('open') && sizeThumbs());

  /* ---------- timers ---------- */
  let running = false;
  let total = 0;
  let last = performance.now();
  const tick = (now) => {
    if (running) total += (now - last) / 1000;
    last = now;
    $clock.textContent = clock(total);
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  const toggleTimer = () => {
    if (running) { running = false; total = 0; }
    else running = true;
    $clock.classList.toggle('on', running);
  };

  /* ---------- toast ---------- */
  const toast = document.createElement('div');
  toast.className = 'help-toast';
  toast.innerHTML = '<b>→</b> / <b>click</b> tiếp · <b>chuột phải</b> lùi · <b>O</b> tổng quan · <b>F</b> toàn màn hình';
  uiRoot.appendChild(toast);
  setTimeout(() => toast.classList.add('on'), 1200);
  setTimeout(() => toast.classList.remove('on'), 6200);

  /* ---------- update on change ---------- */
  deck.onChange((i, step) => {
    const s = deck.slides[i];
    $sec.textContent = s.section;
    $cnt.textContent = i < TOTAL_MAIN ? `${pad(i + 1)} / ${TOTAL_MAIN}` : 'TLTK';
    $bar.style.width = `${((i + (deck.stepsOf(i) ? step / (deck.stepsOf(i) + 1) : 0)) / (deck.slides.length - 1)) * 100}%`;
    dots.forEach((d, k) => { d.classList.toggle('on', k === i); d.classList.toggle('done', k < i); });
    const n = deck.stepsOf(i);
    $hintDots.innerHTML = n ? Array.from({ length: n }, (_, k) => `<i class="${k < step ? 'on' : ''}"></i>`).join('') : '';
    $hint.classList.toggle('on', n > 0 && step < n);
  });

  /* ---------- input ---------- */
  const fullscreen = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  };
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const k = e.key;
    if (ov.classList.contains('open')) {
      if (k === 'Escape' || k === 'o' || k === 'O') closeOverview();
      return;
    }
    if (document.body.classList.contains('blackout') && k !== 'b' && k !== 'B' && k !== '.') {
      document.body.classList.remove('blackout');
      return;
    }
    switch (k) {
      case 'ArrowRight': case 'PageDown': case ' ': case 'Enter': deck.next(); break;
      case 'ArrowLeft': case 'PageUp': case 'Backspace': deck.prev(); break;
      case 'ArrowDown': if (!deck.current.scrollable) deck.next(); else return; break;
      case 'ArrowUp': if (!deck.current.scrollable) deck.prev(); else return; break;
      case 'Home': deck.go(0); break;
      case 'End': deck.go(deck.slides.length - 1); break;
      case 'o': case 'O': case 'Escape': case 'g': case 'G': openOverview(); break;
      case 't': case 'T': toggleTimer(); break;
      case 'f': case 'F': fullscreen(); break;
      case 'b': case 'B': case '.': document.body.classList.toggle('blackout'); break;
      default: return;
    }
    e.preventDefault();
  });

  let wheelLock = 0;
  window.addEventListener('wheel', (e) => {
    if (ov.classList.contains('open')) return;
    const scroller = e.target.closest('[data-scroll]');
    if (scroller) {
      const atTop = scroller.scrollTop <= 0;
      const atEnd = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 2;
      if ((e.deltaY > 0 && !atEnd) || (e.deltaY < 0 && !atTop)) return;
    }
    const now = performance.now();
    if (now < wheelLock || Math.abs(e.deltaY) < 24) return;
    wheelLock = now + 900;
    if (e.deltaY > 0) deck.next(); else deck.prev();
  }, { passive: true });

  let tx = 0;
  let ty = 0;
  window.addEventListener('touchstart', (e) => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
  window.addEventListener('touchend', (e) => {
    if (e.target.closest('[data-drag], [data-gl], [data-scroll], .overview')) return;
    const dx = e.changedTouches[0].clientX - tx;
    const dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) (dx < 0 ? deck.next() : deck.prev());
  }, { passive: true });

  // Mouse: left click → next, right click → previous. Interactive parts and drags/text selections are ignored.
  const INTERACTIVE = 'a, button, input, [data-drag], [data-gl], [data-scroll], .overview, .dots';
  let down = null;
  window.addEventListener('pointerdown', (e) => { down = { x: e.clientX, y: e.clientY }; });
  const isClickNav = (e) => {
    if (ov.classList.contains('open') || e.target.closest(INTERACTIVE)) return false;
    if (down && Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) return false;
    return !String(window.getSelection() || '');
  };
  window.addEventListener('click', (e) => {
    if (e.button !== 0 || !isClickNav(e)) return;
    if (document.body.classList.contains('blackout')) { document.body.classList.remove('blackout'); return; }
    deck.next();
  });
  window.addEventListener('contextmenu', (e) => {
    if (!isClickNav(e)) return;
    e.preventDefault();
    deck.prev();
  });
}
