import { gsap } from 'gsap';
import { kicker, title, foot } from './_kit.js';

const events = [
  ['04/5/2025', 'NQ 68-NQ/TW (Bộ Chính trị)', 'Xóa thuế khoán chậm nhất năm 2026; mục tiêu 2 triệu doanh nghiệp năm 2030'],
  ['17/5/2025', 'NQ 198/2025/QH15', 'Không áp dụng khoán từ 01/01/2026'],
  ['10/12/2025', 'Luật Quản lý thuế 108/2025/QH15', 'Điều 13: hộ tự xác định doanh thu, tự tính thuế (hiệu lực 01/01/2026)'],
  ['05/3/2026', 'NĐ 68/2026/NĐ-CP', 'Tự khai, tự nộp; thông báo tài khoản; ngưỡng 500 triệu'],
  ['24/4/2026', 'Luật sửa 4 luật thuế', 'Bỏ ngưỡng cứng khỏi luật, giao Chính phủ quy định'],
  ['29/4/2026', 'NĐ 141/2026/NĐ-CP', 'Ngưỡng <b class="pos">1 tỷ đồng/năm</b>, áp dụng từ 01/01/2026'],
  ['24/8/2026', 'NQ 43/2026/QH16', 'Giảm 30% thuế thu nhập năm 2026–2027 cho doanh thu ≤ 10 tỷ'],
];

export default {
  title: 'Bối cảnh chính sách',
  section: 'Phần 1.2 · Thực tiễn',
  scene: 'policy',
  steps: 7,
  html: `
  <div class="gl s09-globe" data-gl="globe" role="img" aria-label="Địa cầu 3D: Việt Nam, gồm quần đảo Hoàng Sa và Trường Sa, sáng dần"></div>
  ${kicker('09', 'Bối cảnh chính sách')}
  ${title('Từ <em class="pos">"khoán"</em> sang <em class="pos">"tự khai"</em> – trong 16 tháng')}
  <div class="s09-top">
    <div class="metric s09-metric" data-a="left">
      <div><span class="mv" data-count="3534814" data-dur="2.4">3.534.814</span></div>
      <p class="mc">hộ, cá nhân kinh doanh đã đăng ký thuế <span class="mono">(14/9/2026)</span> · <span class="chip pos">+<span data-count="24.4" data-decimals="1" data-at="1.2">24,4</span>%</span> so với cuối 2025</p>
    </div>
    <aside class="card neg why" data-a="up">
      <div class="lbl">Vì sao phải đổi</div>
      <p>Năm 2024, Việt Nam có khoảng <b class="neg"><span data-count="4" data-at="1.3">4</span> triệu</b> cơ sở kinh doanh phi chính thức; lao động phi chính thức chiếm khoảng <b class="neg"><span data-count="63" data-at="1.3">63</span>%</b> lao động có việc làm.</p>
    </aside>
  </div>
  <div class="tl">
    <div class="tl-track"><i class="tl-fill"></i></div>
    <ol>
      ${events.map(([d, doc, txt], i) => `
        <li class="tl-ev ${i === 5 ? 'key' : ''}" data-step="${i + 1}">
          <span class="tl-dot"></span>
          <time class="mono">${d}</time>
          <h4>${doc}</h4>
          <p>${txt}</p>
        </li>`).join('')}
    </ol>
  </div>
  ${foot({
    limit: '"Phi chính thức" theo định nghĩa thống kê không đồng nghĩa với "trốn thuế".',
    src: 'Bộ Chính trị, 2025; Quốc hội, 2025a, 2025b, 2026a, 2026b; Chính phủ, 2026a, 2026b; Tạp chí Kinh tế – Tài chính, 2026a; Báo Đấu thầu, 2026',
  })}`,

  // Slide_V1-style timeline: each milestone lights up on click / →, the progress line follows
  onStep(el, n) {
    const evs = [...el.querySelectorAll('.tl-ev')];
    evs.forEach((e, k) => { e.classList.toggle('lit', k < n); e.classList.toggle('cur', k === n - 1); });
    gsap.to(el.querySelector('.tl-fill'), { scaleX: n ? (n - 0.5) / evs.length : 0, duration: 0.6, ease: 'power2.out' });
  },
};
