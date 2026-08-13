// ==========================================================================
// CANVAS RENDERING ENGINE — CUTE CARTOON BEACH EDITION
// ==========================================================================

import QRCode from 'qrcode';
import { state } from './state.js';

// Cute Cartoon Beach Theme Presets
export const THEMES = {
  sunset: {
    id: 'sunset',
    name: 'Strawberry Coral Pop',
    primary: '#FF6B8B',     // Strawberry Pink
    secondary: '#FFD166',   // Buttercup Yellow
    accent: '#00C2D1',      // Aqua Teal
    badgeBg: '#FFE4E8',
    cardBg: '#FFFDF9',
    textDark: '#0E3854',
    textMuted: '#64748B'
  },
  miami: {
    id: 'miami',
    name: 'Aqua Lagoon',
    primary: '#00C2D1',     // Aqua Teal
    secondary: '#FF6B8B',   // Strawberry Pink
    accent: '#FFD166',      // Sunny Yellow
    badgeBg: '#E0F7FA',
    cardBg: '#F8FCFE',
    textDark: '#0E3854',
    textMuted: '#64748B'
  },
  gold: {
    id: 'gold',
    name: 'Sunny Honey',
    primary: '#FFB703',     // Golden Sunshine
    secondary: '#FF6B8B',   // Strawberry Pink
    accent: '#06D6A0',      // Mint Green
    badgeBg: '#FFF9DB',
    cardBg: '#FFFDF5',
    textDark: '#0E3854',
    textMuted: '#64748B'
  },
  emerald: {
    id: 'emerald',
    name: 'Minty Coconut',
    primary: '#06D6A0',     // Mint Green
    secondary: '#00C2D1',   // Aqua Teal
    accent: '#FFD166',      // Sunshine Yellow
    badgeBg: '#E6FDF4',
    cardBg: '#F7FCF9',
    textDark: '#0E3854',
    textMuted: '#64748B'
  },
  ocean: {
    id: 'ocean',
    name: 'Cotton Candy',
    primary: '#FF8DA1',     // Soft Pink
    secondary: '#6ED4F8',   // Sky Blue
    accent: '#FFD166',      // Soft Yellow
    badgeBg: '#F0F9FF',
    cardBg: '#FDFBFF',
    textDark: '#0E3854',
    textMuted: '#64748B'
  },
  cyberpunk: {
    id: 'cyberpunk',
    name: 'Rainbow Beach',
    primary: '#FF6B8B',     // Coral
    secondary: '#00C2D1',   // Teal
    accent: '#06D6A0',      // Mint
    badgeBg: '#FFF5F7',
    cardBg: '#FCFBFF',
    textDark: '#0E3854',
    textMuted: '#64748B'
  }
};

let cachedQRCodeCanvas = null;
let lastQrData = '';

/**
 * Main Renderer entry point
 */
export async function renderToCanvas(targetCanvas, isExport = false) {
  if (!targetCanvas) return;
  const ctx = targetCanvas.getContext('2d');
  if (!ctx) return;

  const mode = state.formatMode;
  const scale = isExport ? 2 : 1;

  if (mode === 'id') {
    const width = 600 * scale;
    const height = 830 * scale;

    if (targetCanvas.width !== width || targetCanvas.height !== height) {
      targetCanvas.width = width;
      targetCanvas.height = height;
    }

    ctx.save();
    ctx.scale(scale, scale);
    await drawBuilderIDCard(ctx, 600, 830);
    ctx.restore();

  } else {
    const size = 800 * scale;
    if (targetCanvas.width !== size || targetCanvas.height !== size) {
      targetCanvas.width = size;
      targetCanvas.height = size;
    }

    ctx.save();
    ctx.scale(scale, scale);
    await drawPFPAvatarFrame(ctx, 800, 800);
    ctx.restore();
  }
}

/**
 * 🪪 Draw Cute Cartoon Builder ID Card (Participant Welcome Edition)
 */
