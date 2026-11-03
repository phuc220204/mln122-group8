import { kicker, title } from './_kit.js';
import { icon } from '../components/icons.js';

const cards = [
  ['Thống nhất và mâu thuẫn cùng tồn tại:', 'bỏ khoán làm cả hai mặt lộ rõ.'],
  ['Nhà nước điều hòa bằng 4 công cụ:', 'chính sách đúng hướng, cần ổn định hơn.'],
  ['Mỗi sinh viên là một chủ thể:', 'hài hòa lợi ích bắt đầu từ cá nhân.'],
];

export default {
  title: 'Thông điệp của nhóm',
  section: 'Phần 1.3 · Bài học cho sinh viên',
  scene: 'message',
  html: `
  ${kicker('18', 'Thông điệp của nhóm')}
  ${title('Minh bạch để <em class="pos">cùng lớn lên</em> – không phải để <em class="neg">chia nhau ít đi</em>', 'l')}
  <div class="concl">
    ${cards.map(([h, t], i) => `
      <article class="card pos hoverable" data-a="flip" data-gap="0.14">
        <span class="cc-n mono">0${i + 1}</span>
        <p><b>${h}</b> ${t}</p>
      </article>`).join('')}
  </div>
  <div class="ask" data-a>
    <span class="ask-l mono">Câu hỏi gợi mở cho phần phản biện</span>
    <p class="ask-q">${icon('ring', 'ask-i pos-t')}<em>Ngưỡng 1 tỷ là <span class="pos-t">"phao cứu sinh"</span> hay <span class="neg-t">"trần kính"</span>?</em>${icon('ceiling', 'ask-i neg-t')}</p>
  </div>
  <p class="thanks" data-a="scale">Cảm ơn thầy/cô và các bạn đã lắng nghe!</p>`,
};
