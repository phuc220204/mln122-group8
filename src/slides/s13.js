import { kicker, title, foot } from './_kit.js';

const ok = [
  '<b class="pos"><span data-count="1689266" data-at="1.2">1.689.266</span></b> tờ khai; thuế kê khai <b class="pos"><span data-count="9767.8" data-decimals="1" data-at="1.2">9.767,8</span> tỷ đồng</b> <span class="mono">(21/9/2026)</span>',
  '<b class="pos"><span data-count="343773" data-at="1.3">343.773</span></b> hộ dùng hóa đơn từ máy tính tiền, <b class="pos">+70%</b> <span class="mono">(17/9/2026)</span>',
  'Thu từ thương mại điện tử và hộ kinh doanh 9 tháng ≈ <b class="pos"><span data-count="224700" data-at="1.4">224.700</span> tỷ</b>, <b class="pos">+26,6%</b>',
  'Khoảng <b class="pos">98%</b> hộ thuộc diện đã kê khai <span class="mono">(Bộ Tài chính, 17/6/2026)</span>',
];
const warn = [
  'Ngưỡng đổi chỉ sau <b class="neg">55 ngày</b> (05/3 → 29/4) → hộ phải xử lý lại kê khai quý I<div class="days"><span class="mono">05/3</span><i><b></b></i><span class="mono">29/4</span></div>',
  'Ngưỡng cố định tạo "vách đá" → động cơ chia, tách doanh thu',
  'Tiểu thương lớn tuổi chưa theo kịp công nghệ',
  'Đã có đề xuất nghiên cứu áp dụng lại khoán cho hộ dưới 5 tỷ → mâu thuẫn chưa khép',
];
const ring = (v, label) => `
  <div class="ring-m" data-a="scale">
    <svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="52" class="r-bg"/><circle cx="60" cy="60" r="52" class="r-fg" data-pct="${v}"/></svg>
    <div class="r-txt"><b class="mono"><span data-count="${v}" data-decimals="1" data-at="0.6">${String(v).replace('.', ',')}</span>%</b><span>${label}</span></div>
  </div>`;

export default {
  title: 'Đánh giá hiệu quả',
  section: 'Phần 1.2 · Thực tiễn',
  scene: 'results',
  html: `
  ${kicker('13', 'Đánh giá hiệu quả')}
  ${title('Thắng về <em class="pos">số lượng</em> – nợ về <em class="neg">độ ổn định</em>')}
  <div class="s13-grid">
    <div class="rings">${ring(98.2, 'tờ khai đúng hạn')}${ring(99.6, 'nộp điện tử')}</div>
    <section class="ledger pos">
      <header class="h-lbl" data-a="fade"><b class="pos">✔ KẾT QUẢ</b> (số liệu Cục Thuế)</header>
      <ul>${ok.map((t) => `<li data-a data-gap="0.08">${t}</li>`).join('')}</ul>
    </section>
    <section class="ledger neg">
      <header class="h-lbl" data-a="fade"><b class="neg">⚠ HẠN CHẾ</b> (nhận định của nhóm)</header>
      <ul>${warn.map((t) => `<li data-a data-gap="0.08">${t}</li>`).join('')}</ul>
    </section>
  </div>
  ${foot({
    limit: 'Số 224.700 tỷ gộp cả thương mại điện tử, nên chưa tách được phần tăng do bỏ khoán.',
    src: 'Tạp chí Kinh tế – Tài chính, 2026a, 2026b; Mekong ASEAN, 2026',
  })}`,
  enter(el, tl) {
    el.querySelectorAll('.r-fg').forEach((c) => {
      const len = 2 * Math.PI * 52;
      c.style.strokeDasharray = len;
      tl.fromTo(c, { strokeDashoffset: len }, { strokeDashoffset: len * (1 - c.dataset.pct / 100), duration: 1.8, ease: 'power3.out' }, 0.6);
    });
    tl.fromTo(el.querySelector('.days b'), { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power2.inOut' }, 1.6);
  },
};
