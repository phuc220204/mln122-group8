import { kicker, title, foot, photo, pg } from './_kit.js';

const qs = [
  ['Chính đáng?', 'Đúng luật, nội quy, đạo đức'],
  ['Hại ai?', 'Bạn học, nhà trường, đối tác, người tiêu dùng'],
  ['Minh bạch?', 'Dám công khai cách làm'],
  ['Bền vững?', 'Lợi trước mắt có đổi bằng uy tín?'],
];

export default {
  title: 'Bài học cho sinh viên (1)',
  section: 'Phần 1.3 · Bài học cho sinh viên',
  scene: 'lesson1',
  cls: 'has-gl',
  html: `
  ${photo('student-teamwork.jpg', 'side-photo')}
  <div class="gl gl-corner" data-gl="receipt" aria-hidden="true"></div>
  ${kicker('16', 'Bài học cho sinh viên (1)')}
  ${title('Lợi ích cá nhân là động lực – <em class="pos">nhưng phải "có hóa đơn"</em>')}
  <p class="s16-base" data-a><span class="h-lbl">Cơ sở</span> Lợi ích cá nhân chính đáng được pháp luật bảo vệ ${pg('tr.128')}; lợi ích không chính đáng thành trở ngại ${pg('tr.126')}.</p>
  <div class="receipts">
    ${qs.map(([q, a], i) => `
      <article class="rcpt" data-a="flip" data-gap="0.12">
        <span class="r-no mono">#0${i + 1}</span>
        <h3>${q}</h3>
        <p>${a}</p>
        <span class="r-check"><svg viewBox="0 0 24 24"><path d="M4 12l5 5L20 6" data-draw="${1.4 + i * 0.2}" data-dur="0.5"/></svg></span>
      </article>`).join('')}
  </div>
  <div class="s16-cols">
    <section data-a="left"><div class="h-lbl pos-t">Trong học tập</div><ul class="tags">
      <li>Trung thực học thuật</li><li>không "ăn theo" bài nhóm</li><li>tôn trọng quyền tác giả</li><li class="em"><b class="pos">khai báo việc dùng AI</b></li></ul></section>
    <section data-a="right"><div class="h-lbl pos-t">Trong công việc</div><ul class="tags">
      <li>Làm thêm đúng hợp đồng</li><li>bán online thì khai báo, không bán hàng giả</li><li>từ chối "đường tắt"</li></ul></section>
  </div>
  ${foot({ src: 'Bộ GD&ĐT, 2019, tr.126, 128' })}`,
};
