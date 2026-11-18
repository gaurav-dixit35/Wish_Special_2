/* js/bouquet.js: hand-tied bouquet (inline SVG). API unchanged: drawBouquet(sizePx, variant). */
const INK = "#57485a";
let uid = 0;

/* ---- helpers ------------------------------------------------------------ */
const f1 = (n) => Math.round(n * 10) / 10;
const quad = (t, a, c, b) => {
  // point on a quadratic curve
  const u = 1 - t;
  return [
    u * u * a[0] + 2 * u * t * c[0] + t * t * b[0],
    u * u * a[1] + 2 * u * t * c[1] + t * t * b[1],
  ];
};
const tangent = (t, a, c, b) => {
  // direction (degrees) of the curve
  const u = 1 - t;
  const dx = 2 * u * (c[0] - a[0]) + 2 * t * (b[0] - c[0]);
  const dy = 2 * u * (c[1] - a[1]) + 2 * t * (b[1] - c[1]);
  return (Math.atan2(dy, dx) * 180) / Math.PI;
};

/* ---- flowers ------------------------------------------------------------ */
const rose = (x, y, s = 1, a = 0, tone = 0) => {
  const d = tone ? "#ee8aa0" : "#e8788f",
    l = tone ? "#f7b8c6" : "#f4a9b8";
  return `<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})" stroke="${INK}" stroke-width="1.3" stroke-linejoin="round">
  <circle r="29" fill="${l}"/>
  <path d="M-2-27Q10-31 18-22Q31-16 26-3Q31 10 18 17Q11 30-2 25Q-15 31-22 19Q-34 11-26-2Q-31-16-17-22Q-11-30-2-27Z" fill="${d}"/>
  <path d="M-4-21Q7-25 14-16Q24-10 19 0Q24 10 12 15Q7 23-4 19Q-15 24-19 12Q-27 5-18-5Q-22-14-11-19Q-8-22-4-21Z" fill="${l}"/>
  <path d="M-3-15Q5-19 11-12Q18-6 12 1Q17 8 7 12Q0 17-7 10Q-17 7-12-2Q-17-9-9-13Q-6-16-3-15Z" fill="${d}"/>
  <path d="M-2-9Q4-12 8-7Q13-2 7 2Q12 7 3 9Q-3 12-7 6Q-12 2-7-3Q-10-8-2-9Z" fill="${l}"/>
  <path d="M-1-4Q4-7 6-2Q9 2 4 4Q0 7-3 3Q-7 0-3-3Z" fill="${d}"/>
  <ellipse cx="-13" cy="-14" rx="5" ry="3.2" fill="#ffd9e2" stroke="none" transform="rotate(-32 -13 -14)"/>
  <path d="M10 22Q22 14 26 2" fill="none" stroke="#c9566f" stroke-width="1.6" stroke-linecap="round" opacity=".35"/>
</g>`;
};

const peony = (
  x,
  y,
  s = 1,
  a = 0,
) => `<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})" stroke="${INK}" stroke-width="1.3" stroke-linejoin="round">
  <path d="M0-24Q9-30 15-20Q27-18 22-7Q30 3 19 12Q16 26 4 21Q-7 29-14 18Q-28 14-22 2Q-29-9-17-16Q-12-28 0-24Z" fill="#fff3e6"/>
  <path d="M-1-18Q8-23 13-14Q22-11 18-2Q24 6 14 12Q11 21 2 17Q-7 24-12 14Q-21 11-17 2Q-23-6-13-12Q-10-21-1-18Z" fill="#f4d7c8"/>
  <path d="M-1-11Q6-15 10-8Q17-5 13 2Q18 8 9 12Q5 17-2 12Q-10 17-13 8Q-19 4-12-2Q-16-8-8-10Q-6-13-1-11Z" fill="#fffaf3"/>
  <path d="M-1-5Q4-8 7-3Q11 1 6 5Q2 9-3 5Q-8 2-5-3Z" fill="#f5dfd4"/>
  <circle r="1.6" fill="#f5d98b" stroke="none"/>
  <ellipse cx="-10" cy="-12" rx="4" ry="2.6" fill="#fffdf8" stroke="none" transform="rotate(-35 -10 -12)"/>
</g>`;

