// ==========================================================================
// HH GOA 2026 — MASTER APPLICATION CONTROLLER (CUTE CARTOON EDITION)
// ==========================================================================

import { createIcons, icons } from 'lucide';
import confetti from 'canvas-confetti';

import { state } from './engine/state.js';
import { sounds } from './engine/soundEffects.js';
import { getRandomTitle, getRandomSuperpower, getRandomCoffeeVibe, generateBadgeId } from './engine/titleGenerator.js';
import { processUploadedFile, initImageState } from './engine/imageProcessor.js';
import { renderToCanvas } from './engine/canvasRenderer.js';
import { downloadGraphic, copyToClipboard, shareToX, showToast } from './engine/shareHandler.js';

// DOM Elements
let previewCanvas, exportCanvas;
let layersSlider, stepBtns, levelDots;
let isDragging = false;
let startDragX = 0, startDragY = 0;
let initialPanX = 0, initialPanY = 0;

// Initialize on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  createIcons({ icons });

  // Canvas References
  previewCanvas = document.getElementById('preview-canvas');
  exportCanvas = document.getElementById('final-export-canvas');
  layersSlider = document.getElementById('layers-slider');
  stepBtns = document.querySelectorAll('.altitude-step');
  levelDots = document.querySelectorAll('.level-dot');

  // Set Random initial badge ID
  state.badgeId = generateBadgeId();

  // Initialize Default Avatar
  initImageState();

  // Setup Global Interactive Click Sparkles
  setupGlobalClickSparkles();

  // Setup Cute Cartoon Airplane Screen Tear Intro
  setupCuteAirplaneScreenTearIntro();

  // Setup Event Listeners
  setupNavigation();
  setupStudioControls();
  setupCanvasInteractions();
  setup3DHoloCard();
  setupBubbles();
  setupSoundToggle();

  // State Subscription for Live Canvas Re-render
  state.subscribe(() => {
    renderCanvases();
  });

  // Initial Render
  renderCanvases();
});

// --------------------------------------------------------------------------
// 0. GLOBAL CUTE CLICK SPARKLES
// --------------------------------------------------------------------------
function setupGlobalClickSparkles() {
  window.addEventListener('click', (e) => {
    createCuteSparkles(e.clientX, e.clientY);
  });
}

function createCuteSparkles(x, y) {
  const sparkCount = 7;
  const colors = ['#FF6B8B', '#00C2D1', '#FFD166', '#06D6A0', '#FFAEC0'];

  for (let i = 0; i < sparkCount; i++) {
    const spark = document.createElement('div');
    spark.className = 'click-spark';
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    spark.style.background = colors[i % colors.length];
    spark.style.color = colors[i % colors.length];

    const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() * 0.4 - 0.2);
    const distance = Math.random() * 32 + 18;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    spark.style.setProperty('--spark-dx', `${dx}px`);
    spark.style.setProperty('--spark-dy', `${dy}px`);

    document.body.appendChild(spark);
    setTimeout(() => {
      spark.remove();
    }, 650);
  }
}

// --------------------------------------------------------------------------
// 1. CUTE CARTOON AIRPLANE SCREEN TEAR INTRO (TEARS SCREEN IN TWO HALVES)
// --------------------------------------------------------------------------
function setupCuteAirplaneScreenTearIntro() {
  const introOverlay = document.getElementById('flight-intro-overlay');
  const planeTrack = document.getElementById('passenger-flight-track');
  const sunBurst = document.getElementById('sun-burst-reveal');
  const replayBtn = document.getElementById('btn-replay-intro');

  const executeCuteOpening = () => {
    introOverlay.classList.remove('dismissed', 'tearing');
    introOverlay.classList.add('active-intro');
    planeTrack.classList.remove('fly-cute');
    sunBurst.classList.remove('burst');

    // 1. Play cute cheerful flight chime
    sounds.luxuryAirlinerArrival();

    // 2. Adorable cartoon plane flies across
    requestAnimationFrame(() => {
      planeTrack.classList.add('fly-cute');
    });

    // 3. Screen tears cleanly into Top and Bottom halves at 750ms
    setTimeout(() => {
      sunBurst.classList.add('burst');
      introOverlay.classList.add('tearing');
    }, 750);

    // 4. Smooth Fade into Beach Studio with Colorful Confetti
    setTimeout(() => {
      introOverlay.classList.add('dismissed');
      introOverlay.classList.remove('active-intro');
      
      confetti({
        particleCount: 80,
        spread: 85,
        origin: { y: 0.35 },
        colors: ['#FF6B8B', '#00C2D1', '#FFD166', '#06D6A0']
      });
    }, 1650);
  };

  // Automatically trigger on page load
  setTimeout(() => {
    executeCuteOpening();
  }, 250);

  // Replay button in HUD
  replayBtn?.addEventListener('click', () => {
    goToLayer(0);
    executeCuteOpening();
  });
}

