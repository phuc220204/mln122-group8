import { kicker, title, foot } from './_kit.js';
import { icon } from '../components/icons.js';

const sols = [
  ['link', '<b class="pos">Liên thông dữ liệu</b> thuế – ngân hàng – sàn – định danh; đối soát tự động để phát hiện chia, tách', 'Khâu 1, 2 (Slide 11)', 'Kiểm soát (5.3.2.3)'],
  ['receipt', '<b class="pos">Phần mềm hóa đơn, sổ sách miễn phí</b> trên nền tảng nhà nước; tập huấn tại chợ, tại phường', 'Năng lực số; khâu 3', 'Tạo môi trường (5.3.2.1)'],
  ['eye', '<b class="pos">Công khai quy trình, giám sát cán bộ:</b> xử lý trực tuyến, kênh phản ánh, luân chuyển', '"Xin – cho"', 'Kiểm soát (5.3.2.3)'],
  ['layers', '<b class="pos">Lộ trình hộ → doanh nghiệp:</b> ưu đãi giảm dần thay vì "vách đá"', '"Trần kính"', 'Điều hòa (5.3.2.2)'],
  ['shield', '<b class="pos">Ổn định ngưỡng tối thiểu 3 năm</b>; công bố trước công thức điều chỉnh', 'Ngưỡng đổi nhanh', 'Giải quyết mâu thuẫn (5.3.2.4)'],
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
  ${foot({ src: 'Bộ GD&ĐT, 2019, Ch.5 mục 5.3.2 · đề xuất của nhóm' })}`,
};