async function drawBuilderIDCard(ctx, width, height) {
  const theme = THEMES[state.theme] || THEMES.sunset;

  // 1. Card Outer Clip (Cute Rounded Card with Chunky Border)
  ctx.save();
  const cardRadius = 32;
  roundRect(ctx, 10, 10, width - 20, height - 20, cardRadius);
  ctx.clip();

  // 2. Base Creamy/Pastel Background
  ctx.fillStyle = theme.cardBg;
  ctx.fillRect(0, 0, width, height);

  // 3. Cute Top Header Band (Pastel Gradient)
  const headerGrad = ctx.createLinearGradient(0, 0, width, 0);
  headerGrad.addColorStop(0, hexToRgba(theme.primary, 0.16));
  headerGrad.addColorStop(0.5, hexToRgba(theme.secondary, 0.2));
  headerGrad.addColorStop(1, hexToRgba(theme.accent, 0.16));
  ctx.fillStyle = headerGrad;
  ctx.fillRect(0, 0, width, 90);

  // 4. Header Text with Dynamic Spacing & Large Bold Fonts
  const startX = 32;
  const headerY = 50;

  ctx.font = '900 23px "Fredoka", "Outfit", sans-serif';
  ctx.fillStyle = theme.textDark;
  const text1 = '🌴 HACKER HOUSE ';
  ctx.fillText(text1, startX, headerY);

  const text1Width = ctx.measureText(text1).width;
  ctx.fillStyle = theme.primary;
  const text2 = 'GOA 2026 ☀️';
  ctx.fillText(text2, startX + text1Width + 6, headerY);

  // Cute Official Participant Pill (Far Right)
  ctx.fillStyle = theme.primary;
  roundRect(ctx, width - 145, 26, 115, 32, 16);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 12px "Fredoka", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('⭐ BUILDER PASS', width - 87, 47);
  ctx.textAlign = 'left';

  // 5. Photo Box with Cute Frame & Soft Shadow
  const photoX = 32;
  const photoY = 80;
  const photoW = 205;
  const photoH = 245;
  const photoRadius = 22;

  // Photo Outer Frame Shadow & Glow
  ctx.save();
  ctx.shadowColor = 'rgba(14, 56, 84, 0.12)';
  ctx.shadowBlur = 12;
  ctx.fillStyle = '#FFFFFF';
  roundRect(ctx, photoX - 4, photoY - 4, photoW + 8, photoH + 8, photoRadius + 4);
  ctx.fill();
  ctx.restore();

  // Photo Border Frame
  ctx.fillStyle = '#E0F7FA';
  roundRect(ctx, photoX, photoY, photoW, photoH, photoRadius);
  ctx.fill();

  // Draw Cropped Photo
  ctx.save();
  roundRect(ctx, photoX, photoY, photoW, photoH, photoRadius);
  ctx.clip();

  if (state.photoImage) {
    drawTransformedImage(ctx, state.photoImage, photoX, photoY, photoW, photoH);
  } else {
    // Cute fallback pastel avatar
    const photoGrad = ctx.createLinearGradient(photoX, photoY, photoX + photoW, photoY + photoH);
    photoGrad.addColorStop(0, '#BAE6FD');
    photoGrad.addColorStop(1, '#FFE4E8');
    ctx.fillStyle = photoGrad;
    ctx.fillRect(photoX, photoY, photoW, photoH);
  }
  ctx.restore();

  // Cute Photo Outline
  ctx.strokeStyle = theme.primary;
  ctx.lineWidth = 3.5;
  roundRect(ctx, photoX, photoY, photoW, photoH, photoRadius);
  ctx.stroke();

  // 6. Right Profile Column (Next to Photo)
  const metaX = 256;
  let curY = 80;

  // Cute Role Pill Badge
  const activeRole = state.role === 'custom' ? (state.customRole || 'Specialist') : state.role;
  ctx.fillStyle = theme.primary;
  roundRect(ctx, metaX, curY, 288, 32, 16);
  ctx.fill();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 13.5px "Fredoka", sans-serif';
  ctx.fillText(`💼 ROLE: ${activeRole.toUpperCase()}`, metaX + 14, curY + 21);

  // Full Name (High Contrast & Big 28px)
  curY += 60;
  ctx.fillStyle = theme.textDark;
  ctx.font = '900 28px "Fredoka", "Outfit", sans-serif';
  const displayName = truncateText(ctx, state.name || 'Anonymous Builder', 288);
  ctx.fillText(displayName, metaX, curY);

  // Social & GitHub Handles
  curY += 28;
  ctx.fillStyle = '#00838F';
  ctx.font = '700 14.5px "JetBrains Mono", monospace';
  ctx.fillText(`🐦 X: ${state.socialHandle || '@builder'}`, metaX, curY);

  if (state.githubHandle) {
    curY += 24;
    ctx.fillStyle = '#475569';
    ctx.font = '700 13.5px "JetBrains Mono", monospace';
    ctx.fillText(`💻 GH: ${state.githubHandle}`, metaX, curY);
  }

  // Project Name
  if (state.projectName) {
    curY += 28;
    ctx.fillStyle = '#64748B';
    ctx.font = '800 11.5px "Fredoka", sans-serif';
    ctx.fillText('HACKATHON PROJECT:', metaX, curY);

    curY += 20;
    ctx.fillStyle = theme.primary;
    ctx.font = '800 15px "Fredoka", sans-serif';
    const projText = truncateText(ctx, `🚀 ${state.projectName}`, 288);
    ctx.fillText(projText, metaX, curY);
  }

  // Builder Specialization Title
  curY += 28;
  ctx.fillStyle = '#64748B';
  ctx.font = '800 11.5px "Fredoka", sans-serif';
  ctx.fillText('SPECIALIZATION:', metaX, curY);

  curY += 20;
  ctx.fillStyle = theme.textDark;
  ctx.font = '800 14px "Fredoka", sans-serif';
  const specText = truncateText(ctx, `⚡ ${state.builderTitle}`, 288);
  ctx.fillText(specText, metaX, curY);

  // 7. Attribute Badges Grid (Superpower & Beach Vibe)
  const attrY = 338;
  const boxH = 54;
  
  // Superpower Box
  ctx.fillStyle = '#FFF9DB';
  roundRect(ctx, 32, attrY, 255, boxH, 16);
  ctx.fill();
  ctx.strokeStyle = '#FFD166';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#B45309';
  ctx.font = '800 11.5px "Fredoka", sans-serif';
  ctx.fillText('⚡ SUPERPOWER', 44, attrY + 20);

  ctx.fillStyle = theme.textDark;
  ctx.font = '800 13.5px "Fredoka", sans-serif';
  ctx.fillText(truncateText(ctx, state.superpower, 230), 44, attrY + 41);

  // Beach Vibe / Fuel Box
  ctx.fillStyle = '#E6FDF4';
  roundRect(ctx, 305, attrY, 263, boxH, 16);
  ctx.fill();
  ctx.strokeStyle = '#06D6A0';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = '#047857';
  ctx.font = '800 11.5px "Fredoka", sans-serif';
  ctx.fillText('🥥 BEACH FUEL / VIBE', 317, attrY + 20);

  ctx.fillStyle = theme.textDark;
  ctx.font = '800 13.5px "Fredoka", sans-serif';
  ctx.fillText(truncateText(ctx, state.coffeeVibe, 238), 317, attrY + 41);

  // 8. Tech Stack Chips (Multi-line Wrapping)
  const stackY = 412;
  ctx.fillStyle = '#64748B';
  ctx.font = '800 12.5px "Fredoka", sans-serif';
  ctx.fillText('VERIFIED TECH SKILLS:', 32, stackY);

  let tagX = 32;
  let tagY = stackY + 8;
  const maxTagRows = 2;
  let currentRow = 0;

  state.selectedTags.forEach((tag) => {
    if (currentRow >= maxTagRows) return;

    ctx.font = '700 13px "Fredoka", sans-serif';
    const tagWidth = ctx.measureText(tag).width + 24;

    if (tagX + tagWidth > width - 32) {
      currentRow++;
      if (currentRow >= maxTagRows) return;
      tagX = 32;
      tagY += 34;
    }

    ctx.fillStyle = '#E0F7FA';
    roundRect(ctx, tagX, tagY, tagWidth, 26, 13);
    ctx.fill();
    ctx.strokeStyle = '#00C2D1';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = '#00838F';
    ctx.fillText(tag, tagX + 12, tagY + 18);

    tagX += tagWidth + 8;
  });

  // 9. Dynamic QR Code & Participant Welcome Seal
  const qrX = 32;
  const qrY = 494;
  const qrSize = 110;

  // Background for QR
  ctx.fillStyle = '#FFFFFF';
  roundRect(ctx, qrX, qrY, qrSize, qrSize, 16);
  ctx.fill();
  ctx.strokeStyle = '#BAE6FD';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Dynamic QR
  const qrData = `https://x.com/${(state.socialHandle || 'hhgoa2026').replace('@', '')}?ref=hhgoa2026&id=${state.badgeId}`;
  const qrCanvas = await getQRCodeCanvas(qrData);
  if (qrCanvas) {
    ctx.drawImage(qrCanvas, qrX + 6, qrY + 6, qrSize - 12, qrSize - 12);
  }

  // Welcome Participant Meta Info
  const qrMetaX = 156;
  ctx.fillStyle = theme.textDark;
  ctx.font = '900 17px "Fredoka", sans-serif';
  ctx.fillText('GOA BUILDER PASSPORT 🏖️', qrMetaX, qrY + 24);

  ctx.fillStyle = '#64748B';
  ctx.font = '700 13px "Fredoka", sans-serif';
  ctx.fillText('✨ OFFICIAL PARTICIPANT PASS', qrMetaX, qrY + 48);
  ctx.fillText('📍 VENUE: GOA, INDIA 🌴', qrMetaX, qrY + 70);

  ctx.fillStyle = theme.primary;
  ctx.font = '800 13.5px "JetBrains Mono", monospace';
  ctx.fillText(`PASSPORT ID: ${state.badgeId}`, qrMetaX, qrY + 94);

  // Cute Verified Participant Seal
  const sealX = width - 85;
  const sealY = qrY + 55;
  drawCuteHoloSeal(ctx, sealX, sealY, 42, theme);

  // 10. Security Barcode & Hashtag Footer
  const barY = 626;
  drawCuteBarcode(ctx, 32, barY, width - 64, 28);

  ctx.fillStyle = '#64748B';
  ctx.font = '800 12.5px "Fredoka", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`#FrameInGoa • HH GOA 2026 • OFFICIAL BUILDER PASS`, width / 2, barY + 46);

  // Cute Rainbow Striped Bottom Edge
  const edgeGrad = ctx.createLinearGradient(0, height - 12, width, height);
  edgeGrad.addColorStop(0, '#FF6B8B');
  edgeGrad.addColorStop(0.35, '#FFD166');
  edgeGrad.addColorStop(0.7, '#00C2D1');
  edgeGrad.addColorStop(1, '#06D6A0');
  ctx.fillStyle = edgeGrad;
  ctx.fillRect(0, height - 12, width, 12);

  // Outer Card Border
  ctx.strokeStyle = '#BAE6FD';
  ctx.lineWidth = 4;
  roundRect(ctx, 10, 10, width - 20, height - 20, cardRadius);
  ctx.stroke();

  ctx.restore();
}

