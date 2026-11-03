import { kicker, title, foot } from './_kit.js';

const rows = [
  ['Mâu thuẫn lợi ích là thuộc tính của kinh tế thị trường, không phải "lỗi" của chính sách', '"Mâu thuẫn giữa các lợi ích kinh tế là khách quan" (tr.137)'],
  ['Điều hòa <b class="pos">không phải chia đều</b>, mà là làm "chiếc bánh" lớn hơn rồi chia hợp lý hơn', 'Phát triển lực lượng sản xuất là điều kiện vật chất của công bằng (tr.135)'],
  ['<b class="pos">Minh bạch</b> là mẫu số chung để các lợi ích gặp nhau', 'Công khai, minh bạch mọi cơ chế, chính sách để chống lạm quyền (tr.136–137)'],
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
  <div class="gauge" data-a>
    <span class="g-arrow mono">→</span>
    <p>Thước đo cho phần thực tiễn: bỏ khoán có làm "chiếc bánh" <b class="pos">lớn hơn</b> và <b class="pos">minh bạch hơn</b> không?</p>
    <div class="g-bars"><div><span class="mono">LỚN HƠN</span><i></i></div><div><span class="mono">MINH BẠCH HƠN</span><i></i></div></div>
  </div>
  ${foot({ src: 'Bộ GD&ĐT, 2019, tr.135–137 · vận dụng của nhóm' })}`,
  enter(el, tl) {
    tl.fromTo(el.querySelectorAll('.g-bars i'), { scaleX: 0 }, { scaleX: 1, duration: 1.2, stagger: 0.2, ease: 'power2.out' }, 1.6);
  },
};