const lisianthus = (
  x,
  y,
  s = 1,
  a = 0,
) => `<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})" stroke="${INK}" stroke-width="1.2" stroke-linejoin="round">
  <circle cy="-10" r="10" fill="#b9a7ff"/><circle cx="9.5" cy="-3" r="10" fill="#c9bcff"/>
  <circle cx="6" cy="8" r="10" fill="#b9a7ff"/><circle cx="-6" cy="8" r="10" fill="#c9bcff"/>
  <circle cx="-9.5" cy="-3" r="10" fill="#b9a7ff"/>
  <circle r="6" fill="#f4d7c8"/><circle r="2.5" fill="#f5d98b" stroke="none"/>
  <ellipse cx="-5" cy="-8" rx="2.7" ry="1.8" fill="#e6deff" stroke="none" transform="rotate(-35 -5 -8)"/>
</g>`;

/* ---- foliage (all rooted behind the flowers so nothing floats) ---------- */
const BASE = [100, 128];
const leaf = (
  ang,
  len,
  w,
  fill,
  edge,
) => `<g transform="translate(${BASE[0]} ${BASE[1]}) rotate(${ang})">
  <path d="M0 0C${-w} ${-len * 0.28} ${-w * 0.8} ${-len * 0.76} 0 ${-len}C${w * 0.8} ${-len * 0.76} ${w} ${-len * 0.28} 0 0Z" fill="${fill}" stroke="${edge}" stroke-width="1.3" stroke-linejoin="round"/>
  <path d="M0-4L0${-len * 0.82}" stroke="${edge}" stroke-width="1" stroke-linecap="round" opacity=".55" fill="none"/>
</g>`;

const eucalyptus = (ang, len, bend) => {
  const r = (ang * Math.PI) / 180;
  const end = [BASE[0] + Math.sin(r) * len, BASE[1] - Math.cos(r) * len];
  const ctl = [
    BASE[0] + Math.sin(r) * len * 0.5 + bend,
    BASE[1] - Math.cos(r) * len * 0.5,
  ];
  let out = `<path d="M${BASE[0]} ${BASE[1]}Q${f1(ctl[0])} ${f1(ctl[1])} ${f1(end[0])} ${f1(end[1])}" fill="none" stroke="#6fb08f" stroke-width="1.8" stroke-linecap="round"/>`;
  for (let i = 1; i <= 6; i++) {
    const t = 0.34 + i * 0.105,
      p = quad(t, BASE, ctl, end),
      side = i % 2 ? 1 : -1;
    out += `<circle cx="${f1(p[0] + side * 4.5)}" cy="${f1(p[1])}" r="${f1(6 - i * 0.35)}" fill="#b6dcc8" stroke="#7fb69a" stroke-width="1"/>`;
  }
  const last = quad(1, BASE, ctl, end);
  return (
    out +
    `<circle cx="${f1(last[0])}" cy="${f1(last[1])}" r="3.6" fill="#b6dcc8" stroke="#7fb69a" stroke-width="1"/>`
  );
};

const lavender = (tip, bend) => {
  const ctl = [(BASE[0] + tip[0]) / 2 + bend, (BASE[1] + tip[1]) / 2 + 6];
  let out = `<path d="M${BASE[0]} ${BASE[1]}Q${f1(ctl[0])} ${f1(ctl[1])} ${tip[0]} ${tip[1]}" fill="none" stroke="#5fa684" stroke-width="1.9" stroke-linecap="round"/>`;
  for (let i = 0; i < 8; i++) {
    const t = 0.58 + i * 0.058,
      p = quad(t, BASE, ctl, tip),
      ang = tangent(t, BASE, ctl, tip) + 90,
      side = i % 2 ? 1 : -1;
    out += `<ellipse cx="${f1(p[0] + side * 2.6)}" cy="${f1(p[1])}" rx="2.6" ry="4.1" fill="${i % 3 ? "#b9a7ff" : "#c9bcff"}" stroke="#8e7dc5" stroke-width=".9" transform="rotate(${f1(ang)} ${f1(p[0] + side * 2.6)} ${f1(p[1])})"/>`;
  }
  return out;
};