/**
 * 🖼️ Draw Cute Cartoon PFP Avatar Frame
 */
async function drawPFPAvatarFrame(ctx, width, height) {
  const theme = THEMES[state.theme] || THEMES.sunset;
  const center = width / 2;
  const radius = center - 35;

  ctx.clearRect(0, 0, width, height);

  // 1. Draw User Photo inside Circle
  ctx.save();
  ctx.beginPath();
  ctx.arc(center, center, radius - 18, 0, Math.PI * 2);
  ctx.clip();

  if (state.photoImage) {
    drawTransformedImage(ctx, state.photoImage, 50, 50, width - 100, height - 100);
  } else {
    const photoGrad = ctx.createLinearGradient(0, 0, width, height);
    photoGrad.addColorStop(0, '#6ED4F8');
    photoGrad.addColorStop(1, '#FF6B8B');
    ctx.fillStyle = photoGrad;
    ctx.fillRect(0, 0, width, height);
  }
  ctx.restore();

  // 2. Cute Colorful Outer Ring Frame
  ctx.save();
  const ringGrad = ctx.createLinearGradient(0, 0, width, height);
  ringGrad.addColorStop(0, theme.primary);
  ringGrad.addColorStop(0.5, theme.secondary);
  ringGrad.addColorStop(1, theme.accent);

  ctx.lineWidth = 20;
  ctx.strokeStyle = ringGrad;
  ctx.beginPath();
  ctx.arc(center, center, radius, 0, Math.PI * 2);
  ctx.stroke();

  // Inner White Crisp Ring
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(center, center, radius - 14, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // 3. Top Banner: "🌴 HH GOA 2026 ☀️"
  ctx.save();
  const bannerW = 360;
  const bannerH = 54;
  const bannerX = center - bannerW / 2;
  const bannerY = 24;

  ctx.fillStyle = '#FFFFFF';
  roundRect(ctx, bannerX, bannerY, bannerW, bannerH, 27);
  ctx.fill();
  ctx.strokeStyle = theme.primary;
  ctx.lineWidth = 3.5;
  ctx.stroke();

  ctx.fillStyle = '#0E3854';
  ctx.font = '900 20px "Fredoka", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🌴 HH GOA 2026 BUILDER ☀️', center, bannerY + 35);
  ctx.restore();

  // 4. Bottom Banner: `#FrameInGoa` + Name
  ctx.save();
  const btmW = 400;
  const btmH = 60;
  const btmX = center - btmW / 2;
  const btmY = height - 82;

  ctx.fillStyle = '#FFFFFF';
  roundRect(ctx, btmX, btmY, btmW, btmH, 30);
  ctx.fill();
  ctx.strokeStyle = theme.secondary;
  ctx.lineWidth = 3.5;
  ctx.stroke();

  ctx.fillStyle = theme.primary;
  ctx.font = '900 19px "Fredoka", sans-serif';
  ctx.textAlign = 'center';
  const nameDisplay = state.name ? state.name.toUpperCase() : 'BUILDER';
  ctx.fillText(`${nameDisplay} • #FrameInGoa 🏖️`, center, btmY + 38);
  ctx.restore();
}

