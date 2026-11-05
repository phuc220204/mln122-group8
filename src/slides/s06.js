import { kicker, title, foot, pg } from './_kit.js';
import { icon } from '../components/icons.js';

export default {
  title: 'Lợi ích nhóm',
  section: 'Phần 1.1 · Lý luận',
  scene: 'groups',
  cls: 'has-gl',
  html: `
  <div class="gl gl-corner" data-gl="powerShells" role="img" aria-label="Khối 3D: cá nhân ở tâm, nhóm bao quanh, xã hội bên ngoài; quyền lực màu đỏ nấp sau nhóm"></div>
  ${kicker('06', 'Lợi ích nhóm')}
  ${title('Lợi ích nhóm không xấu – <em class="neg">trừ khi có quyền lực đứng sau</em>')}
  <div class="s06-grid">
    <div class="s06-left">
      <ol class="strata">
        <li data-a="left"><span class="st-n mono">01</span><p>Lợi ích cá nhân là <b class="pos">cơ sở, nền tảng</b> ${pg('tr.128')}.</p></li>
        <li data-a="left"><span class="st-n mono">02</span><p>Lợi ích xã hội <b class="data">định hướng</b> lợi ích cá nhân ${pg('tr.132')}.</p></li>
        <li data-a="left"><span class="st-n mono">03</span><p>Lợi ích nhóm = liên kết cùng ngành, lĩnh vực để thực hiện tốt hơn lợi ích riêng ${pg('tr.132')}.</p></li>
      </ol>
      <blockquote class="quote s06-q" data-a>Ở đâu không có lợi ích chung thì ở đó không thể có sự thống nhất về mục đích và cũng không thể có sự thống nhất về hành động được.<cite>— PH.ĂNGGHEN</cite></blockquote>
    </div>
    <div class="s06-right">
      <section class="card pos s06-col" data-a="up">
        <div class="lbl">${icon('shield')} TÍCH CỰC → tôn trọng, bảo vệ</div>
        <p>Phù hợp lợi ích quốc gia, không gây hại lợi ích khác</p>
      </section>
      <section class="card neg s06-col" data-a="up">
        <div class="lbl">${icon('alert')} TIÊU CỰC → ngăn chặn (tr.133)</div>
        <p>Có <b class="neg">công chức, cơ quan công quyền</b> tham gia → quyền lực bị lạm dụng</p>
        <p class="hidden-hand"><span class="redact"><b class="neg">Thường không lộ diện</b></span> → chống "vô cùng khó khăn"</p>
      </section>
      <p class="s06-note" data-a>Một cá nhân tự ý trốn thuế là <b class="neg">vi phạm cá nhân</b>, làm tổn hại lợi ích xã hội (tr.132), nhưng <b class="neg">chưa phải "lợi ích nhóm"</b>. Lợi ích nhóm đòi hỏi có <b class="pos">liên kết</b> giữa nhiều chủ thể (tr.132).</p>
    </div>
  </div>
  ${foot({ src: 'Bộ GD&ĐT, 2019, Ch.5 mục 5.3.1.2 (tr.128, 132–133); C.Mác & Ph.Ăngghen, 1995a, t.8, tr.28 (dẫn theo giáo trình tr.132)' })}`,
  // hovering a card shows that side of the group-interest prop; leaving returns to the revealed (negative) state
  mount(el) {
    const send = (mode) => window.dispatchEvent(new CustomEvent('gl:mode', { detail: { key: 'powerShells', mode } }));
    el.querySelector('.s06-col.pos').addEventListener('mouseenter', () => send('pos'));
    el.querySelector('.s06-col.neg').addEventListener('mouseenter', () => send('neg'));
    el.querySelectorAll('.s06-col').forEach((c) => c.addEventListener('mouseleave', () => send('neg')));
  },

  enter(el, tl) {
    tl.fromTo(el.querySelector('.redact'), { '--r': 1 }, { '--r': 0, duration: 1.4, ease: 'power2.inOut' }, 2.0);
  },
};
