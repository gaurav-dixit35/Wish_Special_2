const BPM = 70;
const BEAT = 60 / BPM;
const BAR = BEAT * 4;
const melody = [
  [0, 523.25], [0.5, 587.33], [1, 659.25], [2, 783.99], [2.5, 659.25], [3, 587.33],
  [4, 523.25], [5, 659.25], [6, 783.99], [7, 659.25],
  [8, 659.25], [9, 783.99], [10, 880], [11, 783.99],
  [12, 659.25], [13, 587.33], [14, 523.25], [15, 587.33],
];
const chords = [
  [130.81, 164.81, 196],
  [110, 130.81, 164.81],
  [174.61, 220, 261.63],
  [196, 246.94, 293.66],
];

function makeImpulse(context, seconds = 1.8, decay = 2.4) {
  const rate = context.sampleRate;
  const buffer = context.createBuffer(2, Math.floor(rate * seconds), rate);
  for (let channel = 0; channel < 2; channel += 1) {
    const samples = buffer.getChannelData(channel);
    for (let i = 0; i < samples.length; i += 1) samples[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / samples.length, decay);
  }
  return buffer;
}

export class MusicPlayer {
  constructor() {
    this.context = null;
    this.master = null;
    this.timer = null;
    this.nextBarAt = 0;
    this.barIndex = 0;
    this.muted = false;
    this.started = false;
    this.external = null;
    this.externalChecked = false;
    this.mode = 'generated';
  }

  async detectExternal() {
    if (this.externalChecked) return this.external;
    this.externalChecked = true;
    try {
      const response = await fetch('./audio/music.mp3', { method: 'HEAD', cache: 'no-store' });
      if (response.ok) {
        this.external = new Audio('./audio/music.mp3');
        this.external.loop = true;
        this.external.volume = 0.45;
      }
    } catch {
      // Optional local audio is absent or not served; generated music is the fallback.
    }
    return this.external;
  }

  async start() {
    if (this.started) {
      if (this.context?.state === 'suspended') await this.context.resume();
      if (this.external?.paused) await this.external.play().catch(() => {});
      return;
    }
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass && !this.context) {
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
    }
    const resumePromise = this.context?.state === 'suspended' ? this.context.resume().catch(() => {}) : Promise.resolve();
    if (!this.externalChecked) await this.detectExternal();
    if (this.external) {
      this.external.muted = this.muted;
      const playPromise = this.external.play();
      await Promise.all([resumePromise, playPromise.catch(() => {})]);
      this.mode = 'external';
      this.started = true;
      return;
    }
    if (!this.context) return;
    await resumePromise;
    this.nextBarAt = this.context.currentTime + 0.12;
    this.schedule();
    this.timer = window.setInterval(() => this.schedule(), 120);
    this.started = true;
  }

  schedule() {
    if (!this.context || this.context.state !== 'running') return;
    const horizon = this.context.currentTime + 0.35;
    while (this.nextBarAt < horizon) {
      const barNumber = this.barIndex % chords.length;
      this.scheduleChord(chords[barNumber], this.nextBarAt, BAR);
      const phraseOffset = barNumber * 4;
      for (const [step, frequency] of melody) {
        if (Math.floor(step / 4) !== barNumber) continue;
        const beatInBar = step % 4;
        this.scheduleNote(frequency, this.nextBarAt + beatInBar * BEAT, phraseOffset + step);
      }
      this.nextBarAt += BAR;
      this.barIndex += 1;
    }
  }

  scheduleNote(frequency, at, index) {
    const context = this.context;
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = index % 2 ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(frequency, at);
    gain.gain.setValueAtTime(0.0001, at);
    gain.gain.exponentialRampToValueAtTime(0.105, at + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.0001, at + 0.44);
    osc.connect(gain);
    gain.connect(this.dry);
    gain.connect(this.reverbInput);
    osc.start(at);
    osc.stop(at + 0.46);
  }

  scheduleChord(frequencies, at, duration) {
    for (const frequency of frequencies) {
      const osc = this.context.createOscillator();
      const gain = this.context.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, at);
      gain.gain.setValueAtTime(0.0001, at);
      gain.gain.linearRampToValueAtTime(0.018, at + 0.35);
      gain.gain.setValueAtTime(0.018, at + duration - 0.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, at + duration);
      osc.connect(gain);
      gain.connect(this.dry);
      gain.connect(this.reverbInput);
      osc.start(at);
      osc.stop(at + duration + 0.02);
    }
  }

  setMuted(muted) {
    this.muted = Boolean(muted);
    if (this.master && this.context) this.master.gain.setTargetAtTime(this.muted ? 0 : 0.45, this.context.currentTime, 0.04);
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
    notes.forEach((frequency, i) => {
      const osc = this.context.createOscillator();
      const gain = this.context.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, at + i * 0.055);
      gain.gain.setValueAtTime(0.0001, at + i * 0.055);
      gain.gain.exponentialRampToValueAtTime(volume / notes.length, at + i * 0.055 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, at + decay);
      osc.connect(gain).connect(this.dry);
      osc.start(at + i * 0.055);
      osc.stop(at + decay + 0.02);
    });
  }

  pause() {
    if (this.timer) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
    if (this.external && !this.external.paused) this.external.pause();
    if (this.context?.state === 'running') this.context.suspend();
  }

  resume() {
    if (this.external && this.started && this.external.paused) this.external.play().catch(() => {});
    if (this.context?.state === 'suspended') {
      this.context.resume().then(() => {
        if (!this.external && this.started && !this.timer) {
          this.nextBarAt = this.context.currentTime + 0.12;
          this.schedule();
          this.timer = window.setInterval(() => this.schedule(), 120);
        }
      });
    }
  }
}

export const musicPlayer = new MusicPlayer();
