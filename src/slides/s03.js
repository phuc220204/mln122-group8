import { kicker, title, foot, pg } from './_kit.js';
import { icon } from '../components/icons.js';

const cards = [
  ['Khái niệm', 'coins', 'Lợi ích <b class="pos">vật chất</b> thu được khi thực hiện hoạt động kinh tế', 'tr.123'],
  ['Bản chất', 'target', 'Mục đích, động cơ của quan hệ giữa các chủ thể', 'tr.123'],
  ['Biểu hiện', 'users', 'Chủ doanh nghiệp → lợi nhuận · Người lao động → thu nhập', 'tr.124'],
  ['Vai trò', 'spark', 'Động lực trực tiếp · cơ sở thúc đẩy các lợi ích khác', 'tr.124–126'],
];

export default {
  title: 'Lợi ích kinh tế',
  section: 'Phần 1.1 · Lý luận',
  scene: 'interest',
  cls: 'has-gl',
  html: `
  <div class="gl gl-corner" data-gl="coins" aria-hidden="true"></div>
  ${kicker('03', 'Lợi ích kinh tế')}
  ${title('Mọi quan hệ kinh tế <em class="pos">bắt đầu từ lợi ích</em>', 'l')}
  <blockquote class="quote s03-q" data-a>Những quan hệ kinh tế của một xã hội nhất định nào đó biểu hiện trước hết dưới hình thái lợi ích.<cite>— PH.ĂNGGHEN</cite></blockquote>
  <div class="s03-cards">
    ${cards.map(([h, ic, body, p], i) => `
      <article class="card hoverable ${i === 0 ? 'pos' : ''}" data-a="flip" data-gap="0.12">
        <div class="c-top"><span class="num-tag">0${i + 1}</span>${icon(ic)}</div>
        <div class="lbl">${h}</div>
        <p class="c-body">${body}</p>
        <span class="c-pg mono">${p}</span>
      </article>`).join('')}
  </div>
  <p class="s03-close" data-a>Chỉ lợi ích <b class="pos">chính đáng, hợp lý, hợp pháp</b> mới là động lực. Lợi ích không chính đáng thành <b class="neg">trở ngại</b> ${pg('tr.126')}.</p>
  ${foot({ src: 'Bộ GD&ĐT, 2019, Ch.5 mục 5.3.1.1 (tr.123–126); C.Mác & Ph.Ăngghen, 1995b, t.18, tr.376 (dẫn theo giáo trình tr.124)' })}`,
};