// --------------------------------------------------------------------------
// 2. LAYER NAVIGATION CONTROLLER
// --------------------------------------------------------------------------
function goToLayer(layerIndex) {
  if (layerIndex === state.currentLayer) return;

  state.currentLayer = layerIndex;
  
  layersSlider.style.transform = `translateY(-${layerIndex * 100}vh)`;

  stepBtns.forEach((btn, idx) => {
    btn.classList.toggle('active', idx === layerIndex);
  });

  levelDots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === layerIndex);
  });

  if (layerIndex === 0) {
    sounds.whooshFlight();
  } else if (layerIndex === 1) {
    sounds.click();
  } else if (layerIndex === 2) {
    sounds.waterDive();
    sounds.revealCelebration();

    confetti({
      particleCount: 90,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#FF6B8B', '#00C2D1', '#FFD166', '#06D6A0']
    });
  }

  renderCanvases();
}

function setupNavigation() {
  stepBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = parseInt(btn.getAttribute('data-layer'), 10);
      goToLayer(target);
    });
  });

  levelDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const target = parseInt(dot.getAttribute('data-layer'), 10);
      goToLayer(target);
    });
  });

  document.getElementById('nav-brand-logo')?.addEventListener('click', () => {
    goToLayer(0);
  });

  document.getElementById('btn-header-cta')?.addEventListener('click', () => {
    goToLayer(1);
  });

  document.getElementById('btn-descend-flight')?.addEventListener('click', () => {
    goToLayer(1);
  });

  document.getElementById('btn-scroll-indicator')?.addEventListener('click', () => {
    goToLayer(1);
  });

  document.getElementById('btn-dive-sea')?.addEventListener('click', () => {
    goToLayer(2);
  });

  document.getElementById('btn-reedit-pass')?.addEventListener('click', () => {
    goToLayer(1);
  });

  document.getElementById('btn-return-sky')?.addEventListener('click', () => {
    goToLayer(0);
  });
}

