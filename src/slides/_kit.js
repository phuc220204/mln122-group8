// Shared markup helpers for slide templates.
export const kicker = (n, label) =>
  `<div class="kicker"><span class="kn">${n}</span><span class="kbar"></span><span>${label}</span></div>`;

export const title = (html, size = '') => `<h1 class="title ${size}">${html}</h1>`;

export const foot = ({ limit, src } = {}) =>
  `<footer class="foot">${limit ? `<div class="limit">${limit}</div>` : ''}${src ? `<div class="src">${src}</div>` : ''}</footer>`;

export const photo = (file, cls = '', style = '', credit = '') =>
  `<figure class="photo ${cls}" style="${style}"><img src="/photos/${file}" alt="" loading="eager" decoding="async" draggable="false">${credit ? `<figcaption class="credit">${credit}</figcaption>` : ''}</figure>`;

export const pg = (t) => `<span class="pg">(${t})</span>`;

/* Draw a smooth connector between two elements inside a slide (stage coordinates). */
export function connect(svg, a, b, { from = 'bottom', to = 'top', cls = '' } = {}) {
  const host = svg.parentElement.getBoundingClientRect();
  const scale = host.width / svg.parentElement.offsetWidth || 1;
  const ra = a.getBoundingClientRect();
  const rb = b.getBoundingClientRect();
  const pt = (r, side) => {
    const x = side === 'left' ? r.left : side === 'right' ? r.right : r.left + r.width / 2;
    const y = side === 'top' ? r.top : side === 'bottom' ? r.bottom : r.top + r.height / 2;
    return [(x - host.left) / scale, (y - host.top) / scale];
  };
  const [x1, y1] = pt(ra, from);
  const [x2, y2] = pt(rb, to);
  const my = (y1 + y2) / 2;
  const d = from === 'bottom' || from === 'top'
    ? `M${x1},${y1} C${x1},${my} ${x2},${my} ${x2},${y2}`
    : `M${x1},${y1} C${(x1 + x2) / 2},${y1} ${(x1 + x2) / 2},${y2} ${x2},${y2}`;
  const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  p.setAttribute('d', d);
  if (cls) p.setAttribute('class', cls);
  svg.appendChild(p);
  return p;
}
