export function createCastle() {
  const layer = document.createElement('div');
  layer.className = 'castle-layer';
  layer.setAttribute('aria-hidden', 'true');
  layer.innerHTML = `<svg viewBox="0 0 390 520" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="keep-face" x1="0" x2="1"><stop stop-color="#1b2a6e"/><stop offset="1" stop-color="#1b2a6e"/></linearGradient>
      <linearGradient id="moon-rim"><stop stop-color="#d995a2"/></linearGradient>
      <radialGradient id="mist"><stop stop-color="#16215a"/></radialGradient>
      <pattern id="castle-battlements" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M0 10H5V0H15V10H20V20H0Z" fill="#1b2a6e"/>
      </pattern>
      <linearGradient id="moat" x1="0" y1="0" x2="0" y2="1">
        <stop stop-color="#34458c"/><stop offset="1" stop-color="#101a4a"/>
      </linearGradient>
      <filter id="window-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="1.6" result="glow"/><feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <filter id="lantern-glow" x="-100%" y="-100%" width="300%" height="300%">
        <feGaussianBlur stdDeviation="3.5" result="glow"/><feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <clipPath id="moat-reflection-clip"><path d="M49 427Q195 412 341 427L329 478H61Z"/></clipPath>
    </defs>

    <!-- Rounded ground behind the four connected towers. -->
    <path class="castle-hill castle-hill--back" d="M0 451Q48 430 96 449T195 445Q247 430 293 448T390 445V520H0Z"/>

    <!-- Far outer towers: opaque silhouettes rooted into the hill. -->
    <g class="castle-back">
      <path class="castle-outer-tower castle-outer-tower--left" d="M12 446V198L48 126L84 198V446Z" fill="#16215a"/>
      <path class="castle-outer-tower castle-outer-tower--right" d="M306 446V198L342 126L378 198V446Z" fill="#16215a"/>
      <path class="castle-rim" d="M13 438V198L48 127M377 438V198L342 127" fill="none"/>
      <path d="M48 128V78M342 128V78" stroke="#f5d98b" stroke-width="3"/>
      <g class="castle-flag castle-flag--one"><path d="M49 82Q67 69 88 82L75 95L88 109Q68 101 49 112Z" fill="#f4a9b8"/><path d="M55 87Q69 80 81 84L73 95Z" fill="#f5d98b"/></g>
      <g class="castle-flag castle-flag--two"><path d="M343 82Q361 69 382 82L369 95L382 109Q362 101 343 112Z" fill="#f4a9b8"/><path d="M349 87Q363 80 375 84L367 95Z" fill="#f5d98b"/></g>
      <circle cx="48" cy="126" r="5" fill="#f5d98b"/><circle cx="342" cy="126" r="5" fill="#f5d98b"/>
      <circle cx="48" cy="119" r="2" fill="#fff1c7"/><circle cx="342" cy="119" r="2" fill="#fff1c7"/>
      <g aria-hidden="true">
        <path d="M36 221Q48 204 60 221V244H36Z" fill="#101a48"/><path class="castle-window castle-window--quick" d="M40 222Q48 211 56 222V241H40Z"/>
        <path d="M36 280Q48 263 60 280V303H36Z" fill="#101a48"/><path class="castle-window castle-window--mid" d="M40 281Q48 270 56 281V300H40Z"/>
        <path d="M36 339Q48 322 60 339V362H36Z" fill="#101a48"/><path class="castle-window castle-window--slow" d="M40 340Q48 329 56 340V359H40Z"/>
        <path d="M330 221Q342 204 354 221V244H330Z" fill="#101a48"/><path class="castle-window castle-window--quick" d="M334 222Q342 211 350 222V241H334Z"/>
        <path d="M330 280Q342 263 354 280V303H330Z" fill="#101a48"/><path class="castle-window castle-window--mid" d="M334 281Q342 270 350 281V300H334Z"/>
        <path d="M330 339Q342 322 354 339V362H330Z" fill="#101a48"/><path class="castle-window castle-window--slow" d="M334 340Q342 329 350 340V359H334Z"/>
      </g>
    </g>

    <!-- Main wall, patterned crenellations, central keep and joined mid towers. -->
    <g class="castle-mid">
      <path class="castle-main-wall" d="M42 285H348V445H42Z" fill="#1b2a6e"/>
      <rect class="castle-battlements" x="42" y="265" width="306" height="20" fill="url(#castle-battlements)"/>
      <path class="castle-bricks" d="M50 306h22m-22 18h22m-22 18h22m244-36h22m-22 18h22m-22 18h22M50 360h22m244 0h22"/>

      <path class="castle-mid-tower castle-mid-tower--left" d="M72 445V248L104 178L136 248V445Z" fill="#1b2a6e"/>
      <path class="castle-mid-tower castle-mid-tower--right" d="M254 445V248L286 178L318 248V445Z" fill="#1b2a6e"/>
      <path class="castle-rim" d="M73 438V248L104 180M317 438V248L286 180" fill="none"/>
      <path d="M104 180V143M286 180V143" stroke="#f5d98b" stroke-width="2.5"/>
      <g class="castle-flag castle-flag--three"><path d="M105 147Q121 136 139 147L128 158L139 170Q122 163 105 172Z" fill="#f4a9b8"/><path d="M110 151Q123 145 133 149L126 158Z" fill="#f5d98b"/></g>
      <g class="castle-flag castle-flag--four"><path d="M287 147Q303 136 321 147L310 158L321 170Q304 163 287 172Z" fill="#f4a9b8"/><path d="M292 151Q305 145 315 149L308 158Z" fill="#f5d98b"/></g>
      <circle cx="104" cy="178" r="4" fill="#f5d98b"/><circle cx="286" cy="178" r="4" fill="#f5d98b"/>
      <g>
        <path d="M94 275Q104 260 114 275V295H94Z" fill="#101a48"/><path class="castle-window castle-window--quick" d="M97 276Q104 266 111 276V292H97Z"/>
        <path d="M94 327Q104 312 114 327V347H94Z" fill="#101a48"/><path class="castle-window castle-window--mid" d="M97 328Q104 318 111 328V344H97Z"/>
        <path d="M94 379Q104 364 114 379V399H94Z" fill="#101a48"/><path class="castle-window castle-window--slow" d="M97 380Q104 370 111 380V396H97Z"/>
        <path d="M276 275Q286 260 296 275V295H276Z" fill="#101a48"/><path class="castle-window castle-window--quick" d="M279 276Q286 266 293 276V292H279Z"/>
        <path d="M276 327Q286 312 296 327V347H276Z" fill="#101a48"/><path class="castle-window castle-window--mid" d="M279 328Q286 318 293 328V344H279Z"/>
        <path d="M276 379Q286 364 296 379V399H276Z" fill="#101a48"/><path class="castle-window castle-window--slow" d="M279 380Q286 370 293 380V396H279Z"/>
      </g>

      <path class="castle-keep" d="M139 445V146L195 46L251 146V445Z" fill="#1b2a6e"/>
      <path class="castle-rim" d="M140 438V146L195 48" fill="none"/>
      <circle cx="195" cy="47" r="5" fill="#f5d98b"/><path d="M195 52V61" stroke="#f5d98b" stroke-width="2"/>
      <path class="castle-balcony" d="M126 158H264V169H126Z" fill="#233582" stroke="#f0c4ad" stroke-width="2"/>
      <path d="M133 158V148m18 10V148m18 10V148m18 10V148m18 10V148m18 10V148m18 10V148m18 10V148M130 147H260" fill="none" stroke="#f5d98b" stroke-width="2"/>
      <g class="castle-rose-windows">
        <circle cx="169" cy="211" r="13" fill="#101a48"/><circle class="castle-window castle-window--slow" cx="169" cy="211" r="8"/>
        <circle cx="195" cy="211" r="13" fill="#101a48"/><circle class="castle-window castle-window--quick" cx="195" cy="211" r="8"/>
        <circle cx="221" cy="211" r="13" fill="#101a48"/><circle class="castle-window castle-window--mid" cx="221" cy="211" r="8"/>
      </g>
      <path class="castle-bricks" d="M151 242h34m20 0h34m-76 18h24m18 0h24m-56 18h50"/>
    </g>

    <!-- Near gatehouse with a single pointed opening and paired doors. -->
    <g class="castle-gatehouse">
      <path d="M136 445V317Q136 282 195 260Q254 282 254 317V445Z" fill="#233582"/>
      <path class="castle-rim" d="M137 438V317Q137 289 191 265" fill="none"/>
      <path d="M146 445V321Q146 292 195 273Q244 292 244 321V445Z" fill="#101a48"/>
      <g class="castle-gate">
        <path d="M151 445V324Q151 301 195 280V445Z" fill="#17245b"/>
        <path d="M195 280Q239 301 239 324V445H195Z" fill="#142052"/>
        <path d="M195 287V443" stroke="#f5d98b" stroke-width="2"/>
        <circle cx="184" cy="391" r="3.2" fill="#ffd98a"/><circle cx="206" cy="391" r="3.2" fill="#ffd98a"/>
      </g>
      <g class="castle-crest" transform="translate(195 253)">
        <path d="m-13 0 3-11 10 7 10-7 3 11-4 6h-18Z" fill="#f5d98b"/>
        <path d="M-10 3H10" stroke="#f4a9b8" stroke-width="2"/>
      </g>
    </g>

    <!-- Water and its clipped quarter-strength reflection sit only below the castle. -->
    <path class="moat" d="M48 427Q195 411 342 427L330 481H60Z"/>
    <g class="castle-reflection" clip-path="url(#moat-reflection-clip)" opacity=".25">
      <path d="M73 439V454H119V439ZM145 439V450H245V439ZM270 439V454H317V439Z" fill="#b8c7f4"/>
      <path d="M171 445h48v9h-48z" fill="#ffd98a"/>
    </g>
    <path class="moat-wave moat-wave--one" d="M70 458q25-5 50 0t50 0 50 0 50 0 50 0"/>
    <path class="moat-wave moat-wave--two" d="M82 472q22 5 44 0t44 0 44 0 44 0 44 0"/>

    <!-- Five widening gold-edged steps lead from the gate to the bridge. -->
    <g class="castle-stairs">
      <path d="M158 389H232L236 399H154Z" fill="#354582" stroke="#f5d98b" stroke-width="1.5"/>
      <path d="M154 400H236L241 410H149Z" fill="#303f7b" stroke="#f5d98b" stroke-width="1.5"/>
      <path d="M149 411H241L247 421H143Z" fill="#2b3a75" stroke="#f5d98b" stroke-width="1.5"/>
      <path d="M143 422H247L253 432H137Z" fill="#263673" stroke="#f5d98b" stroke-width="1.5"/>
      <path d="M137 433H253L260 444H130Z" fill="#233582" stroke="#f5d98b" stroke-width="1.5"/>
    </g>
    <path class="stair-light" d="M183 382H207L222 445H168Z"/>

    <!-- Stone bridge, two low rails, and small lanterns on its outer sides. -->
    <path class="bridge" d="M117 439H273L316 477H74Z"/>
    <g class="bridge-rail" fill="none">
      <path d="M83 455H145M245 455H307M94 463H151M239 463H296"/>
      <path d="M89 455V466m18-11v11m18-11v11m18-11v11m94-11v11m18-11v11m18-11v11m18-11v11"/>
    </g>
    <g class="lantern-post" transform="translate(63 426)">
      <path d="M0 0V35" fill="none" stroke="#c896aa" stroke-width="3"/>
      <path d="M-7 2H7L6 7V19H-6V7Z" fill="#334079" stroke="#f5d98b" stroke-width="1.5"/>
      <path d="M-4 8H4V17H-4Z" fill="#ffd98a" filter="url(#lantern-glow)"/>
      <path d="M-5 1H5" stroke="#f5d98b" stroke-width="2"/>
    </g>
    <g class="lantern-post" transform="translate(327 426)">
      <path d="M0 0V35" fill="none" stroke="#c896aa" stroke-width="3"/>
      <path d="M-7 2H7L6 7V19H-6V7Z" fill="#334079" stroke="#f5d98b" stroke-width="1.5"/>
      <path d="M-4 8H4V17H-4Z" fill="#ffd98a" filter="url(#lantern-glow)"/>
      <path d="M-5 1H5" stroke="#f5d98b" stroke-width="2"/>
    </g>

    <!-- Foreground hill closes the silhouettes at the bottom edge. -->
    <path class="castle-hill castle-hill--front castle-foreground" d="M0 489Q52 472 104 490T195 487Q247 469 298 490T390 486V520H0Z"/>
  </svg>`;
  return layer;
}

export function openCastleGate(castleEl) {
  castleEl?.classList.add('is-opening');
  castleEl?.querySelector('.castle-gate')?.classList.add('is-open');
}
