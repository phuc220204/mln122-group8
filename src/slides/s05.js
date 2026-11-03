import { kicker, title, foot, connect } from './_kit.js';

const factors = [
  ['Trình độ lực lượng sản xuất', 'Hóa đơn điện tử, QR, ứng dụng thuế → đo được doanh thu thật'],
  ['Địa vị chủ thể trong quan hệ sản xuất', 'Chủ hộ <i>tự xác định</i> doanh thu; người làm thuê ở thế yếu'],
  ['<b class="pos">Chính sách phân phối của Nhà nước</b>', 'Một con số ngưỡng quyết định ai nộp thuế'],
  ['Hội nhập kinh tế quốc tế', 'Tiểu thương cạnh tranh với hàng bán qua sàn thương mại điện tử'],
];
const relations = ['Lao động – sử dụng lao động', 'Giữa những người sử dụng lao động', 'Giữa những người lao động', 'Cá nhân – nhóm – xã hội'];

export default {
  title: 'Nhân tố ảnh hưởng',
  section: 'Phần 1.1 · Lý luận',
  scene: 'factors',
  steps: 5,
  html: `
  <div class="ghost-year" data-wm-from="2016" data-wm-to="2026" aria-hidden="true">2026</div>
  ${kicker('05', 'Nhân tố ảnh hưởng')}
  ${title('Vì sao <em class="pos">2026</em> – chứ không phải 10 năm trước?')}
  <div class="s05-head" data-a="fade"><span class="h-lbl">Nhân tố (tr.128–129)</span><span class="h-lbl pos-t">Liên hệ thuế hộ kinh doanh</span></div>
  <div class="s05-cards factors" data-a="fade">
    ${factors.map(([f, l], i) => `
      <article class="factor ${i === 2 ? 'focus' : ''}" data-step="${i + 1}">
        <span class="f-num">${i + 1}</span>
        <h3 class="f-t">${f}</h3>
        <p class="f-l">${l}</p>
      </article>`).join('')}
  </div>
  <div class="s05-rel" data-step="5">
    <div class="rel-h" data-a="left"><b class="pos">4 quan hệ cơ bản</b> <span class="mono">(tr.129–132)</span></div>
    <ul class="rel-list">
      ${relations.map((r, i) => `<li class="${i === 1 ? 'focus' : ''}"><span class="mono">${i + 1}</span>${r}</li>`).join('')}
    </ul>
  </div>
  <p class="s05-focus" data-step="5"><span class="h-lbl">Trọng tâm</span> <b class="pos">nhân tố 3</b> và <b class="pos">quan hệ 2</b>.</p>
  <svg class="wire s05-wire" data-step="5"></svg>
  ${foot({ src: 'Bộ GD&ĐT, 2019, Ch.5 mục 5.3.1.2 (tr.128–132)' })}`,

  // the column being presented gets its "liên hệ" line lit (Slide_V1 style); step 5 returns focus to factor 3
  onStep(el, n) {
    el.querySelectorAll('.factor').forEach((c, k) => c.classList.toggle('on', n === 5 ? k === 2 : k === n - 1));
  },

  mount(el) {
    const svg = el.querySelector('.s05-wire');
    const draw = () => {
      svg.innerHTML = '';
      const p = connect(svg, el.querySelector('.s05-cards .focus'), el.querySelector('.rel-list .focus'), { cls: 'wire-gold' });
      p.dataset.draw = '1.5';
    };
    document.fonts.ready.then(draw);
    // the stage stretches with the viewport, so the connector must follow
    let t;
    window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(draw, 250); });
  },
};