// --------------------------------------------------------------------------
// 3. STUDIO CONTROLS & FORM INPUTS
// --------------------------------------------------------------------------
function setupStudioControls() {
  const tabId = document.getElementById('tab-mode-id');
  const tabPfp = document.getElementById('tab-mode-pfp');
  const previewBox = document.getElementById('canvas-preview-wrap');
  const holoStage = document.getElementById('holo-card-stage');
  const holoLanyard = document.getElementById('holo-lanyard');
  const previewModeTag = document.getElementById('preview-mode-tag');
  const stackTagsSection = document.getElementById('stack-tags-section');

  tabId.addEventListener('click', () => {
    sounds.click();
    tabId.classList.add('active');
    tabPfp.classList.remove('active');
    previewBox.classList.remove('pfp-mode');
    holoStage.classList.remove('pfp-mode');
    holoLanyard.style.display = 'flex';
    previewModeTag.textContent = 'BUILDER ID';
    previewModeTag.className = 'badge-chip badge-pink';
    stackTagsSection.style.display = 'block';

    state.update({ formatMode: 'id' });
  });

  tabPfp.addEventListener('click', () => {
    sounds.click();
    tabPfp.classList.add('active');
    tabId.classList.remove('active');
    previewBox.classList.add('pfp-mode');
    holoStage.classList.add('pfp-mode');
    holoLanyard.style.display = 'none';
    previewModeTag.textContent = 'PFP FRAME';
    previewModeTag.className = 'badge-chip badge-cyan';
    stackTagsSection.style.display = 'none';

    state.update({ formatMode: 'pfp' });
  });

  // File Upload Dropzone
  const dropzone = document.getElementById('photo-dropzone');
  const fileInput = document.getElementById('file-input');

  dropzone.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (file) {
      showToast('Processing photo...');
      await processUploadedFile(file);
      showToast('Photo loaded! Drag canvas to adjust framing.');
    }
  });

  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('drag-over');
  });

  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('drag-over');
  });

  dropzone.addEventListener('drop', async (e) => {
    e.preventDefault();
    dropzone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file) {
      showToast('Processing photo...');
      await processUploadedFile(file);
      showToast('Photo uploaded!');
    }
  });

  // Zoom Slider
  const zoomSlider = document.getElementById('zoom-slider');
  zoomSlider.addEventListener('input', (e) => {
    state.update({ zoom: parseFloat(e.target.value) });
  });

  // Rotate Button
  document.getElementById('btn-rotate-photo')?.addEventListener('click', () => {
    sounds.click();
    const newRot = (state.rotation + 90) % 360;
    state.update({ rotation: newRot });
  });

  // Reset Photo Button
  document.getElementById('btn-reset-photo')?.addEventListener('click', () => {
    sounds.click();
    zoomSlider.value = 1.0;
    state.update({
      zoom: 1.0,
      panX: 0,
      panY: 0,
      rotation: 0
    });
    showToast('Photo position reset.');
  });

  // Color Filter Chips
  const filterBtns = document.querySelectorAll('.filter-chip-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sounds.click();
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.update({ filter: btn.getAttribute('data-filter') });
    });
  });

  // Name Input
  const inputName = document.getElementById('input-name');
  inputName.addEventListener('input', (e) => {
    state.update({ name: e.target.value });
  });

  // Role Dropdown
  const selectRole = document.getElementById('select-role');
  const customRoleWrap = document.getElementById('custom-role-wrap');
  const inputCustomRole = document.getElementById('input-custom-role');

  selectRole.addEventListener('change', (e) => {
    sounds.click();
    const val = e.target.value;
    if (val === 'custom') {
      customRoleWrap.style.display = 'flex';
      inputCustomRole.focus();
      state.update({ role: 'custom', customRole: inputCustomRole.value || 'Specialist' });
    } else {
      customRoleWrap.style.display = 'none';
      state.update({ role: val, customRole: '' });
    }
  });

  inputCustomRole.addEventListener('input', (e) => {
    state.update({ customRole: e.target.value });
  });

  // Social & GitHub Handles
  const inputHandle = document.getElementById('input-handle');
  inputHandle.addEventListener('input', (e) => {
    state.update({ socialHandle: e.target.value });
  });

  const inputGithub = document.getElementById('input-github');
  inputGithub.addEventListener('input', (e) => {
    state.update({ githubHandle: e.target.value });
  });

  // Project Name
  const inputProject = document.getElementById('input-project');
  inputProject.addEventListener('input', (e) => {
    state.update({ projectName: e.target.value });
  });

  // Builder Title Input & Randomizer
  const inputTitle = document.getElementById('input-builder-title');
  inputTitle.addEventListener('input', (e) => {
    state.update({ builderTitle: e.target.value });
  });

  document.getElementById('btn-random-title')?.addEventListener('click', () => {
    sounds.click();
    const newTitle = getRandomTitle();
    inputTitle.value = newTitle;
    state.update({ builderTitle: newTitle });
    showToast(`Rolled Title: "${newTitle}"`);
  });

  // Superpower Input & Randomizer
  const inputSuperpower = document.getElementById('input-superpower');
  inputSuperpower.addEventListener('input', (e) => {
    state.update({ superpower: e.target.value });
  });

  document.getElementById('btn-random-power')?.addEventListener('click', () => {
    sounds.click();
    const newPower = getRandomSuperpower();
    inputSuperpower.value = newPower;
    state.update({ superpower: newPower });
    showToast(`Superpower: "${newPower}"`);
  });

  // Coffee / Beach Vibe Input & Randomizer
  const inputCoffee = document.getElementById('input-coffee');
  inputCoffee.addEventListener('input', (e) => {
    state.update({ coffeeVibe: e.target.value });
  });

  document.getElementById('btn-random-coffee')?.addEventListener('click', () => {
    sounds.click();
    const newCoffee = getRandomCoffeeVibe();
    inputCoffee.value = newCoffee;
    state.update({ coffeeVibe: newCoffee });
    showToast(`Beach Vibe: "${newCoffee}"`);
  });

  // Theme Selector Cards
  const themeCards = document.querySelectorAll('.theme-card-option');
  themeCards.forEach(card => {
    card.addEventListener('click', () => {
      sounds.click();
      themeCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      state.update({ theme: card.getAttribute('data-theme') });
    });
  });

  // Tech Stack Tags Picker
  const chipsContainer = document.getElementById('tech-chips-picker');
  chipsContainer.addEventListener('click', (e) => {
    const chip = e.target.closest('.tech-chip-tag');
    if (!chip) return;

    sounds.click();
    const tag = chip.getAttribute('data-tag');
    let currentTags = [...state.selectedTags];

    if (currentTags.includes(tag)) {
      currentTags = currentTags.filter(t => t !== tag);
      chip.classList.remove('selected');
    } else {
      if (currentTags.length >= 7) {
        showToast('Maximum 7 verified skills fit on badge.');
        return;
      }
      currentTags.push(tag);
      chip.classList.add('selected');
    }
    state.update({ selectedTags: currentTags });
  });

  // Add Custom Tech Tag
  const customTagInput = document.getElementById('input-custom-tag');
  const addTagBtn = document.getElementById('btn-add-tag');

  const handleAddCustomTag = () => {
    const rawVal = customTagInput.value.trim();
    if (!rawVal) return;

    if (state.selectedTags.length >= 7) {
      showToast('Maximum 7 verified skills fit on badge.');
      return;
    }

    if (!state.selectedTags.includes(rawVal)) {
      const newBtn = document.createElement('button');
      newBtn.className = 'tech-chip-tag selected';
      newBtn.setAttribute('data-tag', rawVal);
      newBtn.textContent = rawVal;
      chipsContainer.appendChild(newBtn);

      const updatedTags = [...state.selectedTags, rawVal];
      state.update({ selectedTags: updatedTags });
      customTagInput.value = '';
      sounds.click();
      showToast(`Added skill: "${rawVal}" to ID badge ✨`);
    } else {
      showToast(`"${rawVal}" is already on your pass.`);
    }
  };

  addTagBtn.addEventListener('click', handleAddCustomTag);
  customTagInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCustomTag();
    }
  });

  // Action Buttons (Download, Copy, Share)
  document.getElementById('btn-download-pass')?.addEventListener('click', downloadGraphic);
  document.getElementById('btn-copy-clipboard')?.addEventListener('click', copyToClipboard);
  document.getElementById('btn-share-pass-x')?.addEventListener('click', shareToX);
}

