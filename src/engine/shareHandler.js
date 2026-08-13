// ==========================================================================
// EXPORT & SHARING UTILITIES (DOWNLOAD, CLIPBOARD & X SHARE)
// ==========================================================================

import { renderToCanvas } from './canvasRenderer.js';
import { state } from './state.js';
import { sounds } from './soundEffects.js';

export function showToast(message) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>✨</span> <span>${message}</span>`;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

export async function downloadGraphic() {
  sounds.shutter();
  const exportCanvas = document.createElement('canvas');
  await renderToCanvas(exportCanvas, true); // High-res supersampling

  const isIdMode = state.formatMode === 'id';
  const cleanName = (state.name || 'builder').toLowerCase().replace(/[^a-z0-9]/g, '_');
  const filename = isIdMode 
    ? `HH_Goa_2026_ID_${cleanName}.png` 
    : `HH_Goa_2026_PFP_${cleanName}.png`;

  const link = document.createElement('a');
  link.download = filename;
  link.href = exportCanvas.toDataURL('image/png', 1.0);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast(`Downloaded ${filename} successfully!`);
}

export async function copyToClipboard() {
  sounds.click();
  const exportCanvas = document.createElement('canvas');
  await renderToCanvas(exportCanvas, true);

  exportCanvas.toBlob(async (blob) => {
    if (!blob) {
      showToast('Failed to create image blob.');
      return;
    }
    try {
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      showToast('Image copied to clipboard! Ready to paste on X.');
    } catch (err) {
      console.warn('Clipboard write failed, falling back to download:', err);
      downloadGraphic();
    }
  }, 'image/png', 1.0);
}

export function shareToX() {
  sounds.click();
  const isIdMode = state.formatMode === 'id';
  const role = state.customRole || state.role || 'Builder';
  const title = state.builderTitle ? ` "${state.builderTitle}"` : '';
  
  let tweetText = isIdMode
    ? `Just claimed my official Builder Pass for HH Goa 2026! 🌴🌊\n\nRole: ${role}${title}\nReady to ship by the beach with the best hackers.\n\n#FrameInGoa #HHGoa2026 @HHGoa`
    : `Updated my PFP for HH Goa 2026! 🌴🌊 Excited to hack and build by the ocean.\n\n#FrameInGoa #HHGoa2026 @HHGoa`;

  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
  window.open(tweetUrl, '_blank', 'noopener,noreferrer,width=600,height=500');
  
  showToast('Opening X (Twitter) with #FrameInGoa...');
}
