const eyeShine = '<defs><radialGradient id="animal-eye-shine" cx="35%" cy="28%"><stop stop-color="#fff"/><stop offset="1" stop-color="#fff8ef"/></radialGradient></defs>';
const baseFace = (fill, ears, muzzle, extra = '') => `<g stroke="#57485a" stroke-width="3.1" stroke-linecap="round" stroke-linejoin="round"><g class="animal-ears">${ears}</g><ellipse cx="60" cy="67" rx="38" ry="36" fill="${fill}"/>${muzzle}${extra}<g class="animal-eyes"><ellipse cx="46" cy="64" rx="5" ry="6.5" fill="#29243b" stroke="none"/><ellipse cx="74" cy="64" rx="5" ry="6.5" fill="#29243b" stroke="none"/><circle cx="47.5" cy="61.5" r="1.8" fill="url(#animal-eye-shine)" stroke="none"/><circle cx="75.5" cy="61.5" r="1.8" fill="url(#animal-eye-shine)" stroke="none"/></g><ellipse cx="31" cy="77" rx="7" ry="4" fill="#eea6bd" opacity=".78" stroke="none"/><ellipse cx="89" cy="77" rx="7" ry="4" fill="#eea6bd" opacity=".78" stroke="none"/><path d="M56 78q4 5 8 0" fill="none"/></g>`;
const crown = '<path d="m45 27 5-12 10 9 10-9 5 12-4 9H49z" fill="#f5d98b" stroke="#57485a" stroke-width="2.5" stroke-linejoin="round"/><circle cx="60" cy="22" r="2.5" fill="#e8a99a"/>';
const flower = '<path d="M50 28q-8-9 0-12 7-1 10 8 3-9 10-8 8 4-1 12 11-3 11 4-1 7-11 2 3 10-4 12-6 1-6-10-5 9-11 6-5-5 1-12-10 4-12-3-1-6 13-7" fill="#ffc9d9" stroke="#8d6176" stroke-width="2"/><circle cx="60" cy="29" r="3.5" fill="#f5d98b"/>';
const tiara = '<path d="M43 30q17-20 34 0l-3 6H46z" fill="#f5d98b" stroke="#57485a" stroke-width="2.5"/><path d="m48 29 6 3 6-11 6 11 6-3" fill="none" stroke="#e8a99a" stroke-width="3"/>';
const makeSvg = (_name, body) => `<svg viewBox="0 0 120 120" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">${eyeShine}${body}</svg>`;

export const animals = {
  elephant: makeSvg('Baby elephant', baseFace('#9fc9d9', '<path d="M28 49Q8 33 14 65q4 16 18 10M92 49q20-16 14 16-4 16-18 10" fill="#9fc9d9"/>', '<path d="M55 72q-10 18 2 25 11 3 13-9" fill="none" stroke="#77617a" stroke-width="8"/>', crown)),
  panda: makeSvg('Panda', baseFace('#f6f1e9', '<path d="M29 43Q13 20 31 25q13 3 15 19M91 43q16-23-2-18-13 3-15 19" fill="#302c40"/>', '<ellipse cx="46" cy="63" rx="10" ry="13" fill="#302c40" stroke="none"/><ellipse cx="74" cy="63" rx="10" ry="13" fill="#302c40" stroke="none"/><ellipse cx="60" cy="78" rx="12" ry="8" fill="#fff8ef"/>', crown)),
  puppy: makeSvg('Golden retriever puppy', baseFace('#e4b582', '<path d="M30 47Q7 33 14 64q5 16 21 11M90 47q23-14 16 17-5 16-21 11" fill="#bd805e"/>', '<ellipse cx="60" cy="78" rx="16" ry="11" fill="#f4d3ad"/><ellipse cx="60" cy="73" rx="6" ry="4" fill="#493b45"/>', crown)),
  pug: makeSvg('Pug', baseFace('#d9ad82', '<path d="M29 47Q10 31 16 61q6 16 20 12M91 47q19-16 13 14-6 16-20 12" fill="#80604e"/>', '<ellipse cx="60" cy="77" rx="19" ry="14" fill="#f1d2b3"/><ellipse cx="60" cy="72" rx="7" ry="5" fill="#443a40"/>', flower)),
  husky: makeSvg('Husky', baseFace('#e9eef1', '<path d="M29 48 24 17l24 22M91 48l5-31-24 22" fill="#8398ae"/><path d="m31 40-2-15 13 14m47 1 2-15-13 14" fill="#f0b4c9" stroke="none"/>', '<path d="M60 67v27M60 75q-13-12-19 0t19 14q13-14 19 0t-19 2" fill="#fff8ef"/><ellipse cx="60" cy="72" rx="5" ry="4" fill="#443a40"/>', tiara)),
  cat: makeSvg('Cat', baseFace('#f2c6a7', '<path d="M27 48 23 16l27 22M93 48l4-32-27 22" fill="#f2c6a7"/><path d="m32 40-2-15 13 14m45 1 2-15-13 14" fill="#ef9fb5" stroke="none"/>', '<path d="m55 76 5 4 5-4M60 80q-8 10-15 2m15-2q8 10 15 2" fill="none"/>', crown)),
  bunny: makeSvg('Bunny', baseFace('#f8e9ed', '<path d="M43 42Q28 3 39 8q17 8 16 36M67 42Q83 3 91 12q5 12-14 35" fill="#f8e9ed"/><path d="M42 31q2-15 8 8m28-1q8-18 8-7" fill="none" stroke="#eea8be"/>', '<ellipse cx="60" cy="78" rx="14" ry="10" fill="#fff8ef"/>', flower)),
  teddy: makeSvg('Teddy bear', baseFace('#c99570', '<circle cx="29" cy="39" r="14" fill="#c99570"/><circle cx="91" cy="39" r="14" fill="#c99570"/><circle cx="29" cy="39" r="6" fill="#e9b99a" stroke="none"/><circle cx="91" cy="39" r="6" fill="#e9b99a" stroke="none"/>', '<ellipse cx="60" cy="78" rx="16" ry="12" fill="#e9c5a8"/><ellipse cx="60" cy="74" rx="5" ry="4" fill="#48343b"/>', tiara)),
};

export function placeAnimal(containerEl, name, position = 'top') {
  const markup = animals[name];
  if (!containerEl || !markup) return null;
  const el = document.createElement('span');
  el.className = `animal animal--${position}`;
  const sequenceIndex = containerEl.querySelectorAll('.animal').length;
  el.style.setProperty('--animal-index', sequenceIndex);
  el.innerHTML = markup;
  el.setAttribute('aria-hidden', 'true');
  containerEl.append(el);
  return el;
}

export function createAnimalSprite() {
  const sprite = document.createElement('svg');
  sprite.setAttribute('aria-hidden', 'true');
  sprite.setAttribute('width', '0');
  sprite.setAttribute('height', '0');
  sprite.className = 'animal-sprite';
  sprite.innerHTML = Object.entries(animals).map(([name, svg]) => `<symbol id="animal-${name}" viewBox="0 0 120 120">${svg.replace(/^<svg[^>]*>|<\/svg>$/g, '')}</symbol>`).join('');
  return sprite;
}
