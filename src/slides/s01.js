import { gsap } from 'gsap';
import { title, photo } from './_kit.js';
import { meta } from '../content/meta.js';

/* Deterministic QR-like module matrix for the phone mock. */
function qrSvg(n = 25) {
  let s = 1337;
  const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const finder = (x, y, ox, oy) => {
    const dx = x - ox, dy = y - oy;
    if (dx < 0 || dy < 0 || dx > 6 || dy > 6) return null;
    const ring = Math.max(Math.abs(dx - 3), Math.abs(dy - 3));
    return ring === 3 || ring <= 1;
  };
  let rects = '';
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const f = finder(x, y, 0, 0) ?? finder(x, y, n - 7, 0) ?? finder(x, y, 0, n - 7);
      if (f === true || (f === null && r() < 0.48)) rects += `<rect x="${x}" y="${y}" width="1.02" height="1.02"/>`;
    }
  }
  return `<svg viewBox="-1 -1 ${n + 2} ${n + 2}" class="qr">${rects}</svg>`;
}

export default {
  title: 'Bìa',
  section: 'Mở đầu',
  scene: 'cover',
  cls: 'veil-none',
  html: `
  <div class="cover">
    <div class="cover-l">
      <p class="eyebrow mono" data-a="left">${meta.school}</p>
      ${title('Ai được, ai mất khi <em class="pos">bỏ thuế khoán?</em>', 'xl')}
      <p class="lead" data-a>Các quan hệ lợi ích kinh tế ở Việt Nam và vai trò của Nhà nước trong bảo đảm hài hòa các quan hệ lợi ích. Trường hợp nghiên cứu: chính sách thuế đối với hộ kinh doanh từ <span class="mono pos-t">01/01/2026</span>.</p>
      <div class="meta-row" data-a>
        <div><span>NHÓM THỰC HIỆN</span><b>${meta.group}</b></div>
        <div><span>LỚP</span><b>${meta.className}</b></div>
        <div><span>NHÓM PHẢN BIỆN</span><b>${meta.reviewers}</b></div>
      </div>
      <div class="members" data-a><span>Thành viên:</span> ${meta.members.map((m) => `<i>${m}</i>`).join('')}</div>
    </div>

    <div class="cover-r" data-a="scale" data-d="0.1">
      <div class="compare" data-drag style="--x:50%">
        <div class="cmp-a">
          ${photo('vietnam-shop.jpg', 'warm', 'inset:0')}
          <div class="notice">
            <div class="n-top"><i></i><i></i></div>
            <div class="n-h">THÔNG BÁO</div>
            <div class="n-s">Mức thuế khoán</div>
            <div class="n-lines"><i></i><i></i><i class="s"></i><i></i><i class="s"></i></div>
            <div class="n-amt mono">▢▢▢.▢▢▢ đ / tháng</div>
            <div class="n-stamp"></div>
          </div>
          <span class="cmp-tag l mono">THUẾ KHOÁN</span>
        </div>
        <div class="cmp-b">
          ${photo('qr-payment.jpg', 'cold', 'inset:0')}
          <div class="phone">
            <div class="ph-notch"></div>
            <div class="ph-screen">
              <div class="ph-h mono">QUÉT MÃ QR</div>
              ${qrSvg()}
              <div class="ph-ok"><svg viewBox="0 0 24 24"><path d="M4 12l5 5L20 6"/></svg></div>
            </div>
          </div>
          <div class="einv">
            <div class="ei-h mono">HÓA ĐƠN ĐIỆN TỬ</div>
            <div class="ei-l"><i></i><b></b></div><div class="ei-l"><i></i><b></b></div><div class="ei-l"><i class="s"></i><b></b></div>
            <div class="ei-t"><i></i><b></b></div>
          </div>
          <span class="cmp-tag r mono">TỰ KÊ KHAI</span>
        </div>
        <div class="cmp-handle"><span>⟷</span></div>
      </div>
    </div>
  </div>`,

  mount(el) {
    const cmp = el.querySelector('.compare');
    const setX = (clientX) => {
      const r = cmp.getBoundingClientRect();
      const p = Math.min(92, Math.max(8, ((clientX - r.left) / r.width) * 100));
      cmp.style.setProperty('--x', `${p}%`);
    };
    cmp.addEventListener('pointerdown', (e) => {
      cmp.setPointerCapture(e.pointerId);
      gsap.killTweensOf(cmp);
      setX(e.clientX);
      const mv = (ev) => setX(ev.clientX);
      const up = () => { cmp.removeEventListener('pointermove', mv); cmp.removeEventListener('pointerup', up); };
      cmp.addEventListener('pointermove', mv);
      cmp.addEventListener('pointerup', up);
    });
  },

  enter(el, tl) {
    const cmp = el.querySelector('.compare');
    const v = { x: 92 };
    cmp.style.setProperty('--x', '92%');
    tl.to(v, { x: 50, duration: 2.2, ease: 'power3.inOut', onUpdate: () => cmp.style.setProperty('--x', `${v.x}%`) }, 0.9);
    tl.from(el.querySelector('.notice'), { y: 40, rotate: -8, autoAlpha: 0, duration: 1 }, 1.0);
    tl.from(el.querySelector('.phone'), { y: 60, autoAlpha: 0, duration: 1 }, 1.4);
    tl.from(el.querySelector('.einv'), { y: 50, autoAlpha: 0, duration: 0.9 }, 1.8);
    tl.from(el.querySelector('.ph-ok'), { scale: 0, duration: 0.5, ease: 'back.out(2)' }, 2.6);
  },
};
