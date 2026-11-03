import { kicker, title, foot, pg } from './_kit.js';
import { icon } from '../components/icons.js';

export default {
  title: 'Thống nhất >< Mâu thuẫn',
  section: 'Phần 1.1 · Lý luận',
  scene: 'unity',
  steps: 1,
  html: `
  ${kicker('04', 'Thống nhất &gt;&lt; Mâu thuẫn')}
  ${title('Cùng một chiếc bánh – <em class="pos">vừa cùng làm,</em> <em class="neg">vừa giành phần</em>')}
  <p class="s04-def" data-a><span class="h-lbl">Định nghĩa</span> Quan hệ lợi ích kinh tế là sự thiết lập tương tác giữa các chủ thể nhằm xác lập lợi ích kinh tế ${pg('tr.126')}.</p>
  <div class="versus">
    <section class="vs-col pos" data-a="left">
      <header><span class="vs-h">THỐNG NHẤT</span><span class="mono">(tr.127)</span></header>
      <ul>
        <li>Chủ thể này là bộ phận của chủ thể kia</li>
        <li>Mục tiêu của bên này chỉ đạt được khi phù hợp với bên kia</li>
        <li>Sản lượng, thu nhập quốc dân tăng → mọi chủ thể hưởng lợi</li>
      </ul>
    </section>
    <div class="vs-mid" data-a="fade">
      <svg viewBox="0 0 80 420" preserveAspectRatio="none"><path d="M40 0 L52 60 L30 120 L50 190 L28 250 L48 320 L34 380 L40 420" data-draw="0.7" data-dur="1.4"/></svg>
      <span class="vs-x mono">&gt;&lt;</span>
    </div>
    <section class="vs-col neg" data-a="right">
      <header><span class="vs-h">MÂU THUẪN</span><span class="mono">(tr.127–128)</span></header>
      <ul>
        <li>Phương thức khác nhau đến mức đối lập: hàng giả, buôn lậu, <b class="neg">trốn thuế</b></li>
        <li>Kết quả sản xuất đã xác định → thu nhập bên này tăng thì bên kia <b class="neg">giảm</b></li>
      </ul>
    </section>
  </div>
  <div class="band neg s04-band" data-step="1">${icon('alert', 'bico')}<span class="bt">Mâu thuẫn lợi ích là <b>"cội nguồn của các xung đột xã hội"</b> → cần điều hòa ${pg('tr.128')}.</span></div>
  ${foot({ src: 'Bộ GD&ĐT, 2019, Ch.5 mục 5.3.1.2 (tr.126–128)' })}`,
};