const gypsophila = (tip, bend) => {
  const ctl = [(BASE[0] + tip[0]) / 2 + bend, (BASE[1] + tip[1]) / 2];
  const dots = [
    [0, 0],
    [-6, 5],
    [6, 4],
    [-3, -7],
    [5, -6],
    [-9, -2],
    [9, 0],
  ];
  return (
    `<path d="M${BASE[0]} ${BASE[1]}Q${f1(ctl[0])} ${f1(ctl[1])} ${tip[0]} ${tip[1]}" fill="none" stroke="#8fc9a5" stroke-width="1.1" stroke-linecap="round"/>` +
    dots
      .map(
        ([dx, dy]) =>
          `<circle cx="${tip[0] + dx}" cy="${tip[1] + dy}" r="2.3" fill="#fffaf3" stroke="#d9c6b9" stroke-width=".7"/>`,
      )
      .join("")
  );
};

/* ---- the bouquet --------------------------------------------------------- */
export function drawBouquet(sizePx, variant = "gift") {
  const size = Math.max(48, Math.min(240, Math.round(Number(sizePx) || 110)));
  const kind = variant === "held" ? "held" : "gift";
  const gift = kind === "gift";
  const id = `bq${++uid}`;

  const foliage =
    [
      [-80, 58],
      [-62, 70],
      [-44, 76],
      [-24, 72],
      [-4, 68],
      [16, 74],
      [36, 78],
      [56, 72],
      [74, 66],
      [88, 54],
    ]
      .map(([a, l], i) =>
        leaf(
          a,
          Math.round(l * 1.2),
          15 + (i % 3) * 2,
          i % 2 ? "#7fbf99" : "#8fc9a5",
          "#5fa684",
        ),
      )
      .join("") +
    eucalyptus(-52, 104, -12) +
    eucalyptus(56, 102, 14);

  const sprays =
    lavender([70, 20], -10) +
    lavender([128, 16], 8) +
    lavender([156, 36], 10) +
    gypsophila([36, 46], -6) +
    gypsophila([170, 62], 8) +
    gypsophila([104, 24], -4);

  const flowers = [
    peony(66, 64, 0.62, -8),
    peony(114, 52, 0.66, 5),
    peony(152, 74, 0.6, 12),
    lisianthus(36, 86, 0.8, -10),
    lisianthus(170, 100, 0.78, 9),
    lisianthus(50, 98, 0.95, -7),
    peony(94, 86, 0.9, -3),
    lisianthus(132, 88, 0.9, 8),
    peony(160, 106, 0.8, 10),
    peony(36, 110, 0.75, -12),
    rose(66, 120, 0.8, -6, 1),
    rose(111, 109, 1.1, 3),
    rose(148, 124, 0.72, 8, 1),
  ].join("");

  return `<svg class="bouquet-art bouquet-art--${kind}" width="${size}" height="${Math.round((size * 260) / 200)}" viewBox="0 0 200 260" role="img" aria-label="A hand-tied bouquet of roses and flowers" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${id}-ribbon" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbe7a6"/><stop offset="1" stop-color="#e2bd68"/></linearGradient>
    <linearGradient id="${id}-lav" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c9bcff"/><stop offset="1" stop-color="#a995f5"/></linearGradient>
    <linearGradient id="${id}-cream" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffaf3"/><stop offset="1" stop-color="#f7e5d3"/></linearGradient>
  </defs>
  ${gift ? '<ellipse cx="100" cy="257" rx="22" ry="2" fill="#57485a" opacity=".1"/>' : ""}

  <g>${foliage}${sprays}</g>

  <!-- cut stems below the paper tip -->
  <g fill="none" stroke="#5fa684" stroke-width="2.6" stroke-linecap="butt">
    <path d="M94 240Q92 250 86 258M98 242Q97 252 95 259M102 242Q103 252 106 259M106 240Q108 250 114 258"/>
  </g>

  <!-- back sheet of paper (flares behind the flowers) -->
  <path d="M22 110Q38 101 54 110T86 110T118 110T150 110T178 110L100 248Z" fill="#f5e2cf" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>
  <path d="M60 126L98 238M140 126L102 238" stroke="#e3cdb7" stroke-width="1.2" fill="none" stroke-linecap="round"/>

  <g>${flowers}</g>

  <!-- front paper: cream sheet (left) and lavender sheet (right) -->
  <path d="M42 130Q56 123 70 130Q84 138 98 133C97 175 101 215 100 248Q58 196 42 130Z" fill="url(#${id}-cream)" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>
  <path d="M98 133Q114 139 132 131Q146 124 158 130Q142 196 100 248C101 215 97 175 98 133Z" fill="url(#${id}-lav)" stroke="${INK}" stroke-width="1.4" stroke-linejoin="round"/>
  <!-- folded-over lining flaps -->
  <path d="M126 134L158 130L146 162Z" fill="#e1d8ff" stroke="${INK}" stroke-width="1.2" stroke-linejoin="round"/>
  <path d="M42 130L74 135L58 163Z" fill="#fffdf8" stroke="${INK}" stroke-width="1.2" stroke-linejoin="round"/>
  <!-- creases and pattern -->
  <path d="M104 146Q108 196 101 240M72 150Q82 200 98 238M132 160Q122 204 103 238" fill="none" stroke="#d6c3b0" stroke-width="1.1" stroke-linecap="round" opacity=".7"/>
  <g fill="#fff" opacity=".28"><circle cx="124" cy="176" r="1.8"/><circle cx="116" cy="196" r="1.5"/><circle cx="130" cy="200" r="1.3"/><circle cx="110" cy="214" r="1.3"/></g>
  <path d="M50 128Q62 124 72 129" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".8"/>

  <!-- ribbon wrapped at the gathered waist -->
  <path d="M63 172Q100 183 137 172L134 183Q100 194 66 183Z" fill="url(#${id}-ribbon)" stroke="#b38d43" stroke-width="1.3" stroke-linejoin="round"/>
  <path d="M98 187C90 205 77 216 68 233L80 228L84 238C91 220 99 205 103 189Z" fill="url(#${id}-ribbon)" stroke="#b38d43" stroke-width="1.3" stroke-linejoin="round"/>
  <path d="M102 187C112 203 126 211 134 225L122 223L120 235C112 217 104 205 98 189Z" fill="#e2bd68" stroke="#b38d43" stroke-width="1.3" stroke-linejoin="round"/>
  <path d="M100 180C80 157 57 166 66 184C72 194 90 189 100 184Z" fill="url(#${id}-ribbon)" stroke="#b38d43" stroke-width="1.3" stroke-linejoin="round"/>
  <path d="M100 180C120 155 144 164 134 183C128 193 110 189 100 184Z" fill="url(#${id}-ribbon)" stroke="#b38d43" stroke-width="1.3" stroke-linejoin="round"/>
  <path d="M90 176C80 170 74 174 76 180" fill="none" stroke="#fff6cf" stroke-width="1.4" stroke-linecap="round" opacity=".8"/>
  <path d="M110 176C120 170 126 174 124 180" fill="none" stroke="#fff6cf" stroke-width="1.4" stroke-linecap="round" opacity=".8"/>
  <ellipse cx="100" cy="182" rx="7.5" ry="6.2" fill="#f5d98b" stroke="#b38d43" stroke-width="1.3"/>
  <ellipse cx="97.5" cy="180" rx="2.6" ry="1.8" fill="#fff6cf"/>

  <!-- sparkles (classes kept for the existing twinkle animation) -->
  <path class="bouquet-twinkle bouquet-twinkle--one" d="M128 50l2.5 5.5 5.5 2.5-5.5 2.5-2.5 5.5-2.5-5.5-5.5-2.5 5.5-2.5Z" fill="#f5d98b"/>
  <path class="bouquet-twinkle bouquet-twinkle--two" d="M28 60l2 4.5 4.5 2-4.5 2-2 4.5-2-4.5-4.5-2 4.5-2Z" fill="#f5d98b"/>
  ${gift ? '<path class="bouquet-twinkle bouquet-twinkle--three" d="M176 150l2 4.5 4.5 2-4.5 2-2 4.5-2-4.5-4.5-2 4.5-2Z" fill="#f5d98b"/>' : ""}
</svg>`;
}
