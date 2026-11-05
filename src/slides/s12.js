import { kicker, title, foot, photo } from './_kit.js';
import { icon } from '../components/icons.js';

/*
 * Data-flow diagram in the style of Slide_V1 page 9: the household's money moves through the three
 * intermediaries named on the slide, into the "đường ống dữ liệu", and on to the State.
 */
const WIRES = ['s12a1', 's12a2', 's12a3', 's12b1', 's12b2', 's12b3', 's12c'];
const flowSvg = `
<svg class="dflow" viewBox="0 0 1180 170" role="img" aria-label="Hộ → ngân hàng, ví điện tử, sàn thương mại điện tử → đường ống dữ liệu → Nhà nước">
  <rect class="node" x="0" y="58" width="104" height="54"/><text class="nt" x="52" y="92" text-anchor="middle">HỘ</text>
  <path id="s12a1" class="wire" d="M104 85 C 200 85, 200 25, 292 25"/>
  <path id="s12a2" class="wire" d="M104 85 H 292"/>
  <path id="s12a3" class="wire" d="M104 85 C 200 85, 200 145, 292 145"/>
  <g transform="translate(300 8)">
    <path class="ico" d="M2 12 L17 3 L32 12 Z M5 14 V28 M12 14 V28 M22 14 V28 M29 14 V28 M1 31 H33"/>
    <text class="lt" x="46" y="24">Ngân hàng</text>
  </g>
  <g transform="translate(300 68)">
    <rect class="ico" x="0" y="0" width="34" height="34" rx="2"/>
    <g class="qrm"><rect x="4" y="4" width="9" height="9"/><rect x="21" y="4" width="9" height="9"/><rect x="4" y="21" width="9" height="9"/><rect x="17" y="17" width="4" height="4"/><rect x="24" y="22" width="5" height="5"/><rect x="16" y="26" width="4" height="4"/></g>
    <rect class="scan" x="-3" y="1" width="40" height="2"/>
    <text class="lt" x="46" y="23">ví điện tử</text>
  </g>
  <g transform="translate(300 128)">
    <path class="ico" d="M0 9 L16 1 L32 9 L32 30 L16 38 L0 30 Z M0 9 L16 17 L32 9 M16 17 V38"/>
    <text class="lt" x="46" y="25">sàn thương mại điện tử</text>
  </g>
  <path id="s12b1" class="wire" d="M560 25 C 640 25, 640 85, 712 85"/>
  <path id="s12b2" class="wire" d="M560 85 H 712"/>
  <path id="s12b3" class="wire" d="M560 145 C 640 145, 640 85, 712 85"/>
  <rect class="pulse" x="716" y="55" width="220" height="60"/>
  <rect class="hub" x="716" y="55" width="220" height="60"/>
  <text class="ht" x="826" y="91" text-anchor="middle">"đường ống dữ liệu"</text>
  <path id="s12c" class="wire strong" d="M936 85 H 1036"/>
  <rect class="node gold" x="1040" y="58" width="140" height="54"/><text class="nt gold" x="1110" y="92" text-anchor="middle">NHÀ NƯỚC</text>
  ${WIRES.map((id, i) => `<circle r="4" class="dot${i === 6 ? ' g' : ''}"><animateMotion dur="${i === 6 ? 1.4 : 2.2}s" begin="${(i % 3) * 0.6}s" repeatCount="indefinite"><mpath href="#${id}"/></animateMotion></circle>`).join('')}
</svg>`;

const chips = (arr) => `<ul class="bt-items">${arr.map((t) => `<li>${t}</li>`).join('')}</ul>`;

export default {
  title: 'Công cụ điều hòa',
  section: 'Phần 1.2 · Thực tiễn',
  scene: 'tools',
  steps: 5,
  html: `
  ${kicker('12', 'Công cụ điều hòa')}
  ${title('Đủ <em class="pos">4 công cụ</em> (tr.134)')}
  <div class="bento">
    <section class="bt-cell law" data-step="1">
      <header>${icon('gavel')}<h3>PHÁP LUẬT</h3></header>
      ${chips(['NQ 198/2025/QH15', 'Luật QLT 108/2025/QH15', 'Luật sửa 4 luật thuế (2026)', 'NĐ 68 &amp; NĐ 141/2026'])}
    </section>
    <section class="bt-cell eco" data-step="2">
      <div class="gl eco-towers" data-gl="towers" role="img" aria-label="Tháp ngưỡng 3D: 500 triệu (NĐ 68/2026) và 1 tỷ (NĐ 141/2026)"></div>
      <header>${icon('coins')}<h3>KINH TẾ</h3></header>
      ${chips(['Ngưỡng <b class="pos">1 tỷ</b> không phải nộp GTGT, TNCN', 'giảm <b class="pos">30%</b> thuế thu nhập 2026–2027 (99,86% cá nhân, hộ kinh doanh thuộc diện)', 'xử lý tiền nộp thừa'])}
    </section>
    <section class="bt-cell adm" data-step="3">
      ${photo('qr-payment.jpg', 'cold bt-photo')}
      <header>${icon('building')}<h3>HÀNH CHÍNH</h3></header>
      ${chips(['Kê khai và hóa đơn điện tử', 'thông báo tài khoản (NĐ 68, Điều 13)', 'sàn thương mại điện tử khấu trừ, nộp thay (NĐ 252/2026)', 'chỉ được kiểm tra tại trụ sở trong trường hợp luật định (Luật QLT, Điều 22)'])}
    </section>
    <section class="bt-cell edu" data-step="4">
      ${photo('bookkeeping.jpg', 'bt-photo')}
      <header>${icon('grad')}<h3>GIÁO DỤC</h3><b class="bt-big mono"><span data-count="91.2" data-decimals="1" data-at="1.2">91,2</span>%</b></header>
      ${chips(['Cơ quan thuế phải hướng dẫn, mở đường dây nóng, công khai quy trình (NĐ 68, Điều 16)', 'tài liệu tuyên truyền "Những điều cơ bản người nộp thuế cần biết" (CV 6436/CT-PC)', '<b class="pos">91,2%</b> hộ dùng eTax Mobile'])}
    </section>
  </div>
  <div class="pipe" data-step="5">
    ${flowSvg}
    <p class="small">Ngân hàng, ví điện tử, sàn thương mại điện tử là <b class="data">chủ thể trung gian</b> (Mục 2.3.3, tr.49–50), đóng vai trò "đường ống dữ liệu" giữa Nhà nước và hộ.</p>
  </div>
  ${foot({ src: 'Quốc hội, 2025a, 2025b, 2026a, 2026b; Chính phủ, 2026a, 2026b, 2026c; Luật sư Việt Nam, 2026; Tạp chí Kinh tế – Tài chính, 2026a, 2026c' })}`,
  onStep(el, n) {
    if (n === 2) window.dispatchEvent(new CustomEvent('gl:replay', { detail: 'towers' }));
  },
};
