import { kicker, title, foot, pg, photo } from './_kit.js';
import { icon } from '../components/icons.js';

const roles = [
  ['BẢO VỆ &amp; TẠO MÔI TRƯỜNG', 'pháp luật thông thoáng', 'tr.134'],
  ['ĐIỀU HÒA', 'cá nhân – DN – xã hội', 'tr.135'],
  ['KIỂM SOÁT, NGĂN NGỪA', 'bộ máy liêm chính, công khai', 'tr.135–137'],
  ['GIẢI QUYẾT MÂU THUẪN', 'kịp thời; các bên cùng tham gia', 'tr.137'],
];
const tools = [['Giáo dục', 'grad'], ['Pháp luật', 'gavel'], ['Hành chính', 'building'], ['Kinh tế', 'coins']];

export default {
  title: 'Vai trò của Nhà nước',
  section: 'Phần 1.1 · Lý luận',
  scene: 'state',
  cls: 'has-gl',
  html: `
  ${photo('national-assembly.jpg', 'bleed cold s07-photo', '', 'Ảnh: Christophe95 · CC BY-SA 4.0')}
  <div class="gl gl-corner" data-gl="scale" aria-hidden="true"></div>
  ${kicker('07', 'Vai trò của Nhà nước')}
  ${title('Thị trường <em class="neg">không tự hài hòa</em> – cần Nhà nước')}
  <div class="s07-top">
    <div class="s07-methods" data-a>
      <div class="h-lbl"><b class="pos">2 phương thức thực hiện lợi ích</b> <span class="mono">(tr.133)</span></div>
      <ul>
        <li><span class="mono">A</span>Theo nguyên tắc thị trường.</li>
        <li><span class="mono">B</span>Theo chính sách Nhà nước và vai trò các tổ chức xã hội. Lý do: chỉ dựa vào thị trường thì tất yếu dẫn đến hạn chế xã hội.</li>
      </ul>
    </div>
    <div class="s07-tools" data-a>
      <div class="h-lbl"><b class="pos">4 công cụ</b> <span class="mono">(tr.134)</span></div>
      <ul>${tools.map(([t, ic]) => `<li>${icon(ic)}<span>${t}</span></li>`).join('<li class="dot">·</li>')}</ul>
    </div>
  </div>
  <div class="flow">
    <div class="h-lbl flow-h" data-a="fade">Sơ đồ 4 vai trò nối tiếp – Mục 5.3.2</div>
    <svg class="flow-line" viewBox="0 0 1700 40" preserveAspectRatio="none"><path d="M60 20 H1640" data-draw="0.9" data-dur="1.8"/></svg>
    <ol>
      ${roles.map(([h, s, p], i) => `
        <li class="node" data-a data-gap="0.18">
          <span class="nd mono">[${i + 1}]</span>
          <h3>${h}</h3>
          <p>${s}</p>
          <span class="mono pg">(${p})</span>
        </li>`).join('')}
    </ol>
  </div>
  <div class="s07-bottom">
    <div class="box54" data-a="left">
      <span class="b-tag mono">HỘP 5.4 · tr.137</span>
      <p>Xóa cơ chế "xin – cho"; ngăn "lợi ích nhóm", "sân sau" trong các lĩnh vực, <b class="neg">có lĩnh vực thuế</b>.</p>
    </div>
    <p class="small s07-note" data-a>Nhà nước cũng là một chủ thể thị trường, có nhiệm vụ khắc phục khuyết tật thị trường ${pg('Mục 2.3.4, tr.50–51')}.</p>
  </div>
  ${foot({ src: 'Bộ GD&ĐT, 2019, Ch.2 mục 2.3.4 (tr.50–51), Ch.5 mục 5.3.2 (tr.133–137); BCH Trung ương, 2016, mục IV.2' })}`,
};
