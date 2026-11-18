function makeImpulse(context, seconds = 1.8, decay = 2.4) {
  const rate = context.sampleRate;
  const buffer = context.createBuffer(2, Math.floor(rate * seconds), rate);
  for (let channel = 0; channel < 2; channel += 1) {
    const samples = buffer.getChannelData(channel);
    for (let index = 0; index < samples.length; index += 1) {
      samples[index] = (Math.random() * 2 - 1) * Math.pow(1 - index / samples.length, decay);
    }
  }
  return buffer;
}

export class MusicPlayer {
  constructor() {
    this.context = null;
    this.master = null;
    this.dry = null;
    this.reverbInput = null;
    this.muted = false;
    this.started = false;
    this.external = null;
    this.externalChecked = false;
    this.mode = 'track';
  }

  async detectExternal() {
    if (this.externalChecked) return this.external;
    this.externalChecked = true;
    try {
      const response = await fetch('./audio/princess.mp3', { method: 'HEAD', cache: 'no-store' });
      if (!response.ok) return null;
      this.external = new Audio('./audio/princess.mp3');
      this.external.preload = 'auto';
      this.external.loop = true;
      this.external.volume = 0.45;
    } catch {
      // The story still works if the supplied soundtrack cannot be loaded.
    }
    return this.external;
  }

  initializeEffects() {
    if (this.context) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    try {
      this.context = new AudioContextClass();
      this.master = this.context.createGain();
      this.master.gain.value = this.muted ? 0 : 0.45;
      this.master.connect(this.context.destination);
      const convolver = this.context.createConvolver();
      convolver.buffer = makeImpulse(this.context);
      const wet = this.context.createGain();
      wet.gain.value = 0.19;
      convolver.connect(wet).connect(this.master);
      this.dry = this.context.createGain();
      this.dry.gain.value = 0.82;
      this.dry.connect(this.master);
      this.reverbInput = convolver;
    } catch {
      this.context = null;
      this.master = null;
      this.dry = null;
      this.reverbInput = null;
    }
  }

  async start() {
    if (this.started) {
      if (this.external?.paused) await this.external.play().catch(() => {});
      if (this.context?.state === 'suspended') await this.context.resume().catch(() => {});
      return;
    }
    this.initializeEffects();
    if (!this.externalChecked) await this.detectExternal();
    if (this.context?.state === 'suspended') await this.context.resume().catch(() => {});
    if (this.external) {
      this.external.muted = this.muted;
      await this.external.play().catch(() => {});
    }
    this.started = true;
  }

  setMuted(muted) {
    this.muted = Boolean(muted);
    if (this.master && this.context) {
      this.master.gain.setTargetAtTime(this.muted ? 0 : 0.45, this.context.currentTime, 0.04);
    }
    if (this.external) this.external.muted = this.muted;
  }

  sparkle() { this.playEffect([1046.5, 1568], 0.11, 0.44); }
  magicSparkle() { this.playEffect([784, 1046.5], 0.02, 0.24); }
  gate() {
    this.playEffect([261.63, 392, 523.25], 0.13, 0.8, 'triangle');
    if (!this.context || !this.dry || this.muted) return;
    const at = this.context.currentTime + 0.015;
    const creak = this.context.createOscillator();
    const envelope = this.context.createGain();
    creak.type = 'triangle';
    creak.frequency.setValueAtTime(176, at);
    creak.frequency.exponentialRampToValueAtTime(88, at + 0.42);
    envelope.gain.setValueAtTime(0.0001, at);
    envelope.gain.exponentialRampToValueAtTime(0.035, at + 0.045);
    envelope.gain.exponentialRampToValueAtTime(0.0001, at + 0.56);
    creak.connect(envelope).connect(this.dry);
    creak.start(at);
    creak.stop(at + 0.58);
  }
  tada() { this.playEffect([523.25, 659.25, 783.99], 0.2, 0.78); }

  playEffect(notes, volume, decay, type = 'sine') {
    if (!this.context || !this.master || this.muted) return;
    const at = this.context.currentTime + 0.015;
    notes.forEach((frequency, index) => {
      const osc = this.context.createOscillator();
      const gain = this.context.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, at + index * 0.055);
      gain.gain.setValueAtTime(0.0001, at + index * 0.055);
      gain.gain.exponentialRampToValueAtTime(volume / notes.length, at + index * 0.055 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, at + decay);
      osc.connect(gain);
      gain.connect(this.dry);
      gain.connect(this.reverbInput);
      osc.start(at + index * 0.055);
      osc.stop(at + decay + 0.02);
    });
  }

  pause() {
    if (this.external && !this.external.paused) this.external.pause();
    if (this.context?.state === 'running') this.context.suspend();
  }

  resume() {
    if (this.external && this.started && this.external.paused) this.external.play().catch(() => {});
    if (this.context?.state === 'suspended') this.context.resume().catch(() => {});
  }
}

export const musicPlayer = new MusicPlayer();
