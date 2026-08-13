// ==========================================================================
// PROCEDURAL WEB AUDIO SYNTHESIZER — LUXURY AIRLINER ARRIVAL EDITION
// ==========================================================================

import { state } from './state.js';

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const sounds = {
  click() {
    if (!state.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(850, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {}
  },

  luxuryAirlinerArrival() {
    if (!state.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // 1. Smooth, Gentle Ambient Turbofan Jetliner Cruise
      const airOsc = ctx.createOscillator();
      const airGain = ctx.createGain();
      airOsc.type = 'sine';
      airOsc.frequency.setValueAtTime(140, now);
      airOsc.frequency.exponentialRampToValueAtTime(320, now + 1.0);
      airOsc.frequency.exponentialRampToValueAtTime(160, now + 2.4);

      airGain.gain.setValueAtTime(0.01, now);
      airGain.gain.linearRampToValueAtTime(0.28, now + 0.8);
      airGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

      airOsc.connect(airGain);
      airGain.connect(ctx.destination);
      airOsc.start(now);
      airOsc.stop(now + 2.5);

      // 2. Realistic "Ding-Dong" Cabin Chime (Welcome to Goa!) at t = 0.9s
      setTimeout(() => {
        try {
          const chime1 = ctx.createOscillator();
          const chime1Gain = ctx.createGain();
          chime1.type = 'sine';
          chime1.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
          chime1Gain.gain.setValueAtTime(0.3, ctx.currentTime);
          chime1Gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
          chime1.connect(chime1Gain);
          chime1Gain.connect(ctx.destination);
          chime1.start();
          chime1.stop(ctx.currentTime + 0.5);

          setTimeout(() => {
            try {
              const chime2 = ctx.createOscillator();
              const chime2Gain = ctx.createGain();
              chime2.type = 'sine';
              chime2.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
              chime2Gain.gain.setValueAtTime(0.32, ctx.currentTime);
              chime2Gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
              chime2.connect(chime2Gain);
              chime2Gain.connect(ctx.destination);
              chime2.start();
              chime2.stop(ctx.currentTime + 0.7);
            } catch (e) {}
          }, 180);
        } catch (e) {}
      }, 900);

      // 3. Soaring Triumphal Goa Beach Fanfare (at t = 1.3s)
      setTimeout(() => {
        try {
          const notes = [523.25, 659.25, 783.99, 1046.50];
          notes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
            gain.gain.setValueAtTime(0.01, ctx.currentTime + idx * 0.08);
            gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + idx * 0.08 + 0.06);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 1.2);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime + idx * 0.08);
            osc.stop(ctx.currentTime + idx * 0.08 + 1.2);
          });
        } catch (e) {}
      }, 1300);

    } catch (e) {}
  },

  whooshFlight() {
    if (!state.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 0.4);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.8);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch (e) {}
  },

  waterDive() {
    if (!state.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.6);

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch (e) {}
  },

  shutter() {
    if (!state.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.setValueAtTime(400, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch (e) {}
  },

  revealCelebration() {
    if (!state.soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08);

        gain.gain.setValueAtTime(0.01, ctx.currentTime + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + i * 0.08 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.6);
      });
    } catch (e) {}
  }
};
