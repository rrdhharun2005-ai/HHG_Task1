// ==========================================================================
// FUN BUILDER TITLE & SUPERPOWER GENERATORS
// ==========================================================================

export const TITLES = [
  '10x Caffeine Synthesizer',
  'Solana Shore Surfer',
  'LLM Whisperer & Prompt Alchemist',
  'Kernel Level Beachcomber',
  'Zero-Knowledge Sandcastle Architect',
  'Merge Conflict Pacifist',
  'Smart Contract Auditor by Day, Beach Boy by Night',
  'Gas Optimization Monk',
  'Decentralized Coconut Enthusiast',
  'GPU Heat Exchanger',
  'CSS Glitch Magician',
  'Fullstack Sunset Hacker',
  'Docker Container Castaway',
  'Web3 Pirate Captain',
  'Bytecode Wave Rider',
  'AI Agent Orchestrator',
  'Postgres Query Whisperer',
  'Async/Await Time Traveler',
  'Bug Bounty Bounty Hunter',
  'Neural Network Botanist'
];

export const SUPERPOWERS = [
  'Level 99 Async Wizard',
  'Zero-Latency Debugger',
  'Hallucination Tamer',
  'Smart Contract Fortifier',
  'Pixel-Perfect Alchemist',
  'High-Throughput Mempool Diver',
  'Infinite Context Window Guru',
  'Git Rebase Surgeon',
  '100ms Inference Crafter',
  'Beachfront Hackathon Champion'
];

export const COFFEE_VIBES = [
  'Cold Brew & Surf 🏄‍♂️',
  'Masala Chai & Late Night Merges ☕',
  'Double Espresso & Bug Hunting ⚡',
  'Coconut Water & Rust 🥥',
  'Iced Matcha & AI Prompting 🍵',
  'Red Bull & Smart Contracts 🏎️',
  'Goan Filter Kaapi & Terminal 🌴'
];

export const POPULAR_TAGS = [
  'TypeScript', 'Python', 'Rust', 'Solidity', 'Next.js', 
  'React', 'PyTorch', 'Go', 'Docker', 'Tailwind',
  'PostgreSQL', 'GraphQL', 'Wasm', 'Move', 'Swift',
  'LangChain', 'Svelte', 'Kubernetes', 'Ethereum', 'Solana'
];

export function getRandomTitle() {
  const idx = Math.floor(Math.random() * TITLES.length);
  return TITLES[idx];
}

export function getRandomSuperpower() {
  const idx = Math.floor(Math.random() * SUPERPOWERS.length);
  return SUPERPOWERS[idx];
}

export function getRandomCoffeeVibe() {
  const idx = Math.floor(Math.random() * COFFEE_VIBES.length);
  return COFFEE_VIBES[idx];
}

export function generateBadgeId() {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `HHG-2026-${randomNum}`;
}
