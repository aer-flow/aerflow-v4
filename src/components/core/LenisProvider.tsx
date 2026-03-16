import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { shouldUseLiteEffects } from '@/utils/device';

gsap.registerPlugin(ScrollTrigger);
type WindowWithLenis = Window & { lenis?: Lenis | null };

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });
    gsap.ticker.lagSmoothing(0);

    if (shouldUseLiteEffects()) {
      ScrollTrigger.normalizeScroll(false);
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
      lerp: 0.12,
    });

    lenis.on('scroll', ScrollTrigger.update);
    (window as WindowWithLenis).lenis = lenis;

    const refresh = () => lenis.resize();
    ScrollTrigger.addEventListener('refresh', refresh);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);

    return () => {
      (window as WindowWithLenis).lenis = null;
      ScrollTrigger.removeEventListener('refresh', refresh);
      lenis.destroy();
      gsap.ticker.remove(update);
      ScrollTrigger.clearScrollMemory();
    };
  }, []);

  return <>{children}</>;
}
