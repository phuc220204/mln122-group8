import { kicker, title, foot } from './_kit.js';

const rows = [
  ['Mâu thuẫn lợi ích là thuộc tính của kinh tế thị trường, không phải "lỗi" của chính sách', '"Mâu thuẫn giữa các lợi ích kinh tế là khách quan" (tr.137)'],
  ['Điều hòa <b class="pos">không phải chia đều</b>, mà là làm "chiếc bánh" lớn hơn rồi chia hợp lý hơn', 'Phát triển lực lượng sản xuất là điều kiện vật chất của công bằng (tr.135)'],
  ['<b class="pos">Minh bạch</b> là mẫu số chung để các lợi ích gặp nhau', 'Công khai, minh bạch mọi cơ chế, chính sách để chống lạm quyền (tr.136–137)'],
];

const measures = [
  ['Minh bạch hơn?', 'Tỷ lệ kê khai đúng hạn, số hộ dùng hóa đơn điện tử'],
  ['Lớn hơn?', 'Số thu tăng thêm do bỏ khoán, số hộ chuyển lên doanh nghiệp'],
  ['Hài hòa hơn?', 'Gánh nặng thuế và chi phí tuân thủ của hộ nhỏ có giảm hay tăng'],
];

export default {
  title: 'Quan điểm nhóm (1)',
  section: 'Phần 1.1 · Lý luận',
  scene: 'view1',
  html: `
  ${kicker('08', 'Nhìn lại lý luận · Quan điểm nhóm')}
  ${title('Mâu thuẫn <em class="neg">không xóa được</em> – chỉ <em class="pos">điều hòa được</em>', 'l')}
  <div class="thesis">
    <div class="th-head" data-a="fade"><span class="h-lbl">#</span><span class="h-lbl">Nhóm cho rằng</span><span class="h-lbl">Căn cứ</span></div>
    ${rows.map(([a, b], i) => `
      <div class="th-row" data-a data-gap="0.16">
        <span class="th-n">${i + 1}</span>
        <p class="th-a">${a}</p>
        <p class="th-b mono">${b}</p>
      </div>`).join('')}
  </div>
  <p class="m3-h" data-a><span class="g-arrow mono">→</span> <b class="pos">3 thước đo</b> nhóm dùng cho phần thực tiễn:</p>
  <div class="m3">
    ${measures.map(([q, how]) => `
      <article class="m3-c" data-a data-gap="0.1">
        <h3>${q}</h3>
        <p>${how}</p>
      </article>`).join('')}
  </div>
  ${foot({ src: 'Bộ GD&ĐT, 2019, tr.135–137 · vận dụng của nhóm' })}`,
};
