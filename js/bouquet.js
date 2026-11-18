const rose = (
  x,
  y,
  scale = 1,
) => `<g transform="translate(${x} ${y}) scale(${scale})" stroke="#57485a" stroke-width="2.5" stroke-linejoin="round">
  <circle r="25" fill="#f4a9b8"/>
  <path d="M0-22Q12-27 19-16Q27-6 19 3Q16 12 5 13Q-7 17-16 7Q-25-3-16-14Q-10-23 0-22Z" fill="#e8788f"/>
  <path d="M-1-16Q9-20 14-11Q19-3 11 3Q5 10-4 7Q-14 3-12-6Q-11-14-1-16Z" fill="#f4a9b8"/>
  <path d="M-2-10Q6-12 8-5Q10 1 3 4Q-3 7-7 2Q-11-4-5-8Q-3-10-2-10Z" fill="#e8788f"/>
  <path d="M-2-5Q2-8 5-4Q8 0 3 2Q0 4-2 1Q-5-2-2-5Z" fill="#f4a9b8"/>
</g>`;

const peony = (
  x,
  y,
  scale = 1,
) => `<g transform="translate(${x} ${y}) scale(${scale})" stroke="#57485a" stroke-width="2.4" stroke-linejoin="round">
  <circle r="23" fill="#fff3e6"/>
  <path d="M0-21Q9-26 14-17Q25-14 20-4Q26 5 15 12Q12 24 1 19Q-8 27-14 16Q-26 13-20 2Q-26-8-15-14Q-10-25 0-21Z" fill="#fff3e6"/>
  <path d="M-1-14Q7-19 12-10Q20-5 12 1Q14 10 4 12Q-3 18-8 9Q-18 6-13-3Q-16-11-6-13Z" fill="#f4d7c8"/>
  <path d="M-2-8Q4-12 8-5Q13 1 6 5Q2 11-4 6Q-11 3-7-3Q-7-8-2-8Z" fill="#fff3e6"/>
  <circle cy="0" r="4" fill="#f5d98b" stroke="none"/>
</g>`;

const lavenderCluster = (
  x,
  y,
  scale = 1,
) => `<g transform="translate(${x} ${y}) scale(${scale})" stroke="#57485a" stroke-width="1.7">
  <circle cx="-10" cy="-7" r="8" fill="#b9a7ff"/><circle cx="0" cy="-12" r="8" fill="#c6b8ff"/>
  <circle cx="10" cy="-7" r="8" fill="#b9a7ff"/><circle cx="-7" cy="4" r="8" fill="#c6b8ff"/>
  <circle cx="7" cy="4" r="8" fill="#b9a7ff"/><circle cy="-3" r="7" fill="#f4d7c8"/>
  <circle cy="-3" r="2.5" fill="#f5d98b" stroke="none"/>
</g>`;

export function drawBouquet(sizePx, variant = "gift") {
  const size = Math.max(48, Math.min(240, Math.round(Number(sizePx) || 110)));
  const kind = variant === "held" ? "held" : "gift";
  return `<svg class="bouquet-art bouquet-art--${kind}" width="${size}" height="${Math.round((size * 260) / 220)}" viewBox="0 0 220 260" role="img" aria-label="A hand-tied bouquet of roses and flowers" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#5fa684" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
      <path d="M102 83Q100 130 111 202M53 90Q70 146 105 204M165 89Q150 148 114 204M31 122Q66 162 104 205M189 121Q155 165 116 205M79 124Q87 164 108 205M143 123Q135 165 114 205" fill="none"/>
      <path d="M72 129Q51 115 45 96Q64 102 77 120ZM84 151Q62 141 54 123Q74 127 89 143ZM142 139Q163 121 169 101Q151 107 138 130ZM132 165Q158 153 167 134Q146 137 128 156ZM102 128Q86 111 88 92Q103 104 108 122ZM111 159Q130 143 132 126Q116 136 108 153Z" fill="#8fc9a5"/>
      <path d="M74 129Q60 120 51 103M85 151Q70 141 61 128M141 139Q156 126 164 109M132 165Q149 155 160 140M102 128Q94 113 91 101M111 159Q123 146 128 134" fill="none" stroke="#5fa684" stroke-width="2"/>
    </g>
    <g fill="none" stroke="#8fc9a5" stroke-width="2.4" stroke-linecap="round">
      <path d="M29 117Q23 92 36 72M192 116Q198 91 184 70"/>
      <path d="M30 94l-9-6m10-2 9-7m-10 20-10-4m162-1 9-6m-9-2-8-7m9 20 10-4"/>
    </g>
    <g fill="#fff3e6" stroke="#d6bba8" stroke-width="1.3">
      <circle cx="21" cy="87" r="3.7"/><circle cx="40" cy="78" r="3.7"/><circle cx="20" cy="102" r="3.5"/><circle cx="36" cy="96" r="3.5"/>
      <circle cx="199" cy="86" r="3.7"/><circle cx="181" cy="77" r="3.7"/><circle cx="201" cy="102" r="3.5"/><circle cx="184" cy="96" r="3.5"/>
    </g>
    <g fill="#b9a7ff" stroke="#57485a" stroke-width="1.4">
      <path d="M72 138l-7-9 8 2-2-10 8 9m62 8 7-9-8 2 2-10-8 9" fill="none" stroke="#8e7dc5" stroke-width="2.4"/>
      <circle cx="69" cy="127" r="3.2"/><circle cx="79" cy="132" r="3.2"/><circle cx="151" cy="127" r="3.2"/><circle cx="141" cy="132" r="3.2"/>
    </g>
    ${rose(54, 72, 0.92)}
    ${rose(110, 48, 1.02)}
    ${rose(166, 72, 0.92)}
    ${peony(29, 110, 0.86)}
    ${peony(191, 110, 0.86)}
    ${lavenderCluster(80, 112, 0.84)}
    ${lavenderCluster(140, 112, 0.84)}
    <path class="bouquet-twinkle bouquet-twinkle--one" d="M183 42l3 7 7 3-7 3-3 7-3-7-7-3 7-3Z" fill="#f5d98b"/>
    <path class="bouquet-twinkle bouquet-twinkle--two" d="M34 76l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" fill="#f5d98b"/>

    <path d="M22 143Q110 169 198 143L160 248Q110 265 60 248Z" fill="#fff3e6" stroke="#8d766d" stroke-width="3.2" stroke-linejoin="round"/>
    <path d="M39 151Q110 173 181 151L156 224Q110 240 64 224Z" fill="#b9a7ff" stroke="#57485a" stroke-width="2.8" stroke-linejoin="round"/>
    <path d="M40 154Q110 176 180 154" fill="none" stroke="#fff3e6" stroke-width="3"/>
    <path d="M58 207Q110 226 162 207L157 222Q110 239 63 222Z" fill="#f5d98b" stroke="#9d7946" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M105 211Q91 198 85 209Q84 220 104 220Q92 232 101 237Q110 238 111 220Q122 235 131 230Q137 221 116 216Q137 213 132 203Q126 196 110 211Z" fill="#f5d98b" stroke="#9d7946" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M101 217Q84 235 80 251Q95 246 111 222ZM116 218Q138 237 143 252Q127 247 110 222Z" fill="#f5d98b" stroke="#9d7946" stroke-width="2.6" stroke-linejoin="round"/>
    <path d="M103 212Q109 207 114 212Q118 218 111 221Q104 221 103 212Z" fill="#fff3e6" stroke="#9d7946" stroke-width="1.8"/>
  </svg>`;
}
