const rose = (x, y, scale = 1, angle = 0) => `<g transform="translate(${x} ${y}) rotate(${angle}) scale(${scale})" stroke="#57485a" stroke-width="1.5" stroke-linejoin="round">
  <circle r="29" fill="#f4a9b8"/>
  <path d="M-2-27Q10-31 18-22Q31-16 26-3Q31 10 18 17Q11 30-2 25Q-15 31-22 19Q-34 11-26-2Q-31-16-17-22Q-11-30-2-27Z" fill="#e8788f"/>
  <path d="M-4-21Q7-25 14-16Q24-10 19 0Q24 10 12 15Q7 23-4 19Q-15 24-19 12Q-27 5-18-5Q-22-14-11-19Q-8-22-4-21Z" fill="#f4a9b8"/>
  <path d="M-3-15Q5-19 11-12Q18-6 12 1Q17 8 7 12Q0 17-7 10Q-17 7-12-2Q-17-9-9-13Q-6-16-3-15Z" fill="#e8788f"/>
  <path d="M-2-9Q4-12 8-7Q13-2 7 2Q12 7 3 9Q-3 12-7 6Q-12 2-7-3Q-10-8-2-9Z" fill="#f4a9b8"/>
  <path d="M-1-4Q4-7 6-2Q9 2 4 4Q0 7-3 3Q-7 0-3-3Z" fill="#e8788f"/>
  <ellipse cx="-13" cy="-14" rx="5" ry="3.2" fill="#ffd2dc" stroke="none" transform="rotate(-32 -13 -14)"/>
</g>`;

const peony = (x, y, scale = 1, angle = 0) => `<g transform="translate(${x} ${y}) rotate(${angle}) scale(${scale})" stroke="#57485a" stroke-width="1.5" stroke-linejoin="round">
  <path d="M0-24Q9-30 15-20Q27-18 22-7Q30 3 19 12Q16 26 4 21Q-7 29-14 18Q-28 14-22 2Q-29-9-17-16Q-12-28 0-24Z" fill="#fff3e6"/>
  <path d="M-1-18Q8-23 13-14Q22-11 18-2Q24 6 14 12Q11 21 2 17Q-7 24-12 14Q-21 11-17 2Q-23-6-13-12Q-10-21-1-18Z" fill="#f4d7c8"/>
  <path d="M-1-11Q6-15 10-8Q17-5 13 2Q18 8 9 12Q5 17-2 12Q-10 17-13 8Q-19 4-12-2Q-16-8-8-10Q-6-13-1-11Z" fill="#fffaf3"/>
  <path d="M-1-5Q4-8 7-3Q11 1 6 5Q2 9-3 5Q-8 2-5-3Z" fill="#f5dfd4"/>
  <ellipse cx="-10" cy="-11" rx="4" ry="2.6" fill="#fffaf3" stroke="none" transform="rotate(-35 -10 -11)"/>
</g>`;

const lisianthus = (x, y, scale = 1, angle = 0) => `<g transform="translate(${x} ${y}) rotate(${angle}) scale(${scale})" stroke="#57485a" stroke-width="1.35" stroke-linejoin="round">
  <circle cx="0" cy="-10" r="10" fill="#b9a7ff"/><circle cx="9.5" cy="-3" r="10" fill="#c6b8ff"/>
  <circle cx="6" cy="8" r="10" fill="#b9a7ff"/><circle cx="-6" cy="8" r="10" fill="#c6b8ff"/>
  <circle cx="-9.5" cy="-3" r="10" fill="#b9a7ff"/>
  <circle r="6" fill="#f4d7c8"/><circle r="2.5" fill="#f5d98b" stroke="none"/>
  <ellipse cx="-5" cy="-8" rx="2.7" ry="1.8" fill="#e1d8ff" stroke="none" transform="rotate(-35 -5 -8)"/>
</g>`;

const leaf = (x, y, angle, scale = 1) => `<path d="M0 0Q-12-9-15-25Q1-20 4-4Q12-18 22-19Q20-3 3 3Z" transform="translate(${x} ${y}) rotate(${angle}) scale(${scale})" fill="#8fc9a5" stroke="#5fa684" stroke-width="1.5" stroke-linejoin="round"/>`;

const lavenderSprig = (x, y, scale = 1, angle = 0) => `<g transform="translate(${x} ${y}) rotate(${angle}) scale(${scale})" stroke-linecap="round" stroke-linejoin="round">
  <path d="M0 30Q2 15 0 0" fill="none" stroke="#5fa684" stroke-width="2"/>
  <g fill="#b9a7ff" stroke="#8e7dc5" stroke-width="1"><ellipse cx="-4" cy="5" rx="3.5" ry="5"/><ellipse cx="4" cy="9" rx="3.5" ry="5"/><ellipse cx="-4" cy="14" rx="3.5" ry="5"/><ellipse cx="4" cy="18" rx="3.5" ry="5"/><ellipse cx="0" cy="0" rx="3.5" ry="5"/></g>
</g>`;

