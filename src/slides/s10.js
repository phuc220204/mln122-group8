import { kicker, title, foot, photo } from './_kit.js';
import { icon } from '../components/icons.js';

const rows = [
  ['<b>Nhà nước</b>', 'tr.50–51', 'building', 'Nguồn thu đủ, công bằng; dữ liệu minh bạch', 'Hộ lớn lên → nguồn thu bền vững', 'Chống thất thu ↔ hộ ngại chi phí tuân thủ, ngại bị "soi" dòng tiền'],
  ['<b>Hộ kinh doanh</b>', 'người sản xuất, tr.48–49', 'cart', 'Lợi nhuận, chi phí thấp', '≤ 1 tỷ không phải nộp GTGT, TNCN; minh bạch → dễ vay vốn, dễ lên doanh nghiệp', 'Thuế bình quân <b class="neg">670.000 → 4,6 triệu đồng/tháng</b>; thêm sổ sách, hóa đơn'],
  ['<b>Doanh nghiệp</b>', '', 'briefcase', 'Cạnh tranh bình đẳng', 'Doanh nghiệp ≤ 1 tỷ cũng miễn TNDN (NĐ 141, Điều 2)', 'Trước đây hộ khoán chịu gánh nặng thấp hơn'],
  ['<b>Người lao động tại hộ</b>', 'tr.129–130', 'users', 'Việc làm, tiền lương', 'Doanh thu minh bạch → cơ sở đòi hợp đồng, quyền lợi', 'Hộ cắt chi phí → giảm giờ, giảm người'],
  ['<b>Người tiêu dùng</b>', 'tr.49', 'receipt', 'Giá hợp lý, hàng thật, có hóa đơn', 'Truy xuất nguồn gốc, bảo vệ quyền lợi', 'Chi phí bị đẩy vào giá bán'],
];

export default {
  title: 'Giải phẫu lợi ích 4 chủ thể',
  section: 'Phần 1.2 · Thực tiễn',
  scene: 'anatomy',
  steps: 2,
  html: `
  ${kicker('10', 'Giải phẫu lợi ích 4 chủ thể')}
  ${title('Thuế kê khai cao gấp <em class="neg">≈7 lần</em> thuế khoán – ai gánh?', 's')}
  <div class="s10-wrap">
    <div class="matrix">
      <div class="mx-head" data-a="fade">
        <span>Chủ thể <i class="mono">(Ch.2 mục 2.3)</i></span><span>Lợi ích kinh tế</span><span class="pos-t">Thống nhất</span><span class="neg-t">Mâu thuẫn</span>
      </div>
      ${rows.map(([who, p, ic, li, tn, mt], i) => `
        <div class="mx-row ${i === 1 ? 'hot' : ''}" data-a="left" data-gap="0.08">
          <div class="mx-who">${icon(ic)}<div>${who}${p ? `<span class="mono pg">(${p})</span>` : ''}</div></div>
          <p>${li}</p>
          <p class="mx-pos">${tn}</p>
          <p class="mx-neg">${mt}</p>
        </div>`).join('')}
    </div>
    <aside class="x7" data-a="right">
      ${photo('street-vendor-hanoi.jpg', 'x7-photo', '', 'Ảnh: Jakub Hałun · CC BY 4.0')}
      <div class="x7-num"><span class="mono">≈</span><span data-count="7" data-at="0.9">7</span><small>×</small></div>
      <div class="x7-bars">
        <div class="xb"><span class="mono">KHOÁN</span><i class="b1"></i><b class="mono">670.000</b></div>
        <div class="xb"><span class="mono">KÊ KHAI</span><i class="b2"></i><b class="mono neg-t">4,6 triệu</b></div>
        <p class="mono xb-u">đồng/tháng · bình quân</p>
      </div>
    </aside>
  </div>
  <div class="s10-bands">
    <div class="band neg" data-step="1">${icon('alert', 'bico')}<span class="bt"><b>Điểm nóng nhất là Nhà nước ↔ Hộ kinh doanh</b>, tức "thu nhập bên này tăng, bên kia giảm" (tr.127–128).</span></div>
    <div class="band pos" data-step="2">${icon('shield', 'bico')}<span class="bt">Nhà nước "hạ nhiệt" mâu thuẫn bằng ngưỡng 1 tỷ, xử lý tiền đã nộp thừa (NĐ 68, Điều 12) và giảm 30% thuế thu nhập (NQ 43/2026/QH16).</span></div>
  </div>
  ${foot({
    limit: 'Mức 670.000 và 4,6 triệu đồng là số bình quân trước khi nâng ngưỡng; không đại diện cho mọi hộ.',
    src: 'VietnamPlus, 2025; Chính phủ, 2026a, 2026b; Quốc hội, 2026b; Bộ GD&ĐT, 2019',
  })}`,
  enter(el, tl) {
    tl.fromTo(el.querySelector('.b1'), { scaleX: 0 }, { scaleX: 1, duration: 0.8 }, 1.0);
    tl.fromTo(el.querySelector('.b2'), { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: 'power2.inOut' }, 1.4);
  },
  onStep(el, n) {
    el.querySelector('.mx-row.hot').classList.toggle('flare', n >= 1);
  },
};
