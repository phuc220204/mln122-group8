import { kicker, title, foot } from './_kit.js';

const pairs = [
  ['Đủ 4 công cụ, thể hiện đủ 4 vai trò của Nhà nước (tr.134–137)', '<b class="neg">Ngưỡng đổi sau 55 ngày</b> (500 triệu → 1 tỷ): là điều chỉnh kịp thời, có lợi cho hộ (tr.137), nhưng hộ đã khai, nộp phải làm thêm thủ tục xử lý tiền nộp thừa (NĐ 68, Điều 12)'],
  ['Mức thuế không còn do cán bộ "ấn định trước", thu hẹp đất cho "xin – cho" (Hộp 5.4)', 'Quyền ấn định <b class="neg">chuyển ra sau kê khai</b> (Luật QLT, Điều 24): nguy cơ "vùng xám" dời sang khâu <b class="neg">chọn hộ bị coi là khai sai</b>'],
  ['Ngưỡng 1 tỷ và giảm 30% bảo vệ lợi ích chính đáng của hộ nhỏ (tr.128)', '<b class="neg">"Vách đá" 1 tỷ:</b> vượt ngưỡng, thuế GTGT "bằng tỷ lệ % nhân (x) doanh thu" (NĐ 68, Điều 3 khoản 2), tức trên <b class="neg">toàn bộ</b> doanh thu (Luật 48/2024, Điều 12); thuế TNCN theo doanh thu chỉ tính phần vượt (Luật 109/2025, Điều 7 khoản 3) → động cơ khai dưới ngưỡng'],
];

export default {
  title: 'Quan điểm nhóm (2)',
  section: 'Phần 1.2 · Thực tiễn',
  scene: 'view2',
  html: `
  ${kicker('14', 'Đánh giá chính sách · Quan điểm nhóm')}
  ${title('<em class="pos">Đúng hướng</em> – nhưng <em class="neg">còn 3 điểm phải sửa</em>', 'l')}
  <div class="balance" data-a="fade">
    <svg viewBox="0 0 600 120"><g class="beam"><path d="M60 40 H540"/><circle cx="60" cy="40" r="6"/><circle cx="540" cy="40" r="6"/><path class="pan pos" d="M20 90 Q60 110 100 90 L60 40 Z"/><path class="pan neg" d="M500 90 Q540 110 580 90 L540 40 Z"/></g><path d="M300 40 V112 M260 112 H340"/><circle cx="300" cy="40" r="8" class="pivot"/></svg>
  </div>
  <div class="debate">
    <div class="db-h pos" data-a="left">Nhóm ủng hộ vì…</div>
    <div class="db-h neg" data-a="right">Nhóm phản biện ở chỗ…</div>
    ${pairs.map(([a, b]) => `
      <p class="db-c pos" data-a="left" data-gap="0.02">${a}</p>
      <p class="db-c neg" data-a="right" data-gap="0.14">${b}</p>`).join('')}
  </div>
  <div class="band neg s14-cliff" data-a><span class="bt"><b>Ví dụ hộ bán hàng hóa:</b> doanh thu 1,0 tỷ đồng → 0 đồng. Doanh thu 1,1 tỷ đồng → GTGT 1% × 1,1 tỷ = 11 triệu đồng, TNCN 0,5% × 100 triệu = 0,5 triệu đồng. Thêm 100 triệu đồng doanh thu, thêm <b>11,5 triệu đồng</b> thuế.</span></div>
  <div class="verdict" data-a>
    <span class="h-lbl">Theo 3 thước đo</span>
    <p><b class="pos">Minh bạch hơn:</b> đã đạt</p>
    <p><b class="neg">Lớn hơn:</b> chưa đủ dữ liệu</p>
    <p><b class="neg">Hài hòa hơn:</b> mới "hạ nhiệt" bằng ngưỡng và giảm thuế, chưa đo được chi phí tuân thủ.</p>
  </div>
  ${foot({
    limit: 'NĐ 141 đổi mốc 500 triệu trong NĐ 68 thành 1 tỷ. Ví dụ giả định hộ chọn tính TNCN theo doanh thu. Doanh nghiệp ≤ 1 tỷ cũng được miễn TNDN (NĐ 141, Điều 2), nên nhóm <b>không</b> cho rằng ưu đãi làm hộ ngại lên doanh nghiệp; vấn đề nằm ở <b>cách tính thuế quanh ngưỡng</b>.',
    src: 'Bộ GD&ĐT, 2019, tr.128, 134–137; Quốc hội, 2024, 2025b, 2025c; Chính phủ, 2026a, 2026b · vận dụng của nhóm',
  })}`,
  enter(el, tl) {
    tl.fromTo(el.querySelector('.beam'), { rotate: 0, transformOrigin: '300px 40px' }, { rotate: 6, duration: 2.2, ease: 'elastic.out(1, 0.4)' }, 1.4);
  },
};
