const artwork = `<svg class="princess__figure" viewBox="0 0 120 180" role="img" aria-label="A cheerful storybook princess in a blue gown" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="princess-cape-shade" x1="0" y1="0" x2="0.9" y2="1">
      <stop stop-color="#b9a7ff"/><stop offset="1" stop-color="#1f2d7a"/>
    </linearGradient>
    <linearGradient id="princess-gown-shade" x1="0" y1="0" x2="0" y2="1">
      <stop stop-color="#314493"/><stop offset="1" stop-color="#1f2d7a"/>
    </linearGradient>
    <linearGradient id="princess-hair-shine" x1="0" y1="0" x2="1" y2="0">
      <stop stop-color="#2a1f2d"/><stop offset=".52" stop-color="#463346"/><stop offset="1" stop-color="#2a1f2d"/>
    </linearGradient>
  </defs>
  <g class="princess__body" stroke="#57485a" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
    <path class="princess__cape" d="M40 68Q60 78 80 68L96 151Q60 174 24 151Z" fill="url(#princess-cape-shade)" stroke="#e8a99a" stroke-width="3"/>
    <path d="M42 76Q35 90 31 111M78 76Q85 90 89 111" fill="none" stroke="#f4c7ce" stroke-width="2"/>

    <g class="princess__hair">
      <path d="M39 43Q35 15 59 12Q84 14 81 45L85 91Q82 111 73 116L71 72Q60 80 49 71L46 115Q36 108 34 88Z" fill="url(#princess-hair-shine)"/>
      <path d="M42 49Q38 24 56 16" fill="none" stroke="#796078" stroke-width="2.4"/>
      <ellipse cx="60" cy="42" rx="21" ry="25" fill="#f6cfb7"/>
      <path d="M39 43Q35 16 59 12Q84 14 81 45L73 34Q67 39 60 35Q50 41 43 35Z" fill="url(#princess-hair-shine)"/>
      <path d="M46 45Q51 50 55 45M65 45Q70 50 74 45" fill="none" stroke="#57485a" stroke-width="2.2"/>
      <path d="M57 55Q60 58 63 55" fill="none" stroke="#c37d8b" stroke-width="1.8"/>
      <ellipse cx="46" cy="53" rx="4" ry="2.4" fill="#eea6bd" stroke="none"/>
      <ellipse cx="74" cy="53" rx="4" ry="2.4" fill="#eea6bd" stroke="none"/>
    </g>
    <path d="M51 64V72H69V64" fill="#f6cfb7"/>

    <path d="M44 162Q50 161 54 165V176H41Q39 167 44 162ZM66 165Q71 161 77 162L80 176H67Z" fill="#8a5975"/>
    <path class="princess__gown" d="M42 74Q60 69 78 74L80 101Q94 124 105 158Q61 168 15 158Q26 124 40 101Z" fill="url(#princess-gown-shade)"/>
    <path d="M16 155Q60 164 104 155L107 160Q61 171 13 160Z" fill="#6577c3" stroke="#c6baff" stroke-width="2.3"/>
    <path d="M39 96Q60 102 81 96L82 103Q60 110 38 103Z" fill="#f5d98b" stroke="#9d7946" stroke-width="1.5"/>
    <path d="M60 101 64 105 60 109 56 105Z" fill="#fff0be" stroke="none"/>
    <path d="M44 117l2 3-2 3-2-3zm31 8 2 3-2 3-2-3zm-17 18 2 3-2 3-2-3zm-18-13 1.6 2.5-1.6 2.5-1.6-2.5zm37-13 1.6 2.5-1.6 2.5-1.6-2.5z" fill="#fff1c7" stroke="none"/>

    <path d="M39 72Q31 71 31 81Q31 89 39 91L46 82ZM81 72Q89 71 89 81Q89 89 81 91L74 82Z" fill="#c5b4f3" stroke="#57485a" stroke-width="2.6"/>
    <g class="princess__arm-group princess__arm--left">
      <path d="M37 79Q35 90 38 99L36 117" fill="none" stroke="#57485a" stroke-width="12"/>
      <path d="M37 79Q35 90 38 99L36 117" fill="none" stroke="#f6cfb7" stroke-width="8"/>
      <circle cx="36" cy="121" r="6.4" fill="#f6cfb7" stroke="#57485a" stroke-width="2.2"/>
      <circle cx="41" cy="118" r="3.3" fill="#f6cfb7" stroke="#57485a" stroke-width="1.8"/>
    </g>
    <g class="princess__arm-group princess__arm princess__arm--wave">
      <path d="M83 79Q91 78 91 69Q92 61 98 53L103 43" fill="none" stroke="#57485a" stroke-width="12"/>
      <path d="M83 79Q91 78 91 69Q92 61 98 53L103 43" fill="none" stroke="#f6cfb7" stroke-width="8"/>
      <circle cx="105" cy="39" r="6.5" fill="#f6cfb7" stroke="#57485a" stroke-width="2.2"/>
      <circle cx="100" cy="43" r="3.4" fill="#f6cfb7" stroke="#57485a" stroke-width="1.8"/>
    </g>
    <g class="princess__arm-group princess__arm--clasp princess__arm--clasp-left">
      <path d="M37 79Q40 91 49 99L57 108" fill="none" stroke="#57485a" stroke-width="12"/>
      <path d="M37 79Q40 91 49 99L57 108" fill="none" stroke="#f6cfb7" stroke-width="8"/>
      <circle cx="60" cy="111" r="6.3" fill="#f6cfb7" stroke="#57485a" stroke-width="2.2"/>
      <circle cx="56" cy="107" r="3.2" fill="#f6cfb7" stroke="#57485a" stroke-width="1.8"/>
    </g>
    <g class="princess__arm-group princess__arm--clasp princess__arm--clasp-right">
      <path d="M83 79Q80 91 71 99L63 108" fill="none" stroke="#57485a" stroke-width="12"/>
      <path d="M83 79Q80 91 71 99L63 108" fill="none" stroke="#f6cfb7" stroke-width="8"/>
      <circle cx="60" cy="111" r="6.3" fill="#f6cfb7" stroke="#57485a" stroke-width="2.2"/>
      <circle cx="64" cy="107" r="3.2" fill="#f6cfb7" stroke="#57485a" stroke-width="1.8"/>
    </g>

    <g class="princess__head-crown">
      <path d="m39 19 5-12 10 8 6-12 7 12 10-8 4 12-5 9H44Z" fill="#f5d98b" stroke="#57485a" stroke-width="2.4"/>
      <path d="M44 24H76" stroke="#e8a99a" stroke-width="2.5"/>
      <circle cx="60" cy="10" r="2.6" fill="#e8a99a" stroke="none"/>
    </g>
  </g>
</svg><span class="princess__sparkle-ring" aria-hidden="true"></span>`;

export function createPrincess(scene) {
  const princess = document.createElement('div');
  princess.className = `princess princess--${scene}`;
  if (scene === 'coronation') princess.classList.add('princess--clasped');
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