export function drawBouquet(sizePx, variant = 'gift') {
  const size = Math.max(48, Math.min(240, Math.round(Number(sizePx) || 110)));
  const kind = variant === 'held' ? 'held' : 'gift';
  const giftOnly = kind === 'gift';

  return `<svg class="bouquet-art bouquet-art--${kind}" width="${size}" height="${Math.round(size * 260 / 200)}" viewBox="0 0 200 260" role="img" aria-label="A hand-tied bouquet of roses and flowers" xmlns="http://www.w3.org/2000/svg">
    ${giftOnly ? '<ellipse cx="100" cy="258" rx="18" ry="1.5" fill="#57485a" opacity=".1"/>' : ''}

    <g fill="none" stroke="#8fc9a5" stroke-width="2.2" stroke-linecap="round">
      <path d="M13 112Q14 83 34 60M187 112Q186 83 166 60M31 122Q31 95 45 77M169 122Q169 95 155 77"/>
    </g>
    ${leaf(11, 103, -58, .9)}${leaf(20, 83, -25, .82)}${leaf(31, 70, 18, .75)}
    ${leaf(189, 103, 58, .9)}${leaf(180, 83, 25, .82)}${leaf(169, 70, -18, .75)}
    ${leaf(28, 123, -72, .68)}${leaf(172, 123, 72, .68)}

    ${lavenderSprig(61, 32, .8, -18)}${lavenderSprig(139, 32, .8, 18)}
    <g fill="#fff3e6" stroke="#d9c6b9" stroke-width=".9">
      <circle cx="39" cy="40" r="2.7"/><circle cx="49" cy="31" r="2.5"/><circle cx="56" cy="43" r="2.4"/>
      <circle cx="161" cy="40" r="2.7"/><circle cx="151" cy="31" r="2.5"/><circle cx="144" cy="43" r="2.4"/>
      <circle cx="24" cy="91" r="2.4"/><circle cx="177" cy="91" r="2.4"/>
    </g>

    <g fill="none" stroke="#5fa684" stroke-width="2.5" stroke-linecap="round">
      <path d="M91 219Q94 235 87 258M97 220Q99 237 96 258M103 220Q102 239 105 258M109 219Q106 237 114 258"/>
    </g>

    <path d="M17 122Q30 116 43 123Q58 132 73 125Q88 118 101 124Q116 132 131 126Q148 119 162 124Q176 118 184 124L164 177Q145 216 100 247Q57 221 36 178Z" fill="#fff3e6" stroke="#57485a" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M96 130Q126 138 151 132Q170 129 181 124L162 174Q146 211 100 244Q107 211 107 184Q104 153 96 130Z" fill="#b9a7ff" stroke="#57485a" stroke-width="1.3" stroke-linejoin="round"/>
    <path d="M100 142Q102 186 100 230M49 154Q68 193 97 228M151 151Q134 191 105 228" fill="none" stroke="#d7c9ba" stroke-width="1.3" stroke-linecap="round"/>
    <g fill="#f5d98b" stroke="none" opacity=".2">
      <circle cx="144" cy="154" r="2.2"/><circle cx="155" cy="166" r="1.8"/><circle cx="136" cy="178" r="1.6"/>
    </g>
    <path d="M20 123Q36 117 50 127" fill="none" stroke="#fffaf3" stroke-width="2" stroke-linecap="round"/>

    ${peony(84, 65, .7, -5)}${peony(116, 63, .68, 6)}
    ${lisianthus(40, 99, 1.02, -7)}${peony(75, 96, 1, -4)}${peony(126, 94, 1, 5)}${lisianthus(160, 99, 1.02, 8)}
    ${rose(59, 126, .93, -5)}${rose(100, 111, 1.16, 2)}${rose(141, 125, .93, 6)}

    <path class="bouquet-twinkle bouquet-twinkle--one" d="M117 85l2.5 5.5 5.5 2.5-5.5 2.5-2.5 5.5-2.5-5.5-5.5-2.5 5.5-2.5Z" fill="#f5d98b"/>
    <path class="bouquet-twinkle bouquet-twinkle--two" d="M26 62l2 4.5 4.5 2-4.5 2-2 4.5-2-4.5-4.5-2 4.5-2Z" fill="#f5d98b"/>
    ${giftOnly ? '<path class="bouquet-twinkle bouquet-twinkle--three" d="M174 145l2 4.5 4.5 2-4.5 2-2 4.5-2-4.5-4.5-2 4.5-2Z" fill="#f5d98b"/>' : ''}

    <path d="M43 151Q100 169 157 151L153 161Q101 179 47 162Z" fill="#f5d98b" stroke="#b38d43" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M97 159Q82 141 73 151Q68 161 94 167Q77 174 79 184Q87 190 100 168Z" fill="#f5d98b" stroke="#b38d43" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M103 159Q118 141 127 151Q132 161 106 167Q123 174 121 184Q113 190 100 168Z" fill="#f5d98b" stroke="#b38d43" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M96 165Q86 183 73 201Q87 197 96 208Q103 186 103 166Z" fill="#f5d98b" stroke="#b38d43" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M104 165Q116 180 132 195Q119 195 108 208Q102 187 100 166Z" fill="#d9b45f" stroke="#b38d43" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M95 158Q100 153 105 158L108 164Q102 170 96 164Z" fill="#fff3e6" stroke="#b38d43" stroke-width="1.4" stroke-linejoin="round"/>
  </svg>`;
}
