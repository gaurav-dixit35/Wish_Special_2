import { registerBackgroundLoop } from './loops.js';

export function startSkyStars(canvas, { count = 10 } = {}) {
  let context;
  try { context = canvas?.getContext('2d', { alpha: true }); }
  catch { return () => {}; }
  if (!context) return () => {};

  const baseCount = Math.max(1, count);
  let liveCount = baseCount;
  let width = 0;
  let height = 0;
  let ratio = 1;
  let frame = 0;
  let windowStart = 0;
  let frameCount = 0;
  let closed = false;
  const stars = Array.from({ length: baseCount }, (_, index) => ({
    x: (index * 47.37 + 5) % 100,
    y: (index * 31.71 + 4) % 64,
    depth: index % 3,
    phase: index * 1.71,
    speed: 0.0007 + (index % 3) * 0.00032,
  }));

  const resize = () => {
    const bounds = canvas.getBoundingClientRect();
    width = bounds.width || window.innerWidth;
    height = bounds.height || window.innerHeight;
    ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  };
  const draw = (time) => {
    frame = 0;
    if (closed || document.hidden) return;
    if (!windowStart) windowStart = time;
    frameCount += 1;
    if (time - windowStart >= 2000) {
      const fps = frameCount * 1000 / (time - windowStart);
      if (fps < 50) liveCount = Math.max(1, Math.floor(baseCount * 0.6));
      windowStart = time;
      frameCount = 0;
    }
    context.clearRect(0, 0, width, height);
    for (let index = 0; index < liveCount; index += 1) {
      const star = stars[index];
      const size = [1.1, 1.8, 2.5][star.depth];
      const glow = [2, 4, 7][star.depth];
      const opacity = 0.38 + (0.58 * (0.5 + 0.5 * Math.sin(time * star.speed + star.phase)));
      const x = star.x * width / 100;
      const y = star.y * height / 100;
      context.globalAlpha = opacity;
      context.fillStyle = '#fff8e9';
      context.shadowColor = '#fff1ce';
      context.shadowBlur = glow;
      context.beginPath();
      context.arc(x, y, size / 2, 0, Math.PI * 2);
      context.fill();
    }
    context.globalAlpha = 1;
    context.shadowBlur = 0;
    if (!closed && !document.hidden) frame = requestAnimationFrame(draw);
    else {
      windowStart = 0;
      frameCount = 0;
    }
  };
  const request = () => {
    if (!frame && !closed && !document.hidden) frame = requestAnimationFrame(draw);
  };
  const pause = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    windowStart = 0;
    frameCount = 0;
  };
  resize();
  window.addEventListener('resize', resize, { passive: true });
  const unregister = registerBackgroundLoop({ pause, resume: request });
  request();
  return () => {
    closed = true;
    pause();
    unregister();
    window.removeEventListener('resize', resize);
    context.clearRect(0, 0, width, height);
  };
}
