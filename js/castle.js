export function createCastle() {
  const layer = document.createElement('div');
  layer.className = 'castle-layer';
  layer.setAttribute('aria-hidden', 'true');
  layer.innerHTML = `<svg viewBox="0 0 440 390" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="keep-face" x1="0" x2="1"><stop stop-color="#202a61"/><stop offset=".55" stop-color="#121c4a"/><stop offset="1" stop-color="#0a1230"/></linearGradient>
      <linearGradient id="moon-rim" x1="0" x2="1"><stop stop-color="#e8a99a" stop-opacity=".85"/><stop offset=".55" stop-color="#e8a99a" stop-opacity=".2"/><stop offset="1" stop-color="#e8a99a" stop-opacity="0"/></linearGradient>
      <linearGradient id="moat" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#282e70" stop-opacity=".85"/><stop offset="1" stop-color="#0a1537"/></linearGradient>
      <radialGradient id="mist"><stop stop-color="#ffe6bd" stop-opacity=".55"/><stop offset="1" stop-color="#ffe6bd" stop-opacity="0"/></radialGradient>
      <filter id="window-glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    </defs>

    <!-- distant hill and rear turrets -->
    <path class="castle-hill castle-hill--back" d="M0 273Q55 220 121 258t120-5q73-47 137 3 35 25 62 8v126H0z"/>
    <g class="castle-back">
      <path d="M74 264V142h46v122zm238 0V132h49v132z" fill="#121c4a" stroke="url(#moon-rim)" stroke-width="2"/>
      <path d="m68 147 29-72 30 72zm237-10 31-77 32 77z" fill="#192354" stroke="#d99591" stroke-opacity=".55" stroke-width="2"/>
      <circle cx="97" cy="73" r="4" fill="#f5d98b"/><circle cx="336" cy="59" r="4" fill="#f5d98b"/>
      <path class="castle-window castle-window--slow" d="M88 177q9-13 18 0v21H88zm239-8q10-14 20 0v22h-20z"/>
      <path d="M96 75V49m240 9V34" stroke="#e8a99a" stroke-width="2"/>
      <path class="castle-flag castle-flag--one" d="M97 50q18-9 31 0l-10 8 10 8q-15-5-31 0z"/>
      <path class="castle-flag castle-flag--two" d="M337 35q17-9 30 0l-10 8 10 8q-15-5-30 0z"/>
    </g>

    <!-- keep, two slim side towers and two forward turrets -->
    <g class="castle-mid">
      <path class="castle-keep" d="M96 292V176h58v-28h42V98h48v50h42v28h59v116z"/>
      <path class="castle-rim" d="M96 181h58v-28h42V103h48v50h42v28h59" fill="none" stroke="url(#moon-rim)" stroke-width="2"/>
      <path d="M105 180h44v-21h48v-18h41v18h44v21h53" fill="none" stroke="#b98a8f" stroke-opacity=".55" stroke-width="3"/>
      <path class="castle-balcony" d="M181 145h70v8h-70zm4-10v10m10-10v10m10-10v10m10-10v10m10-10v10m10-10v10m-64-12h67" fill="none" stroke="#e8a99a" stroke-opacity=".7" stroke-width="2"/>

      <path d="M38 292V165h48v127zm316 0V153h49v139z" fill="#0d1538" stroke="url(#moon-rim)" stroke-width="2"/>
      <path d="m31 171 31-80 31 80zm315-12 32-86 32 86z" fill="#20285f" stroke="#e8a99a" stroke-opacity=".65" stroke-width="2"/>
      <circle cx="62" cy="88" r="4" fill="#f5d98b"/><circle cx="378" cy="69" r="4" fill="#f5d98b"/>
      <path d="M62 90V54m316 17V35" stroke="#e8a99a" stroke-width="2"/>
      <path class="castle-flag castle-flag--three" d="M63 55q18-9 31 0l-10 8 10 8q-15-5-31 0z"/>
      <path class="castle-flag castle-flag--four" d="M379 36q17-9 30 0l-10 8 10 8q-15-5-30 0z"/>
      <path class="castle-window castle-window--quick" d="M54 192q8-12 16 0v22H54zm324-15q9-12 18 0v22h-18zM193 186q10-14 20 0v22h-20zm48 0q10-14 20 0v22h-20z"/>
      <path class="castle-bricks" d="M105 202h42m-42 14h42m-42 14h42m148-28h43m-43 14h43m-43 14h43M162 179v62m33-46v27m48-27v27m43-43v62"/>
      <path class="castle-window castle-window--mid" d="M164 169q8-12 16 0v17h-16zm91 0q8-12 16 0v17h-16z"/>

      <path d="M187 292v-67q0-32 33-32t33 32v67z" fill="#090f2d" stroke="#e8a99a" stroke-opacity=".75" stroke-width="2"/>
      <path class="castle-gate" d="M194 292v-65q0-23 26-23v88zm30-88q25 0 25 23v65h-25z"/>
      <path d="M191 225h7m48 0h7" stroke="#f5d98b" stroke-width="3" stroke-linecap="round"/>
      <circle cx="217" cy="264" r="2.2" fill="#f5d98b"/><circle cx="231" cy="264" r="2.2" fill="#f5d98b"/>
      <path d="M177 292v-38q0-42 43-42t43 42v38" fill="none" stroke="#e8a99a" stroke-opacity=".27" stroke-width="2"/>
    </g>

    <!-- lantern posts and bridge crossing the moat -->
    <path class="moat" d="M0 306q85-23 170 0t170 0q55-15 100 0v84H0z"/>
    <g class="castle-reflection" transform="translate(0 584) scale(1 -0.72)" opacity=".32">
      <path d="M96 292V176h58v-28h42V98h48v50h42v28h59v116z" fill="#b69db0"/>
      <path d="M38 292V165h48v127zm316 0V153h49v139z" fill="#9a8aaa"/>
      <path d="M187 292v-67q0-32 33-32t33 32v67z" fill="#e8a99a"/>
    </g>
    <path class="moat-wave moat-wave--one" d="M10 328q35-8 70 0t70 0 70 0 70 0 70 0 70 0"/>
    <path class="moat-wave moat-wave--two" d="M-30 348q32 7 64 0t64 0 64 0 64 0 64 0 64 0 64 0"/>
    <path class="bridge" d="M158 287h124l31 57H127z"/>
    <path class="bridge-rail" d="M160 287h119m-109 0v16m23-16v16m23-16v16m23-16v16m23-16v16m-116 0h111"/>
    <g class="lantern-post"><path d="M126 285v-25m-6 0h12l-2-10h-8z"/><circle cx="126" cy="256" r="4"/></g>
    <g class="lantern-post"><path d="M314 285v-25m-6 0h12l-2-10h-8z"/><circle cx="314" cy="256" r="4"/></g>

    <!-- moonlit mist, hills and front silhouettes -->
    <ellipse class="castle-mist castle-mist--one" cx="90" cy="304" rx="110" ry="24"/>
    <ellipse class="castle-mist castle-mist--two" cx="350" cy="309" rx="116" ry="27"/>
    <path class="castle-hill castle-hill--front" d="M0 321q45-40 100-9t101-2q54-33 109-2 67 37 130 1v79H0z"/>
    <g class="castle-foreground"><path d="m8 340 22-58 22 58H40v28H20v-28zm363-5 24-65 24 65h-14v34h-20v-34z"/><path d="M61 350q16-32 31 0v22H61zm285-3q15-30 30 0v25h-30z"/></g>
    <path class="stair-light" d="M209 291h22l11 58h-44z"/>
  </svg>`;
  return layer;
}

export function openCastleGate(castleEl) {
  castleEl?.classList.add('is-opening');
  castleEl?.querySelector('.castle-gate')?.classList.add('is-open');
}
