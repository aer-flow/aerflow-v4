export function isTouchDevice() {
  return typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);
}

export function isMobileViewport(breakpoint = 768) {
  return typeof window !== 'undefined' && window.innerWidth < breakpoint;
}

export function shouldReduceMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function shouldUseLiteEffects() {
  return isTouchDevice() || isMobileViewport() || shouldReduceMotion();
}
