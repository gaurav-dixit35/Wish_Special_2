import { musicPlayer } from './music.js';

const loops = new Set();
let hidden = document.hidden;
document.documentElement.classList.toggle('is-hidden', hidden);

loops.add({ pause: () => musicPlayer.pause(), resume: () => musicPlayer.resume() });

export function registerBackgroundLoop({ pause, resume }) {
  const loop = { pause, resume };
  loops.add(loop);
  if (hidden) pause?.();
  return () => loops.delete(loop);
}

document.addEventListener('visibilitychange', () => {
  hidden = document.hidden;
  document.documentElement.classList.toggle('is-hidden', hidden);
  for (const loop of loops) {
    if (hidden) loop.pause?.();
    else loop.resume?.();
  }
});

export function isDocumentHidden() { return hidden; }
