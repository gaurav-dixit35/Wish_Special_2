const artwork = `<svg class="princess__figure" viewBox="0 0 120 180" role="img" aria-label="A storybook princess in a midnight-blue gown" xmlns="http://www.w3.org/2000/svg">
  <g class="princess__body">
    <path class="princess__cape" d="M42 54Q60 63 78 54L94 149Q61 166 26 149z" fill="#29366f" stroke="#d9b5cf" stroke-width="2"/>
    <path d="M45 58Q60 69 75 58L85 146Q61 157 35 146z" fill="#17244f" stroke="#e8a99a" stroke-width="2"/>
    <path d="M51 73 60 81l9-8-3 29 13 38-19 8-19-8 13-38z" fill="#24325f" opacity=".9"/>
    <path d="m43 130 17 7 17-7m-35 8 18 7 18-7" fill="none" stroke="#f5d98b" stroke-opacity=".75" stroke-width="1.5"/>
    <path d="m60 96 2 4-2 4-2-4zM48 119l1.5 3-1.5 3-1.5-3zM72 116l1.5 3-1.5 3-1.5-3z" fill="#fff1c7"/>
    <path d="M42 66q-8 11-5 27l8 7 5-23m28-11q8 11 5 27l-8 7-5-23" fill="#f0c4b7" stroke="#624c58" stroke-width="2"/>
    <g class="princess__hair"><path d="M45 38Q42 17 60 17q20 1 16 25l-3 37q-4 12-11 16l2-40q-4 5-8 0l-2 40q-9-5-11-17l-2-34z" fill="#31283c"/>
    <ellipse cx="60" cy="40" rx="15" ry="18" fill="#f0c4b7"/>
    <path d="M45 41Q42 18 61 17q20 1 16 25l-8-10-11 4-9-3-3 14z" fill="#33283f"/></g>
    <path d="M48 46q3 2 6 0m12 0q3 2 6 0" fill="none" stroke="#5d4552" stroke-width="1.4" stroke-linecap="round"/>
    <path d="M56 53q4 3 8 0" fill="none" stroke="#b97883" stroke-width="1.5" stroke-linecap="round"/>
    <path d="m46 28 4-12 10 7 10-7 4 12-5 5H51z" fill="#f5d98b" stroke="#765d4e" stroke-width="1.8" stroke-linejoin="round"/>
    <circle cx="60" cy="21" r="2.3" fill="#e8a99a"/>
    <g class="princess__arm princess__arm--wave" fill="none" stroke="#f0c4b7" stroke-width="5" stroke-linecap="round"><path d="M78 70q13-4 17-17"/><path d="M95 53q-2-7 2-10m-2 10q6-3 9-8" stroke-width="3.2"/></g>
  </g>
</svg><span class="princess__sparkle-ring" aria-hidden="true"></span>`;

export function createPrincess(scene) {
  const princess = document.createElement('div');
  princess.className = `princess princess--${scene}`;
  princess.setAttribute('aria-hidden', 'true');
  princess.innerHTML = artwork;
  if (scene === 'finale') princess.classList.add('is-final');
  return princess;
}

export function startPrincessWalk(princess) {
  princess?.classList.add('is-walking');
}

export function crownPrincess(princess, crown) {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      if (!princess?.isConnected) { resolve(false); return; }
      princess.classList.add('is-crowned');
      crown?.classList.add('is-raised');
      resolve(true);
    }, 1450);
  });
}
