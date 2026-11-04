import { kicker, title, foot, photo } from './_kit.js';
import { icon } from '../components/icons.js';

export default {
  title: 'Bài học cho sinh viên (2)',
  section: 'Phần 1.3 · Bài học cho sinh viên',
  scene: 'lesson2',
  html: `
  ${photo('grocery-cu-khoi.jpg', 'side-photo cold', '', 'Ảnh: Vuong Tri Binh · CC BY-SA 4.0')}
  ${kicker('17', 'Bài học cho sinh viên (2)')}
  ${title('"Chia nhỏ để lọt ngưỡng" – <em class="neg">một người làm là vi phạm, có người tiếp tay là lợi ích nhóm</em>')}
  <div class="cases">
    <div class="cs-head" data-a="fade"><span></span><span class="h-lbl neg-t">Tình huống</span><span></span><span class="h-lbl pos-t">Ứng xử hài hòa</span></div>
    <div class="cs-row" data-a data-gap="0.2">
      <div class="cs-k">${icon('grad')}<b>Học tập</b></div>
      <div class="cs-sit">Một bạn không đóng góp nhưng nhờ nhóm trưởng "giữ tên"</div>
      <div class="cs-arrow">${icon('arrowR')}</div>
      <div class="cs-ans">Phân công minh bạch, ghi nhận đúng đóng góp, trao đổi trước; báo giảng viên nếu cần</div>
    </div>
    <div class="cs-row" data-a data-gap="0.2">
      <div class="cs-k">${icon('cart')}<b>Kinh doanh</b></div>
      <div class="cs-sit">Shop online sắp chạm <b class="neg">1 tỷ đồng/năm</b>
        <div class="rev"><div class="rev-track"><i class="rev-fill"></i><span class="rev-line"></span></div><div class="rev-lbl mono"><span>0</span><span class="neg-t">1 tỷ</span></div></div>
      </div>
      <div class="cs-arrow">${icon('arrowR')}</div>
      <div class="cs-ans">Kê khai đúng theo NĐ 68, NĐ 141; <b class="neg">không</b> tách tài khoản, đứng tên người thân; tính đường lên doanh nghiệp</div>
    </div>
  </div>
  <div class="band neg s17-band" data-a>${icon('link', 'bico')}<span class="bt">Tình huống 2 là <b>Lớp A</b> ở Slide 11. Nó thành <b>lợi ích nhóm tiêu cực</b> khi có người tiếp tay, ví dụ cán bộ làm ngơ hoặc người đứng ra dàn xếp cho nhiều shop (tr.132–133).</span></div>
  ${foot({ src: 'Chính phủ, 2026a, 2026b; Quốc hội, 2026b; Bộ GD&ĐT, 2019, tr.132–133' })}`,
  enter(el, tl) {
    tl.fromTo(el.querySelector('.rev-fill'), { scaleX: 0 }, { scaleX: 0.96, duration: 2.4, ease: 'power2.in' }, 1.2);
    tl.fromTo(el.querySelector('.rev-line'), { opacity: 0.3 }, { opacity: 1, repeat: 3, yoyo: true, duration: 0.25 }, 3.5);
  },
};
