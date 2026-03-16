import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Detect touch/mobile — disable Lenis smooth scroll entirely on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    ScrollTrigger.config({ ignoreMobileResize: true });

    if (isTouchDevice) {
      // On mobile, normalize scroll helps stabilize pinning
      ScrollTrigger.normalizeScroll(true);
      return;
    }

    const lenis = new Lenis({
      duration: 1.5, // Increased from 1.0 for a more "cinematic", slower feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      lerp: 0.07, // Decreased from 0.1 for more "momentum" and slower response
    });

    lenis.on('scroll', ScrollTrigger.update);
    (window as any).lenis = lenis;

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);

    return () => {
      (window as any).lenis = null;
      lenis.destroy();
      gsap.ticker.remove(update);
      ScrollTrigger.clearScrollMemory();
    };
  }, []);

  return <>{children}</>;
}
