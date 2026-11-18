import { registerBackgroundLoop } from './loops.js';

const COLORS = ['#f5d98b', '#ffc9d9', '#c9bcff'];
const MAX_PARTICLES = 30;
const HOLD_MS = 600;
const SOUND_GAP_MS = 150;

export function createMagicEffects({ playSparkle = () => {}, maxLiveParticles = MAX_PARTICLES } = {}) {
  const canvas = document.createElement('canvas');
  canvas.className = 'magic-overlay';
  canvas.setAttribute('aria-hidden', 'true');
  const context = canvas.getContext('2d', { alpha: true });
  if (!context) throw new Error('Canvas is unavailable');
  document.body.append(canvas);

  const particles = [];
  const activePointers = new Map();
  let frame = 0;
  let frameWindowStart = 0;
  let frameWindowCount = 0;
  const sceneParticleBudget = Math.max(0, Math.min(MAX_PARTICLES, Math.floor(maxLiveParticles)));
  let particleLimit = sceneParticleBudget;
  let lastSoundAt = -Infinity;
  let dpr = 1;
  let width = 0;
  let height = 0;
  let destroyed = false;

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  const sound = () => {
    const now = performance.now();
    if (now - lastSoundAt < SOUND_GAP_MS) return;
    lastSoundAt = now;
    try { playSparkle(); } catch { /* Audio is an optional enhancement. */ }
  };
  const add = (particle) => {
    if (particles.length >= particleLimit) particles.shift();
    particles.push(particle);
    requestFrame();
  };
  const star = (x, y, options = {}) => {
    const life = options.life ?? (420 + Math.random() * 380);
    add({
      type: options.type || 'star', x, y,
      vx: options.vx ?? (Math.random() - 0.5) * 34,
      vy: options.vy ?? (-16 - Math.random() * 30),
      size: options.size ?? (2 + Math.random() * 2.8),
      color: options.color || COLORS[Math.floor(Math.random() * COLORS.length)],
      spin: Math.random() * Math.PI,
      spinRate: (Math.random() - 0.5) * 5,
      age: 0, life,
    });
  };
  const ring = (x, y, burst = false) => {
    add({ type: 'ring', x, y, age: 0, life: 520, burst });
    if (burst) {
      for (let index = 0; index < 8; index += 1) {
        const angle = index * Math.PI / 4;
        const speed = 32 + Math.random() * 28;
        star(x, y, {
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 2.2 + Math.random() * 1.5,
          life: 500 + Math.random() * 250,
        });
      }
    }
  };
  const burstAt = (x, y, count = 8, colors = COLORS) => {
    const amount = Math.max(0, Math.min(particleLimit, Math.floor(count)));
    for (let index = 0; index < amount; index += 1) {
      const angle = index * Math.PI * 2 / amount - Math.PI / 2;
      const speed = 34 + Math.random() * 26;
      star(x, y, {
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 2.2 + Math.random() * 1.6,
        life: 650 + Math.random() * 150,
        color: colors[index % colors.length],
      });
    }
  };
  const requestFrame = () => {
    if (!frame && !document.hidden && !destroyed && particles.length) frame = requestAnimationFrame(draw);
  };
  const drawStar = (particle, alpha) => {
    context.save();
    context.translate(particle.x, particle.y);
    context.rotate(particle.spin);
    context.globalAlpha = alpha;
    context.fillStyle = particle.color;
    context.shadowColor = particle.color;
    context.shadowBlur = particle.size * 3;
    const size = particle.size;
    context.beginPath();
    if (particle.type === 'dot') {
      context.arc(0, 0, size * 0.55, 0, Math.PI * 2);
    } else {
      context.moveTo(0, -size);
      context.lineTo(size * 0.32, -size * 0.32);
      context.lineTo(size, 0);
      context.lineTo(size * 0.32, size * 0.32);
      context.lineTo(0, size);
      context.lineTo(-size * 0.32, size * 0.32);
      context.lineTo(-size, 0);
      context.lineTo(-size * 0.32, -size * 0.32);
      context.closePath();
    }
    context.fill();
    context.restore();
  };
  function draw(now) {
    frame = 0;
    if (document.hidden || destroyed) return;
    if (!frameWindowStart) frameWindowStart = now;
    frameWindowCount += 1;
    if (now - frameWindowStart >= 2000) {
      const fps = frameWindowCount * 1000 / (now - frameWindowStart);
      if (fps < 50) particleLimit = Math.floor(sceneParticleBudget * 0.6);
      frameWindowStart = now;
      frameWindowCount = 0;
    }

    context.clearRect(0, 0, width, height);
    const delta = Math.min(40, Math.max(0, now - (draw.lastAt || now))) / 1000;
    draw.lastAt = now;
    for (let index = particles.length - 1; index >= 0; index -= 1) {
      const particle = particles[index];
      particle.age += delta * 1000;
      const progress = Math.min(1, particle.age / particle.life);
      const alpha = Math.sin(Math.PI * progress) * (particle.type === 'ring' ? 0.75 : 0.9);
      if (particle.type === 'ring') {
        context.save();
        context.globalAlpha = alpha;
        context.strokeStyle = '#f5d98b';
        context.lineWidth = 1.5;
        context.shadowColor = '#ffc9d9';
        context.shadowBlur = 12;
        context.beginPath();
        context.arc(particle.x, particle.y, 5 + progress * (particle.burst ? 42 : 30), 0, Math.PI * 2);
        context.stroke();
        context.restore();
      } else {
        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;
        particle.vy -= 7 * delta;
        particle.spin += particle.spinRate * delta;
        drawStar(particle, alpha);
      }
      if (progress >= 1) particles.splice(index, 1);
    }
    if (particles.length) requestFrame();
    else {
      draw.lastAt = 0;
      frameWindowStart = 0;
      frameWindowCount = 0;
    }
  }

  const point = (event) => ({ x: event.clientX, y: event.clientY });
  const isButton = (target) => Boolean(target instanceof Element && target.closest('button, [role="button"]'));
  const handleMove = (event) => {
    if (document.hidden) return;
    if (event.pointerType === 'touch') {
      const active = activePointers.get(event.pointerId);
      if (active) {
        const next = point(event);
        const dx = next.x - active.x;
        const dy = next.y - active.y;
        if (Math.hypot(dx, dy) >= 12) {
          const color = COLORS[Math.floor(Math.random() * COLORS.length)];
          star(next.x, next.y, { type: Math.random() < 0.35 ? 'dot' : 'star', size: 1.7 + Math.random() * 1.3, life: 450 + Math.random() * 300, color });
          active.moved = active.moved || Math.hypot(next.x - active.startX, next.y - active.startY) > 10;
          active.x = next.x;
          active.y = next.y;
        }
      }
    } else if (event.pointerType === 'mouse' && Math.random() < 0.55) {
      const next = point(event);
      star(next.x, next.y, { type: Math.random() < 0.35 ? 'dot' : 'star', size: 2 + Math.random() * 1.5, life: 400 + Math.random() * 250 });
    }
  };
  const handleDown = (event) => {
    if (document.hidden || event.button > 0) return;
    const next = point(event);
    const onButton = isButton(event.target);
    const state = { ...next, startX: next.x, startY: next.y, moved: false, onButton, held: false, holdTimer: 0 };
    activePointers.set(event.pointerId, state);
    if (!onButton) {
      state.holdTimer = window.setTimeout(() => {
        state.held = true;
        state.bloom = { type: 'ring', x: state.x, y: state.y, age: 0, life: 850, burst: false };
        add(state.bloom);
        for (let index = 0; index < 9; index += 1) {
          star(state.x + (Math.random() - 0.5) * 30, state.y + 8, {
            vx: (Math.random() - 0.5) * 22,
            vy: -24 - Math.random() * 34,
            size: 1.5 + Math.random() * 2,
            life: 700 + Math.random() * 300,
          });
        }
      }, HOLD_MS);
    }
  };
  const handleUp = (event) => {
    const active = activePointers.get(event.pointerId);
    if (!active) return;
    window.clearTimeout(active.holdTimer);
    activePointers.delete(event.pointerId);
    if (active.held) {
      if (active.bloom) active.bloom.life = Math.min(active.bloom.life, active.bloom.age + 180);
      return;
    }
    if (active.onButton) return;
    const next = point(event);
    if (!active.moved && event.pointerType === 'touch') {
      ring(next.x, next.y, true);
      sound();
    } else if (event.pointerType === 'mouse') {
      ring(next.x, next.y, true);
      sound();
    }
  };
  const handleCancel = (event) => {
    const active = activePointers.get(event.pointerId);
    if (active) window.clearTimeout(active.holdTimer);
    activePointers.delete(event.pointerId);
  };
  const handleClick = (event) => {
    if (!isButton(event.target) || document.hidden) return;
    const rect = event.target.getBoundingClientRect();
    ring(rect.left + rect.width / 2, rect.top + rect.height / 2, false);
    sound();
  };
  const pause = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    for (const active of activePointers.values()) window.clearTimeout(active.holdTimer);
    activePointers.clear();
  };
  const resume = () => requestFrame();
  const unregister = registerBackgroundLoop({ pause, resume });

  resize();
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('pointermove', handleMove, { passive: true });
  window.addEventListener('pointerdown', handleDown, { passive: true });
  window.addEventListener('pointerup', handleUp, { passive: true });
  window.addEventListener('pointercancel', handleCancel, { passive: true });
  document.addEventListener('click', handleClick);
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) document.documentElement.classList.add('magic-cursor');

  return {
    getLiveCount: () => particles.length,
    burstAt,
    destroy() {
      destroyed = true;
      pause();
      unregister();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerdown', handleDown);
      window.removeEventListener('pointerup', handleUp);
      window.removeEventListener('pointercancel', handleCancel);
      document.removeEventListener('click', handleClick);
      document.documentElement.classList.remove('magic-cursor');
      canvas.remove();
    },
  };
}
