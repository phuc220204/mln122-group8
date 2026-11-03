import { kicker, title, foot, photo } from './_kit.js';

const steps = ['Lý luận', 'Quan điểm nhóm', 'Thực tiễn chính sách', 'Quan điểm nhóm', 'Bài học cho sinh viên'];

export default {
  title: 'Đặt vấn đề',
  section: 'Mở đầu',
  scene: 'problem',
  html: `
  ${photo('saigon-market.jpg', 'bleed', '', 'Ảnh: Mstyslav Chernov · CC BY-SA 3.0')}
  ${kicker('02', 'Đặt vấn đề')}
  ${title('Một con số ngưỡng – <em class="pos">3,5 triệu</em> người kinh doanh bị tác động')}
  <div class="s02-main">
    <div class="metric" data-a="left">
      <span class="mv" data-count="3.5" data-decimals="1" data-at="0.6">3,5</span><span class="mu">triệu</span>
    </div>
    <blockquote class="q-lead" data-a>Khi Nhà nước đổi cách thu thuế hộ kinh doanh, ai được, ai mất – và Nhà nước điều hòa thế nào?</blockquote>
  </div>
  <ol class="roadmap">
    ${steps.map((s, i) => `
      <li class="rm ${i === 1 || i === 3 ? 'pos' : ''}" data-a data-gap="0.12">
        <span class="mono">0${i + 1}</span><b>${s}</b>
      </li>${i < 4 ? `<li class="rm-arrow" data-a="fade" data-gap="0.02"><svg viewBox="0 0 60 20"><path d="M2 10H54M46 3l8 7-8 7" data-draw="${1.2 + i * 0.18}" data-dur="0.5"/></svg></li>` : ''}`).join('')}
  </ol>
  ${foot({ src: 'Tạp chí Kinh tế – Tài chính, 2026a' })}`,
};
