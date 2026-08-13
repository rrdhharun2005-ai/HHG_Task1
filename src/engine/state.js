// ==========================================================================
// CENTRALIZED REACTIVE STATE MANAGEMENT
// ==========================================================================

export const state = {
  // Navigation layer (0: Sky, 1: Beach, 2: Deep Sea)
  currentLayer: 0,
  
  // Format: 'id' (Builder ID Badge) or 'pfp' (PFP Avatar Frame)
  formatMode: 'id',

  // User details
  name: 'Alex Rivera',
  socialHandle: '@arivera_dev',
  githubHandle: 'arivera-code',
  role: 'Fullstack Hacker',
  customRole: '',
  builderTitle: '10x Caffeine Synthesizer',
  projectName: 'Solana Beach Copilot',
  superpower: 'Level 99 Async Wizard',
  coffeeVibe: 'Cold Brew & Surf',
  bio: 'Shipping autonomous AI agents by the beach 🌊',
  badgeId: 'HHG-2026-9482',
  selectedTags: ['TypeScript', 'Rust', 'Next.js', 'Solana'],

  // Appearance & Theme
  theme: 'sunset', // 'sunset' | 'miami' | 'ocean' | 'gold' | 'emerald' | 'cyberpunk'
  filter: 'original', // 'original' | 'sunset' | 'cyber' | 'matrix' | 'vintage' | 'gold'
  pfpFrameStyle: 'ring-pulse',

  // Photo & Crop state
  photoSrc: null,
  photoImage: null,
  zoom: 1.0,
  panX: 0,
  panY: 0,
  rotation: 0,
  flipH: false,

  // Audio mute/unmute
  soundEnabled: true,

  // Subscribers
  listeners: new Set(),

  // Methods
  update(partialState, notify = true) {
    Object.assign(this, partialState);
    if (notify) {
      this.listeners.forEach(fn => fn(this));
    }
  },

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
};
