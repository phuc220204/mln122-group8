import { kicker, title, foot } from './_kit.js';
import { icon } from '../components/icons.js';

const risks = [
  ['1. Tự xác định doanh thu', '"Thỏa thuận ngầm" để hạ doanh thu', 'Có công chức tham gia'],
  ['2. Ngưỡng 1 tỷ / 10 tỷ', '<b class="neg">Chia, tách</b> doanh thu, đứng tên người khác để lọt ngưỡng', 'Không lộ diện'],
  ['3. Hoạch định chính sách', 'Nhóm có sức ảnh hưởng tác động ngưỡng, hạ tầng phần mềm', 'Mâu thuẫn lợi ích quốc gia'],
];

export default {
  title: 'Nguy cơ "lợi ích nhóm"',
  section: 'Phần 1.2 · Thực tiễn',
  scene: 'risk',
  html: `
  ${kicker('11', 'Nguy cơ "lợi ích nhóm"')}
  ${title('Bỏ khoán xóa một "vùng xám" – <em class="neg">mở ra ba khâu mới cần canh</em>', 's')}
  <div class="s11-grid">
    <article class="case" data-a="left">
      <div class="case-h"><span class="mono">HỒ SƠ</span><b>Bài học từ cơ chế cũ</b><span class="mono case-tag">số liệu thật</span></div>
      <ul>
        <li><span class="mono">2019–2020:</span> một đội thuế liên phường ở TP.HCM bị phát hiện "gợi ý" hộ kinh doanh chung chi để được áp <b class="neg">mức tăng thuế khoán thấp</b>.</li>
        <li><span class="mono">4 cán bộ</span> bị xử lý hình sự, tổng hơn <b class="neg">513 triệu đồng</b>, mức án <b class="neg">6–11 năm tù</b>.</li>
        <li><span class="mono">→</span> Điều này đúng như giáo trình mô tả: lợi ích nhóm có công chức tham gia (tr.133).</li>
      </ul>
      <div class="case-stats">
        <div><b class="mono"><span data-count="513" data-at="1.0">513</span></b><span>triệu đồng</span></div>
        <div><b class="mono">6–11</b><span>năm tù</span></div>
        <div><b class="mono"><span data-count="4" data-at="1.0">4</span></b><span>cán bộ</span></div>
      </div>
    </article>
    <section class="risks">
      <div class="h-lbl" data-a="fade"><b class="neg">3 khâu nguy cơ trong cơ chế mới</b> <i>(phân tích của nhóm)</i></div>
      <div class="rk-head" data-a="fade"><span>Khâu</span><span>Nguy cơ</span><span>Dấu hiệu (tr.133)</span></div>
      ${risks.map(([k, r, s], i) => `
        <div class="rk-row" data-a="right" data-gap="0.12">
          <span class="rk-eye">${icon('eye')}</span>
          <b class="rk-k">${k}</b>
          <p>${r}</p>
          <span class="chip neg">${s}</span>
        </div>`).join('')}
    </section>
  </div>
  <div class="band data s11-confirm" data-a>
    <span class="stamp mono">ĐÃ XÁC NHẬN</span>
    <span class="bt">Rủi ro "chia, tách" đã được thừa nhận chính thức. NQ 43/2026/QH16 <b>không áp dụng giảm thuế</b> cho doanh nghiệp hình thành do chia, tách nếu tổng doanh thu vượt 10 tỷ.</span>
  </div>
  ${foot({ src: 'Vietnamnet, 2020; Bộ GD&ĐT, 2019, tr.133, 137; Tạp chí Kinh tế – Tài chính, 2026c; BCH Trung ương, 2016' })}`,
  enter(el, tl) {
    tl.from(el.querySelector('.stamp'), { scale: 2.4, rotate: -18, autoAlpha: 0, duration: 0.5, ease: 'back.out(1.6)' }, 2.1);
  },
};
