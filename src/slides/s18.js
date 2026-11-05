import { kicker, title } from './_kit.js';

const cards = [
  ['Thống nhất và mâu thuẫn cùng tồn tại:', 'bỏ khoán làm cả hai mặt lộ rõ.'],
  ['Nhà nước điều hòa bằng 4 công cụ:', 'chính sách đúng hướng; cần giữ ngưỡng ổn định và thu hẹp quyền tùy nghi ở khâu sau kê khai.'],
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
  <p class="thanks" data-a="scale">Cảm ơn thầy/cô và các bạn đã lắng nghe!</p>`,
};
