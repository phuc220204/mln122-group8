import { kicker, title, foot } from './_kit.js';

const layers = [
  ['Hành vi', 'Khai thấp doanh thu · chia, tách hộ, đứng tên người thân để lọt ngưỡng 1 tỷ · quay lại thu tiền mặt', 'Nguy cơ cán bộ <b class="neg">"chọn" hộ nào bị coi là khai sai</b>, hộ nào được bỏ qua, để đổi lấy lợi ích · làm ngơ hồ sơ tách hộ'],
  ['Vì sao xếp vào lớp này', 'Một chủ thể tự làm, không có liên kết (tr.132)', 'Có quyền lực công tham gia, "thường không lộ diện" (tr.133); cán bộ và hộ khác lĩnh vực nên gần với "nhóm lợi ích" (tr.132)'],
  ['Khâu cần canh', 'Ngưỡng 1 tỷ', 'Kiểm tra (Luật QLT, Điều 22) và ấn định sau kê khai (Điều 24)'],
];

export default {
  title: 'Nguy cơ "lợi ích nhóm"',
  section: 'Phần 1.2 · Thực tiễn',
  scene: 'risk',
  html: `
  ${kicker('11', 'Nguy cơ "lợi ích nhóm"')}
  ${title('Bỏ khoán chưa xóa "vùng xám" – <em class="neg">nguy cơ dời ra sau kê khai</em>', 's')}
  <div class="s11-grid">
    <div class="s11-left">
      <article class="case" data-a="left">
        <div class="case-h"><span class="mono">HỒ SƠ</span><b>Bài học từ cơ chế cũ</b><span class="mono case-tag">số liệu thật</span></div>
        <ul>
          <li><span class="mono">2019–2020:</span> một đội thuế liên phường ở TP.HCM bị phát hiện "gợi ý" hộ kinh doanh chung chi để được áp <b class="neg">mức tăng thuế khoán thấp</b>.</li>
          <li><span class="mono">4 cán bộ</span> bị xử lý hình sự, tổng hơn <b class="neg">513 triệu đồng</b>, mức án <b class="neg">6–11 năm tù</b>.</li>
          <li><span class="mono">→</span> Điều này đúng như giáo trình mô tả: lợi ích nhóm có công chức tham gia (tr.133).</li>
        </ul>
      </article>
      <article class="assess" data-a="left">
        <h3>Quyền ấn định không mất, chỉ đổi thời điểm</h3>
        <p>Cơ quan thuế vẫn ấn định thuế khi hộ "khai thuế không đầy đủ, trung thực, chính xác" <span class="mono">(Luật QLT 108/2025/QH15, Điều 24 khoản 2a)</span>.</p>
        <div class="as-tl">
          <p><span class="mono">Trước:</span> ấn định <b class="pos">trước</b> (mức khoán).</p>
          <p><span class="mono">Nay:</span> ấn định <b class="pos">sau</b> kê khai, khi bị nghi khai sai.</p>
        </div>
      </article>
    </div>
    <section class="layers">
      <div class="h-lbl" data-a="fade"><b class="neg">2 lớp nguy cơ</b> <i>(phân tích của nhóm)</i></div>
      <div class="ly-row ly-head" data-a="fade">
        <span></span>
        <div class="ly-a"><b>Lớp A – Vi phạm cá nhân</b><small>(chưa phải lợi ích nhóm)</small></div>
        <div class="ly-b"><b>Lớp B – Nguy cơ lợi ích nhóm tiêu cực</b><small>(có công chức tham gia, tr.133)</small></div>
      </div>
      ${layers.map(([k, a, b]) => `
        <div class="ly-row" data-a="right" data-gap="0.12">
          <span class="ly-k">${k}</span>
          <p>${a}</p>
          <p class="ly-neg">${b}</p>
        </div>`).join('')}
      <p class="ly-link" data-a>Lớp A <b class="neg">thành</b> lớp B khi có người tiếp tay: cán bộ làm ngơ, hoặc có người đứng ra dàn xếp cho nhiều hộ cùng làm.</p>
    </section>
  </div>
  <div class="band data s11-confirm" data-a>
    <span class="stamp mono">ĐÃ XÁC NHẬN</span>
    <span class="bt">Nhà lập pháp đã tính đến rủi ro "chia, tách". NQ 43/2026/QH16 <b>không giảm thuế</b> cho <b>doanh nghiệp</b> hình thành do chia, tách nếu tổng doanh thu vượt 10 tỷ.</span>
  </div>
  ${foot({
    limit: 'Lớp B là <b>nguy cơ do nhóm suy luận</b>: vụ 2020 xảy ra dưới cơ chế khoán, không khái quát cho đội ngũ cán bộ thuế. Điều khoản loại trừ của NQ 43 áp dụng cho doanh nghiệp, không trực tiếp cho hộ; nguy cơ tách hộ là <b>phân tích của nhóm</b>.',
    src: 'Vietnamnet, 2020; Quốc hội, 2025b; Bộ GD&ĐT, 2019, tr.132–133, 137; Tạp chí Kinh tế – Tài chính, 2026c; BCH Trung ương, 2016',
  })}`,
  enter(el, tl) {
    tl.from(el.querySelector('.stamp'), { scale: 2.4, rotate: -18, autoAlpha: 0, duration: 0.5, ease: 'back.out(1.6)' }, 2.1);
  },
};
