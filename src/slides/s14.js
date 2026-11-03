import { kicker, title, foot } from './_kit.js';

const pairs = [
  ['Đủ 4 công cụ, thể hiện đủ 4 vai trò của Nhà nước (tr.134–137)', 'Giáo trình yêu cầu môi trường pháp luật thông thoáng, ổn định (tr.134), nhưng 8 tháng đầu năm 2026 có ít nhất 5 văn bản mới về thuế hộ kinh doanh (Slide 09)'],
  ['Dữ liệu thay cho "ấn định", thu hẹp đất cho "xin – cho" (Hộp 5.4)', 'Bỏ khoán <b class="neg">không xóa</b> "vùng xám" mà <b class="neg">dời</b> nó sang khâu tự khai và khâu ngưỡng'],
  ['Ngưỡng 1 tỷ và giảm 30% bảo vệ lợi ích chính đáng của hộ nhỏ (tr.128)', 'Ưu đãi theo ngưỡng có thể thành <b class="neg">"trần kính"</b>: hộ ngại lớn lên, trái mục tiêu 2 triệu doanh nghiệp'],
];

export default {
  title: 'Quan điểm nhóm (2)',
  section: 'Phần 1.2 · Thực tiễn',
  scene: 'view2',
  html: `
  ${kicker('14', 'Đánh giá chính sách · Quan điểm nhóm')}
  ${title('<em class="pos">Đúng hướng</em> – nhưng <em class="neg">chưa ổn định</em>', 'l')}
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
    <p>Theo thước đo ở Slide 08, chính sách đã làm "chiếc bánh" <b class="pos">minh bạch hơn</b>, nhưng chưa chắc đã làm nó <b class="neg">lớn hơn</b>.</p>
    <div class="vd-tags"><span class="chip pos">✔ MINH BẠCH HƠN</span><span class="chip neg">? LỚN HƠN</span></div>
  </div>
  ${foot({ src: 'Bộ GD&ĐT, 2019, tr.128, 134–137; Bộ Chính trị, 2025 · vận dụng của nhóm' })}`,
  enter(el, tl) {
    tl.fromTo(el.querySelector('.beam'), { rotate: 0, transformOrigin: '300px 40px' }, { rotate: 6, duration: 2.2, ease: 'elastic.out(1, 0.4)' }, 1.4);
  },
};
