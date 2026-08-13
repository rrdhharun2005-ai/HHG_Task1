// ==========================================================================
// IMAGE PROCESSOR & CUTE CARTOON AVATAR GENERATOR
// ==========================================================================

import heic2any from 'heic2any';
import { state } from './state.js';

/**
 * Convert user uploaded file (PNG, JPG, HEIC, WebP) to usable Image object
 */
export async function processUploadedFile(file) {
  if (!file) return null;

  let blobToProcess = file;

  // Handle Apple iPhone HEIC / HEIF format conversion
  const fileExt = file.name.toLowerCase().split('.').pop();
  if (fileExt === 'heic' || fileExt === 'heif' || file.type.includes('heic') || file.type.includes('heif')) {
    try {
      const convertedBlob = await heic2any({
        blob: file,
        toType: 'image/jpeg',
        quality: 0.92
      });
      blobToProcess = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
    } catch (err) {
      console.warn('HEIC conversion fallback:', err);
    }
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      const img = new Image();
      img.onload = () => {
        state.update({
          photoSrc: dataUrl,
          photoImage: img,
          zoom: 1.0,
          panX: 0,
          panY: 0,
          rotation: 0
        });
        resolve(img);
      };
      img.onerror = reject;
      img.src = dataUrl;
    };
    reader.onerror = reject;
    reader.readAsDataURL(blobToProcess);
  });
}

/**
 * Initialize default cute cartoon beach builder avatar
 */
export function initImageState() {
  const avatarCanvas = createCuteCartoonAvatar();
  const dataUrl = avatarCanvas.toDataURL('image/png');
  const img = new Image();
  img.onload = () => {
    state.update({
      photoSrc: dataUrl,
      photoImage: img
    });
  };
  img.src = dataUrl;
}

/**
 * Procedural Cute Cartoon Beach Builder Avatar
 */
function createCuteCartoonAvatar() {
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 480;
  const ctx = canvas.getContext('2d');

  // 1. Cute Pastel Sky & Sun Background (Zero Dark Colors!)
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 480);
  bgGrad.addColorStop(0, '#6ED4F8');
  bgGrad.addColorStop(0.5, '#BAE6FD');
  bgGrad.addColorStop(1, '#FFF3D6');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 400, 480);

  // 2. Cute Little Cartoon Sun in Corner
  ctx.fillStyle = '#FFD166';
  ctx.beginPath();
  ctx.arc(330, 70, 45, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Floating Puffy Cloud
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.beginPath();
  ctx.arc(80, 90, 28, 0, Math.PI * 2);
  ctx.arc(115, 80, 36, 0, Math.PI * 2);
  ctx.arc(150, 90, 26, 0, Math.PI * 2);
  ctx.fill();

  // 3. Cute Cartoon Character Body / Beach Hoodie
  ctx.fillStyle = '#FF6B8B'; // Cute Strawberry Pink Hoodie
  ctx.beginPath();
  ctx.ellipse(200, 440, 150, 110, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#0E3854';
  ctx.lineWidth = 5;
  ctx.stroke();

  // Hoodie Collar
  ctx.fillStyle = '#FFD166';
  ctx.beginPath();
  ctx.ellipse(200, 340, 55, 22, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // 4. Cute Cartoon Head & Neck
  ctx.fillStyle = '#FFE0BD'; // Warm Skin Tone
  ctx.beginPath();
  ctx.arc(200, 250, 85, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#0E3854';
  ctx.lineWidth = 5;
  ctx.stroke();

  // Cute Ears
  ctx.fillStyle = '#FFE0BD';
  ctx.beginPath();
  ctx.arc(115, 250, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(285, 250, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // 5. Cute Cool Beach Sunglasses
  ctx.fillStyle = '#00C2D1'; // Aqua Teal Frame
  // Left Lens
  ctx.beginPath();
  ctx.roundRect(140, 225, 52, 38, 12);
  ctx.fill();
  ctx.strokeStyle = '#0E3854';
  ctx.lineWidth = 4;
  ctx.stroke();

  // Right Lens
  ctx.beginPath();
  ctx.roundRect(208, 225, 52, 38, 12);
  ctx.fill();
  ctx.stroke();

  // Bridge
  ctx.fillStyle = '#0E3854';
  ctx.fillRect(190, 238, 20, 6);

  // Sunglasses White Lens Reflection
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.moveTo(148, 232);
  ctx.lineTo(162, 232);
  ctx.lineTo(152, 255);
  ctx.lineTo(142, 255);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(216, 232);
  ctx.lineTo(230, 232);
  ctx.lineTo(220, 255);
  ctx.lineTo(210, 255);
  ctx.closePath();
  ctx.fill();

  // 6. Cute Rosy Cheek Blush
  ctx.fillStyle = '#FF8DA1';
  ctx.beginPath();
  ctx.arc(135, 275, 12, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.arc(265, 275, 12, 0, Math.PI * 2);
  ctx.fill();

  // 7. Cute Happy Smile
  ctx.strokeStyle = '#0E3854';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(200, 280, 22, 0.1 * Math.PI, 0.9 * Math.PI, false);
  ctx.stroke();

  // 8. Cute Hacker Cap (Forward Facing Coral Cap)
  ctx.fillStyle = '#0E3854';
  ctx.beginPath();
  ctx.ellipse(200, 175, 92, 30, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#FF6B8B';
  ctx.beginPath();
  ctx.arc(200, 175, 84, Math.PI, 0, false);
  ctx.fill();
  ctx.strokeStyle = '#0E3854';
  ctx.lineWidth = 5;
  ctx.stroke();

  // Little Palm Tree Badge on Cap
  ctx.font = '22px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🌴', 200, 155);

  return canvas;
}