/**
 * Draw Transformed Image
 */
function drawTransformedImage(ctx, img, destX, destY, destW, destH) {
  ctx.save();
  applyCanvasFilter(ctx, state.filter);

  const centerX = destX + destW / 2 + state.panX;
  const centerY = destY + destH / 2 + state.panY;

  ctx.translate(centerX, centerY);
  ctx.rotate((state.rotation * Math.PI) / 180);
  ctx.scale(state.zoom, state.zoom);

  const imgAspect = img.width / img.height;
  const destAspect = destW / destH;

  let drawW, drawH;
  if (imgAspect > destAspect) {
    drawH = destH;
    drawW = destH * imgAspect;
  } else {
    drawW = destW;
    drawH = destW / imgAspect;
  }

  ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
  ctx.restore();
}

function applyCanvasFilter(ctx, filterName) {
  switch (filterName) {
    case 'sunset':
      ctx.filter = 'contrast(1.1) saturate(1.3) sepia(0.15)';
      break;
    case 'cyber':
      ctx.filter = 'contrast(1.2) saturate(1.4) hue-rotate(180deg)';
      break;
    case 'matrix':
      ctx.filter = 'contrast(1.2) saturate(1.3) hue-rotate(90deg)';
      break;
    case 'vintage':
      ctx.filter = 'sepia(0.4) contrast(1.1)';
      break;
    case 'gold':
      ctx.filter = 'contrast(1.15) saturate(1.3) sepia(0.25) brightness(1.05)';
      break;
    default:
      ctx.filter = 'none';
  }
}

