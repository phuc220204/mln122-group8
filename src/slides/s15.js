import { kicker, title, foot } from './_kit.js';
import { icon } from '../components/icons.js';

const sols = [
  ['link', '<b class="pos">Liên thông dữ liệu</b> thuế – ngân hàng – sàn – định danh; đối soát tự động để phát hiện chia, tách', 'Lớp A (Slide 11)', 'Kiểm soát (5.3.2.3)'],
  ['eye', '<b class="pos">Chọn hộ kiểm tra bằng tiêu chí rủi ro tự động</b>, công khai bộ tiêu chí; cán bộ không tự chọn hộ', 'Lớp B: khâu ấn định sau kê khai (Slide 11)', 'Kiểm soát (5.3.2.3)'],
  ['receipt', '<b class="pos">Phần mềm hóa đơn, sổ sách miễn phí</b> trên nền tảng nhà nước; tập huấn tại chợ, tại phường', 'Năng lực số, chi phí tuân thủ', 'Tạo môi trường (5.3.2.1)'],
  ['layers', '<b class="pos">Làm "thoải" vách đá:</b> khi vượt 1 tỷ, thuế GTGT tăng dần theo phần vượt thay vì tính trên toàn bộ doanh thu', '"Vách đá" 1 tỷ (Slide 14)', 'Điều hòa (5.3.2.2)'],
  ['shield', '<b class="pos">Ổn định ngưỡng tối thiểu 3 năm</b>; công bố trước công thức điều chỉnh', 'Ngưỡng đổi sau 55 ngày', 'Giải quyết mâu thuẫn (5.3.2.4)'],
];

export default {
  title: 'Đề xuất giải pháp',
  section: 'Phần 1.2 · Thực tiễn',
  scene: 'solutions',
  html: `
  ${kicker('15', 'Đề xuất giải pháp')}
  ${title('5 giải pháp – <em class="pos">đánh đúng 5 điểm nghẽn</em> <i class="t-note">(đề xuất của nhóm)</i>')}
  <div class="sol-labels" data-a="fade"><span class="h-lbl neg-t">Điểm nghẽn</span><span class="h-lbl">Giải pháp</span><span class="h-lbl pos-t">Vai trò Nhà nước</span></div>
  <div class="sols">
    ${sols.map(([ic, s, b, r], i) => `
      <article class="sol" data-a data-gap="0.12">
        <div class="sol-block"><span class="chip neg">${b}</span></div>
        <svg class="sol-arrow" viewBox="0 0 20 60"><path d="M10 0 V52 M4 46 L10 54 L16 46" data-draw="${1.1 + i * 0.12}" data-dur="0.6"/></svg>
        <div class="sol-body card hoverable">
          <div class="sol-top"><span class="sol-n mono">${i + 1}</span>${icon(ic)}</div>
          <p>${s}</p>
        </div>
        <div class="sol-role mono">${r}</div>
      </article>`).join('')}
  </div>
  <p class="sol-note" data-a>Giải pháp "công khai quy trình, giám sát cán bộ" được gộp vào giải pháp 2, vì tiêu chí chọn hộ công khai chính là cách giám sát cán bộ.</p>
  ${foot({ src: 'Bộ GD&ĐT, 2019, Ch.5 mục 5.3.2 · đề xuất của nhóm' })}`,
};