// --------------------------------------------------------------------------
// 4. INTERACTIVE CANVAS PHOTO DRAG-TO-PAN
// --------------------------------------------------------------------------
function setupCanvasInteractions() {
  const canvasWrap = document.getElementById('canvas-preview-wrap');

  const onPointerDown = (clientX, clientY) => {
    isDragging = true;
    startDragX = clientX;
    startDragY = clientY;
    initialPanX = state.panX;
    initialPanY = state.panY;
  };

  const onPointerMove = (clientX, clientY) => {
    if (!isDragging) return;
    const dx = (clientX - startDragX);
    const dy = (clientY - startDragY);
    state.update({
      panX: initialPanX + dx,
      panY: initialPanY + dy
    });
  };

  const onPointerUp = () => {
    isDragging = false;
  };

  // Mouse Events
  canvasWrap.addEventListener('mousedown', (e) => onPointerDown(e.clientX, e.clientY));
  window.addEventListener('mousemove', (e) => onPointerMove(e.clientX, e.clientY));
  window.addEventListener('mouseup', onPointerUp);

  // Touch Events for Mobile
  canvasWrap.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      onPointerDown(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length === 1) {
      onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  window.addEventListener('touchend', onPointerUp);
}

// --------------------------------------------------------------------------
// 5. 3D HOLOGRAPHIC TILT & FOIL SHEEN EFFECT
// --------------------------------------------------------------------------
function setup3DHoloCard() {
  const scene = document.getElementById('holo-card-scene');
  const stage = document.getElementById('holo-card-stage');
  const glare = document.getElementById('holo-foil-glare');

  if (!scene || !stage) return;

  const handleTilt = (clientX, clientY) => {
    const rect = stage.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = clientX - centerX;
    const mouseY = clientY - centerY;

    const rotateX = -(mouseY / (rect.height / 2)) * 14;
    const rotateY = (mouseX / (rect.width / 2)) * 14;

    stage.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    const angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI) + 90;
    if (glare) {
      glare.style.background = `linear-gradient(${angle}deg, rgba(255,255,255,0) 0%, rgba(0,194,209,0.35) 30%, rgba(255,107,139,0.4) 50%, rgba(255,209,102,0.4) 70%, rgba(255,255,255,0.9) 100%)`;
      glare.style.opacity = '0.9';
    }
  };

  const resetTilt = () => {
    stage.style.transform = 'rotateX(0deg) rotateY(0deg)';
    if (glare) {
      glare.style.opacity = '0.5';
    }
  };

  scene.addEventListener('mousemove', (e) => handleTilt(e.clientX, e.clientY));
  scene.addEventListener('mouseleave', resetTilt);

  if (window.DeviceOrientationEvent && typeof window.DeviceOrientationEvent.requestPermission !== 'function') {
    window.addEventListener('deviceorientation', (e) => {
      if (state.currentLayer !== 2) return;
      const gamma = e.gamma || 0;
      const beta = e.beta || 0;
      const rotY = Math.min(Math.max(gamma / 3, -15), 15);
      const rotX = Math.min(Math.max((beta - 45) / 3, -15), 15);
      stage.style.transform = `rotateX(${-rotX}deg) rotateY(${rotY}deg)`;
    });
  }
}