/**
 * Cute Holographic Seal
 */
function drawCuteHoloSeal(ctx, x, y, radius, theme) {
  ctx.save();
  const grad = ctx.createLinearGradient(x - radius, y - radius, x + radius, y + radius);
  grad.addColorStop(0, '#FFD166');
  grad.addColorStop(0.5, '#FF6B8B');
  grad.addColorStop(1, '#00C2D1');

  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 10.5px "Fredoka", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('⭐ BUILDER ⭐', x, y - 5);
  ctx.fillText('2026', x, y + 11);
  ctx.restore();
}

/**
 * Cute Barcode Renderer
 */
function drawCuteBarcode(ctx, x, y, width, height) {
  ctx.save();
  const barCount = 42;
  const barW = width / barCount;
  ctx.fillStyle = '#0E3854';

  for (let i = 0; i < barCount; i++) {
    if (i % 2 === 0) {
      const wFactor = (i % 5 === 0) ? 0.75 : 0.45;
      ctx.fillRect(x + i * barW, y, barW * wFactor, height);
    }
  }
  ctx.restore();
}

/**
 * QR Code Helper
 */
async function getQRCodeCanvas(text) {
  if (cachedQRCodeCanvas && lastQrData === text) {
    return cachedQRCodeCanvas;
  }
  try {
    const canvas = document.createElement('canvas');
    await QRCode.toCanvas(canvas, text, {
      width: 140,
      margin: 1,
      color: {
        dark: '#0E3854',
        light: '#FFFFFF'
      }
    });
    cachedQRCodeCanvas = canvas;
    lastQrData = text;
    return canvas;
  } catch (err) {
    return null;
  }
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function truncateText(ctx, text, maxWidth) {
  if (ctx.measureText(text).width <= maxWidth) return text;
  let truncated = text;
  while (truncated.length > 0 && ctx.measureText(truncated + '...').width > maxWidth) {
    truncated = truncated.slice(0, -1);
  }
  return truncated + '...';
}

function hexToRgba(hex, alpha = 1) {
  const c = hex.replace('#', '');
  const num = parseInt(c, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
