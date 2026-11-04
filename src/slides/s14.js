import { kicker, title, foot } from './_kit.js';

const pairs = [
  ['Đủ 4 công cụ, thể hiện đủ 4 vai trò của Nhà nước (tr.134–137)', '<b class="neg">Ngưỡng đổi sau 55 ngày</b> (500 triệu → 1 tỷ): hộ đã khai, nộp phải làm thêm thủ tục xử lý tiền nộp thừa (NĐ 68, Điều 12). Chính sách thay đổi tạo thêm chi phí tuân thủ'],
  ['Mức thuế không còn do cán bộ "ấn định trước", thu hẹp đất cho "xin – cho" (Hộp 5.4)', 'Quyền ấn định <b class="neg">chuyển ra sau kê khai</b> (Luật QLT, Điều 24): "vùng xám" dời sang khâu <b class="neg">chọn hộ bị coi là khai sai</b>'],
  ['Ngưỡng 1 tỷ và giảm 30% bảo vệ lợi ích chính đáng của hộ nhỏ (tr.128)', '<b class="neg">"Vách đá" 1 tỷ:</b> vượt ngưỡng thì thuế GTGT tính trên <b class="neg">toàn bộ</b> doanh thu (NĐ 68, Điều 3 khoản 2), dù thuế TNCN chỉ tính trên phần vượt mức trừ (Điều 4 khoản 3) → động cơ khai dưới ngưỡng'],
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
  <div class="verdict" data-a>
    <span class="h-lbl">Theo 3 thước đo ở Slide 08</span>
    <p><b class="pos">Minh bạch hơn:</b> đã đạt</p>
    <p><b class="neg">Lớn hơn:</b> chưa đủ dữ liệu</p>
    <p><b class="neg">Hài hòa hơn:</b> mới "hạ nhiệt" bằng ngưỡng và giảm thuế, chưa đo được chi phí tuân thủ.</p>
  </div>
  ${foot({
    limit: 'Doanh nghiệp doanh thu ≤ 1 tỷ cũng được miễn thuế TNDN (NĐ 141, Điều 2), nên nhóm <b>không</b> cho rằng ưu đãi làm hộ ngại lên doanh nghiệp. Vấn đề nằm ở <b>cách tính thuế quanh ngưỡng</b>.',
    src: 'Bộ GD&ĐT, 2019, tr.128, 134–137; Quốc hội, 2025b; Chính phủ, 2026a, 2026b · vận dụng của nhóm',
  })}`,
  enter(el, tl) {
    tl.fromTo(el.querySelector('.beam'), { rotate: 0, transformOrigin: '300px 40px' }, { rotate: 6, duration: 2.2, ease: 'elastic.out(1, 0.4)' }, 1.4);
  },
};
