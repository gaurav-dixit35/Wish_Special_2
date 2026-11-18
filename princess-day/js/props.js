const wrap = (inner, _label) => `<svg viewBox="0 0 120 120" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
const gold = '#f5d98b';
const rose = '#e8a99a';
const ink = '#785d49';

export const props = {
  crown: wrap(`<path d="m23 48 8 45h58l8-45-22 18-15-33-15 33z" fill="${gold}" stroke="${ink}" stroke-width="3" stroke-linejoin="round"/><path d="M32 82h56" stroke="${rose}" stroke-width="5"/><circle cx="60" cy="34" r="6" fill="${rose}"/><circle cx="25" cy="44" r="5" fill="${rose}"/><circle cx="95" cy="44" r="5" fill="${rose}"/>`, 'Jeweled crown'),
  tiara: wrap(`<path d="M21 77q39-57 78 0l-8 15H29z" fill="${gold}" stroke="${ink}" stroke-width="3"/><path d="m31 68 15 8 14-30 14 30 15-8" fill="none" stroke="${rose}" stroke-width="5"/><circle cx="60" cy="45" r="6" fill="${gold}"/>`, 'Tiara'),
  cushion: wrap(`<path d="M25 42q35-13 70 0l-6 43q-29 16-58 0z" fill="#a65f79" stroke="${ink}" stroke-width="3"/><rect x="30" y="43" width="60" height="39" rx="13" fill="none" stroke="${gold}" stroke-width="2.5"/><path d="M36 52q24-10 48 0M37 75q23 9 46 0" fill="none" stroke="#f4c4cc" stroke-opacity=".56" stroke-width="2"/><circle cx="60" cy="62" r="5" fill="${gold}" stroke="#fff0c7" stroke-width="1.5"/><path d="m27 45-8 6m8-6-2-9m2 9 7-6m59 6 8 6m-8-6 2-9m-2 9-7-6M30 83l-9 7m9-7-1 10m1-10 7 5m53-5 9 7m-9-7 1 10m-1-10-7 5" fill="none" stroke="${gold}" stroke-width="2.5" stroke-linecap="round"/><circle cx="18" cy="51" r="2.5" fill="${rose}"/><circle cx="102" cy="51" r="2.5" fill="${rose}"/><circle cx="21" cy="90" r="2.5" fill="${rose}"/><circle cx="99" cy="90" r="2.5" fill="${rose}"/>`, 'Plush royal cushion'),
  sceptre: wrap(`<path d="M55 43h10v61H55z" fill="${gold}" stroke="${ink}" stroke-width="3"/><path d="M60 10 67 27l18 2-13 12 4 18-16-9-16 9 4-18-13-12 18-2z" fill="${gold}" stroke="${ink}" stroke-width="3"/><circle cx="60" cy="36" r="6" fill="${rose}"/>`, 'Star sceptre'),
  banner: wrap(`<path d="M22 25h76v58H22z" fill="${rose}" stroke="${ink}" stroke-width="3"/><path d="M30 35h60M30 45h60M30 55h60" stroke="${gold}" stroke-width="2"/><path d="M22 83 37 73v19zm76 0L83 73v19z" fill="${gold}"/>`, 'Royal banner'),
  scroll: wrap(`<path d="M31 24h58v70H31q-13 0-13-12V36q0-12 13-12zm0 11q-8 0-8 8v34q0 8 8 8h48V35z" fill="#fff0d1" stroke="${ink}" stroke-width="3"/><path d="M39 49h39M39 60h39M39 71h30" stroke="${rose}" stroke-width="3" stroke-linecap="round"/>`, 'Gold scroll'),
  carriage: wrap(`<path d="M24 54q3-23 36-23t36 23v25H24z" fill="${gold}" stroke="${ink}" stroke-width="3"/><path d="M35 52q2-13 25-13t25 13v14H35z" fill="#9a526b" stroke="${ink}" stroke-width="3"/><circle cx="39" cy="84" r="10" fill="${rose}" stroke="${ink}" stroke-width="3"/><circle cx="81" cy="84" r="10" fill="${rose}" stroke="${ink}" stroke-width="3"/><path d="M58 31V15m0 0q13-7 22 0l-9 6 9 6q-11-4-22 0" fill="${rose}"/>`, 'Royal carriage'),
  key: wrap(`<circle cx="42" cy="43" r="19" fill="none" stroke="${gold}" stroke-width="9"/><circle cx="42" cy="43" r="8" fill="none" stroke="${rose}" stroke-width="3"/><path d="m57 57 42 42m-12-12 9-9m-19-2 9-9" stroke="${gold}" stroke-width="9" stroke-linecap="round"/>`, 'Golden key'),
  mirror: wrap(`<path d="M60 18q28 0 28 31t-28 31q-28 0-28-31t28-31z" fill="#b9a7ff" stroke="${gold}" stroke-width="7"/><path d="M54 78h12v30H54z" fill="${gold}" stroke="${ink}" stroke-width="3"/><path d="M44 108h32" stroke="${rose}" stroke-width="7" stroke-linecap="round"/>`, 'Hand mirror'),
  wand: wrap(`<path d="m37 91 45-59" stroke="${gold}" stroke-width="8" stroke-linecap="round"/><path d="m78 13 5 12 13 1-10 8 3 12-11-6-11 6 3-12-10-8 13-1z" fill="${rose}" stroke="${ink}" stroke-width="2"/>`, 'Magic wand'),
};

export function createProp(name, className = '') {
  const svg = props[name];
  if (!svg) return null;
  const node = document.createElement('span');
  node.className = `royal-prop ${className}`.trim();
  node.innerHTML = svg;
  node.setAttribute('aria-hidden', 'true');
  return node;
}