// --------------------------------------------------------------------------
// 6. UNDERWATER BUBBLES GENERATOR
// --------------------------------------------------------------------------
function setupBubbles() {
  const container = document.getElementById('bubbles-container');
  if (!container) return;

  const bubbleCount = 20;
  for (let i = 0; i < bubbleCount; i++) {
    const bubble = document.createElement('div');
    bubble.className = 'rising-bubble';
    
    const size = Math.random() * 22 + 8;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.animationDuration = `${Math.random() * 5 + 6}s`;
    bubble.style.animationDelay = `${Math.random() * 6}s`;
    
    container.appendChild(bubble);
  }
}

// --------------------------------------------------------------------------
// 7. SOUND FX TOGGLE
// --------------------------------------------------------------------------
function setupSoundToggle() {
  const soundBtn = document.getElementById('btn-sound-toggle');
  soundBtn?.addEventListener('click', () => {
    state.soundEnabled = !state.soundEnabled;
    soundBtn.classList.toggle('sound-on', state.soundEnabled);
    if (state.soundEnabled) {
      sounds.click();
      showToast('Sound effects enabled 🔔');
    } else {
      showToast('Sound muted 🔇');
    }
  });
}

// --------------------------------------------------------------------------
// 8. CANVAS RENDER SYNCHRONIZER
// --------------------------------------------------------------------------
async function renderCanvases() {
  if (previewCanvas) {
    await renderToCanvas(previewCanvas, false);
  }
  if (exportCanvas) {
    await renderToCanvas(exportCanvas, false);
  }
}
